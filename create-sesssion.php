<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once __DIR__ . '/vendor/autoload.php';

// Configuración de la base de datos
define('DB_SERVER', 'localhost');
define('DB_USERNAME', 'root');
define('DB_PASSWORD', 'pirineus');
define('DB_NAME', 'life_club_MMA');

try {
    // Verificar método POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception("Método no permitido", 405);
    }

    // Obtener datos JSON
    $json = file_get_contents('php://input');
    if ($json === false) {
        throw new Exception("Error al leer los datos de entrada");
    }

    $data = json_decode($json, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception("JSON inválido: " . json_last_error_msg());
    }

    // Validar datos obligatorios
    $requiredFields = ['cart', 'username', 'direccion'];
    foreach ($requiredFields as $field) {
        if (empty($data[$field])) {
            throw new Exception("El campo $field es requerido");
        }
    }

    // Configurar Stripe
    \Stripe\Stripe::setApiKey('sk_test_51RNwfX4Dkprid8KfqpijmGkdTt4H6QkgRr1vXdyHETi86J2WyF1szTXJsEbc0nX2IMnC7LTlWmPvjrgW8WwQJpSk007d4tSlrj');

    // Conectar a la base de datos
    $conn = new mysqli(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
    if ($conn->connect_error) {
        throw new Exception("Conexión fallida: " . $conn->connect_error);
    }

    // 1. Obtener User_ID
    $stmt = $conn->prepare("SELECT User_ID FROM Usuarios WHERE username = ?");
    $stmt->bind_param("s", $data['username']);
    $stmt->execute();
    $result = $stmt->get_result();
    $user = $result->fetch_assoc();
    
    if (!$user) throw new Exception("Usuario no encontrado");
    $User_ID = $user['User_ID'];

    // 2. Crear sesión de Stripe
    $lineItems = [];
    foreach ($data['cart'] as $item) {
        $lineItems[] = [
            'price' => $item['price'],
            'quantity' => $item['quantity']
        ];
    }

    $session = \Stripe\Checkout\Session::create([
        'payment_method_types' => ['card'],
        'line_items' => $lineItems,
        'mode' => 'payment',
        'success_url' => 'http://localhost/success.php?session_id={CHECKOUT_SESSION_ID}',
        'cancel_url' => 'http://localhost/cancel.php',
        'metadata' => [
            'user_id' => $User_ID
        ]
    ]);

    // 3. Registrar pedido en la base de datos
    $conn->begin_transaction();
    try {
        // Insertar pedido principal
$insertPedido = $conn->prepare("
    INSERT INTO Pedidos (User_ID, Fecha_Pedido, Total_Euros, Direccion, Tipo_Pago)
    VALUES (?, NOW(), ?, ?, ?)
");

        
        // Calcular total (simplificado - deberías calcularlo basado en tus productos)
        $total = array_reduce($data['cart'], function($sum, $item) {
            return $sum + ($item['quantity'] * 10); // Cambia 10 por el precio real
        }, 0);
        
     $tipoPago = 'Tarjeta'; // Debes definirlo como una cadena válida
$insertPedido->bind_param("idss", $User_ID, $total, $data['direccion'], $tipoPago);

        $insertPedido->execute();
        $Pedido_ID = $conn->insert_id;

        // Insertar detalles del pedido
// Dentro de tu transacción, antes de insertar los detalles
if (!empty($data['productos'])) {
    $insertDetalle = $conn->prepare("
        INSERT INTO Detalles_Pedidos (Pedido_ID, Producto_ID, Cantidad, Precio_Unidad)
        VALUES (?, ?, ?, ?)
    ");
    
    foreach ($data['productos'] as $producto) {
        // Verificar que el producto existe
        $checkProduct = $conn->prepare("SELECT 1 FROM Productos WHERE Producto_ID = ?");
        $checkProduct->bind_param("i", $producto['producto_id']);
        $checkProduct->execute();
        
        if (!$checkProduct->get_result()->num_rows) {
            throw new Exception("El producto con ID {$producto['producto_id']} no existe");
        }
        
        $insertDetalle->bind_param(
            "iiid", 
            $Pedido_ID, 
            $producto['producto_id'], 
            $producto['cantidad'], 
            $producto['precio_unidad']
        );
        $insertDetalle->execute();
    }
}
        $conn->commit();
    } catch (Exception $e) {
        $conn->rollback();
        throw new Exception("Error al registrar pedido: " . $e->getMessage());
    }

    echo json_encode([
        'id' => $session->id,
        'pedido_id' => $Pedido_ID
    ]);

} catch (\Stripe\Exception\ApiErrorException $e) {
    http_response_code(400);
    echo json_encode(['error' => 'Error de Stripe: ' . $e->getMessage()]);
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(['error' => $e->getMessage()]);
}
