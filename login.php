<?php
session_start();

// Configuración de BD (usando los mismos datos que en tu script de inscripción)
$servidor = "localhost";
$usuario = "root";
$clave = "pirineus";
$bd = "life_club_MMA";

$conexion = new mysqli($servidor, $usuario, $clave, $bd);
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $input = $conexion->real_escape_string($_POST['username']);
    $password = $conexion->real_escape_string($_POST['password']);

    // Buscar usuario en la tabla `Usuarios` (debes crearla si no existe)
    $sql = "SELECT username, password FROM Usuarios WHERE username = ? OR correo = ?";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("ss", $input, $input);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        $user = $result->fetch_assoc();
        
        // Verificar contraseña 
        if ($password === $user['password']) {
            $_SESSION['loggedin'] = true;
            $_SESSION['username'] = $user['username'];
            

            // Redirigir con parámetros en URL para JS (más seguro que localStorage)
            header("Location: pages/store.html?login=success&user=" . urlencode($user['username']));
            exit();
            // ---------------------------- //
        } else {
            echo "<script>alert('Contraseña incorrecta'); history.back();</script>";
        }
    } else {
        echo "<script>alert('Usuario no encontrado'); history.back();</script>";
    }
}
?>