<?php
// header('Content-Type: text/html; charset=utf-8'); 
// Define el tipo de contenido como HTML con codificación UTF-8 para manejar caracteres especiales correctamente.

// Configuración de la base de datos
// $servidor = "localhost"; // Define el servidor donde está la base de datos.
// $usuario = "root";       // Define el usuario con permisos para acceder a la base de datos.
// $clave = "pirineus";     // Define la contraseña para acceder a la base de datos.
// $bd = "life_club_MMA";   // Indica el nombre de la base de datos.


// Conectar a la base de datos usando MySQLi
// $conexion = new mysqli($servidor, $usuario, $clave, $bd);
// Crea la conexión con la base de datos usando los datos definidos anteriormente.

// if ($conn->connect_error) throw new Exception("Conexión fallida: " . $conn->connect_error); 
// Si hay un error en la conexión, lanza una excepción mostrando el mensaje de error.


// Verificar que el pedido existe y está asociado a una sesión de Stripe pendiente
// $stmt = $conn->prepare("SELECT Pedido_ID FROM Pedidos WHERE stripe_session_id = ?");
// Prepara una consulta SQL para buscar un pedido en la tabla `Pedidos` que tenga un `stripe_session_id` específico.

// $stmt->bind_param("s", $session_id);
// Asigna el valor de `$session_id` como parámetro de la consulta preparada, asegurando que se pase correctamente como cadena (`s` = string).

// $stmt->execute();
// Ejecuta la consulta preparada contra la base de datos.

// $result = $stmt->get_result();
// Obtiene los resultados de la consulta SQL en una variable.

// $pedido = $result->fetch_assoc();
// Convierte el resultado en un array asociativo para acceder a sus valores.

// if (!$pedido) throw new Exception("Pedido no encontrado");
// Si no se encuentra el pedido en la base de datos, lanza una excepción indicando que no existe.



?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>¡Pago Exitoso! - Life Club MMA</title>
    <link rel="icon" type="image/png" href="../images/logo.jpg">
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Montserrat:ital,wght@0,100..900;1,100..900&display=swap');
        @font-face {
            font-family: 'Yearbook Solid';  
            src: url('../fonts/YearbookSolid.woff2') format('woff2'),
                 url('../fonts/Yearbook Solid.ttf') format('truetype');
            font-weight: normal;            
            font-style: normal;              
        }
        
        body {
            background-color: #191919;
            font-family: "Inter", sans-serif;
            color: white;
            margin: 0;
            padding: 0;
            display: flex;
            flex-direction: column;
            min-height: 100vh;
            animation: fadeIn 0.8s ease-out forwards;
        }
        

        
        .logoNav {
            height: 80px;
            width: auto;
            padding: 10px;
            margin-left: 40px;
            transition: transform 0.3s ease;
        }
        
        .success-container {
            flex: 1;
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 40px 20px;
            text-align: center;
            max-width: 800px;
            margin: 0 auto;
        }
        
        .success-icon {
            color: #4CAF50;
            font-size: 80px;
            margin-bottom: 30px;
            animation: pulse 2s infinite;
        }
        
        h1 {
            font-family: 'Yearbook Solid', sans-serif;
            font-size: 2.5rem;
            margin-bottom: 20px;
            color: #ffffff;
        }
        
        p {
            font-size: 1.2rem;
            margin-bottom: 30px;
            line-height: 1.6;
        }
        
        .btn {
            background-color: rgb(0, 100, 180);
            color: white;
            padding: 12px 30px;
            border-radius: 15px;
            font-weight: bold;
            text-decoration: none;
            font-size: 1.1rem;
            transition: all 0.3s ease;
            border: none;
            cursor: pointer;
            animation: fadeIn 1s ease-out 0.5s both;
        }
        
        .btn:hover {
            background-color: rgb(80, 176, 255);
            transform: translateY(-2px) scale(1.05);
            box-shadow: 0 5px 15px rgba(0, 100, 180, 0.4);
        }
        
        footer {
            width: 100%;
            padding: 20px 0;
            text-align: center;
            background-color: rgba(25, 25, 25, 0.9);
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(20px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        @keyframes pulse {
            0% { transform: scale(1); }
            50% { transform: scale(1.1); }
            100% { transform: scale(1); }
        }
        
        @media (max-width: 768px) {
            h1 {
                font-size: 2rem;
            }
            
            .success-icon {
                font-size: 60px;
            }
            
            .btn {
                padding: 10px 25px;
                font-size: 1rem;
            }
        }
    </style>
</head>
<body>

    <div class="success-container">
        <div class="success-icon">✓</div>
        <h1>¡Pago Completado con Éxito!</h1>
        <p>Gracias por tu compra en Life Club MMA. Hemos recibido tu pedido correctamente y estamos procesándolo.</p>
        <a href="./index.html" class="btn">Volver al Inicio</a>
    </div>
    
    <footer>
        <div class="icons">
            <!-- Aquí puedes agregar tus íconos de redes sociales si lo deseas -->
        </div>
        <div class="rights">
            <p>&copy; 2025 Life Club MMA. Todos los derechos reservados.</p>
        </div>
    </footer>
</body>
</html>
