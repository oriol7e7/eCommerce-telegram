<?php
session_start();

$servidor = "localhost";
$usuario = "root";
$clave = "pirineus";
$bd = "life_club_MMA";

$conexion = new mysqli($servidor, $usuario, $clave, $bd);
if ($conexion->connect_error) {
    die("Error de conexión: " . $conexion->connect_error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $input = trim($_POST['username']); // Elimina espacios en blanco
    $password = $_POST['password'];

    // Validar campos vacíos
    if (empty($input) || empty($password)) {
        echo "<script>alert('Usuario y contraseña son obligatorios.'); history.back();</script>";
        exit();
    }

    // Buscar usuario (usa consultas preparadas)
    $sql = "SELECT username, password FROM Usuarios WHERE username = ? OR correo = ? LIMIT 1";
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("ss", $input, $input);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows === 1) {
        $user = $result->fetch_assoc();
        
        // Verificar contraseña
        if (password_verify($password, $user['password'])) {
            $_SESSION['loggedin'] = true;
            $_SESSION['username'] = $user['username'];
            header("Location: pages/store.html?login=success&user=" . urlencode($user['username']));
            exit();
        } else {
            echo "<script>alert('Contraseña incorrecta.'); history.back();</script>";
        }
    } else {
        echo "<script>alert('Usuario no encontrado.'); history.back();</script>";
    }
}
?>