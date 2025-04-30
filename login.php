<?php
session_start(); // Iniciar sesión

$servidor = "localhost";
$usuario = "root";
$clave = "pirineus";
$bd = "life_club_MMA";

// Conectar a la base de datos
$conexion = mysqli_connect($servidor, $usuario, $clave, $bd);

if (!$conexion) {
    die("Error de conexión: " . mysqli_connect_error());
}

// Procesar login si el formulario fue enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Sanitizar los datos para evitar SQL Injection
    $input = mysqli_real_escape_string($conexion, $_POST['username']); // Puede ser usuario o correo
    $password = mysqli_real_escape_string($conexion, $_POST['password']);

    // Consulta que busca por usuario o correo
    $consulta = "SELECT username, password FROM Usuarios WHERE username = '$input' OR correo = '$input'";
    $resultado = mysqli_query($conexion, $consulta);

    if (mysqli_num_rows($resultado) > 0) {
        $fila = mysqli_fetch_assoc($resultado);
        $password_bd = $fila['password']; // Contraseña en la base de datos

        // Comparar contraseñas (sin hash por ahora)
        if ($password === $password_bd) {
            $_SESSION['username'] = $fila['username']; // Guardar el nombre de usuario en la sesión
            echo "<script>
                    alert('¡Login exitoso! Bienvenido, " . $fila['username'] . "');
                    window.location.href = './pages/store.html';
                  </script>";
        } else {
            echo "<script>
                    alert('Error: Contraseña incorrecta.');
                    window.location.href = './login.html';
                  </script>";
        }
    } else {
        echo "<script>
                alert('Error: Usuario o correo no encontrado.');
                window.location.href = './login.html';
              </script>";
    }
}

// Cerrar conexión
mysqli_close($conexion);
?>
