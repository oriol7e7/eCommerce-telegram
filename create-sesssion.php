<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

require_once __DIR__ . '/vendor/autoload.php';

try {
    // Verifica método POST
    if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
        throw new Exception("Método no permitido", 405);
    }

    // Obtiene el JSON crudo
    $json = file_get_contents('php://input');
    if ($json === false) {
        throw new Exception("Error al leer los datos de entrada");
    }

    $data = json_decode($json, true);
    if (json_last_error() !== JSON_ERROR_NONE) {
        throw new Exception("JSON inválido: " . json_last_error_msg());
    }

    // Validación estricta del carrito
    if (empty($data['cart']) || !is_array($data['cart'])) {
        throw new Exception("El carrito está vacío o no es un array");
    }

    \Stripe\Stripe::setApiKey('sk_test_51RNwfX4Dkprid8KfqpijmGkdTt4H6QkgRr1vXdyHETi86J2WyF1szTXJsEbc0nX2IMnC7LTlWmPvjrgW8WwQJpSk007d4tSlrj');

    $lineItems = [];
    foreach ($data['cart'] as $item) {
        if (empty($item['price']) || empty($item['quantity'])) {
            throw new Exception("Item del carrito inválido: falta price o quantity");
        }
        
        $lineItems[] = [
            'price' => $item['price'],
            'quantity' => (int)$item['quantity']
        ];
    }

$session = \Stripe\Checkout\Session::create([
    'payment_method_types' => ['card'],
    'line_items' => $lineItems,
    'mode' => 'payment',
    'success_url' => 'http://localhost/success.php?session_id={CHECKOUT_SESSION_ID}',
    'cancel_url' => 'http://localhost/cancel.php',
    'phone_number_collection' => ['enabled' => true], // Para recibir teléfono
    'shipping_address_collection' => ['allowed_countries' => ['ES']], // Para recibir dirección
    'metadata' => ['order_id' => uniqid()], // Identificador único
]);

    echo json_encode(['id' => $session->id]);

} catch (\Stripe\Exception\ApiErrorException $e) {
    http_response_code(400);
    echo json_encode(['error' => 'Error de Stripe: ' . $e->getMessage()]);
} catch (Exception $e) {
    http_response_code(400);
    echo json_encode(['error' => $e->getMessage()]);
}
