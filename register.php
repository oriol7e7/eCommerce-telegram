<?php
$servidor = "localhost";
$usuario = "root";
$clave = "pirineus";
$bd = "life_club_MMA";

$conexion = mysqli_connect($servidor, $usuario, $clave, $bd);
if (!$conexion) {
    die("Error de conexión: " . mysqli_connect_error());
}

if (isset($_POST['enviar'])) {
    $email = mysqli_real_escape_string($conexion, $_POST['email']);
    $username = mysqli_real_escape_string($conexion, $_POST['username']);
    $password = mysqli_real_escape_string($conexion, $_POST['password']);

    // Validar campos vacíos
    if (empty($email) || empty($username) || empty($password)) {
        echo "<script>alert('Todos los campos son obligatorios.'); history.back();</script>";
        exit();
    }

    // Verificar si el usuario o correo ya existen
    $sql_check = "SELECT username, correo FROM Usuarios WHERE username = ? OR correo = ?";
    $stmt_check = $conexion->prepare($sql_check);
    $stmt_check->bind_param("ss", $username, $email);
    $stmt_check->execute();
    $result_check = $stmt_check->get_result();

    if ($result_check->num_rows > 0) {
        echo "<script>alert('El nombre de usuario o correo ya están registrados.'); history.back();</script>";
        exit();
    }

    // Hashear la contraseña
    $hash = password_hash($password, PASSWORD_DEFAULT);

    // Insertar nuevo usuario
    $sql_insert = "INSERT INTO Usuarios (username, password, correo) VALUES (?, ?, ?)";
    $stmt_insert = $conexion->prepare($sql_insert);
    $stmt_insert->bind_param("sss", $username, $hash, $email);

    if ($stmt_insert->execute()) {
        echo "<script>
                alert('¡Registro exitoso! Ahora inicia sesión.');
                window.location.href = '/pages/login.html';
              </script>";
    } else {
        echo "<script>alert('Error al registrar. Intenta nuevamente.'); history.back();</script>";
    }
}
?>