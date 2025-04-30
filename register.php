<?php

    $servidor = "localhost";
    $usuario = "root";
    $clave = "pirineus";
    $bd = "life_club_MMA";

    $coneccion = mysqli_connect($servidor, $usuario, $clave, $bd);

    if (!$coneccion) {
        die("Error de conexión: " . mysqli_connect_error());
    }


if (isset($_POST['enviar'])) {

    // Sanitizar los datos para evitar SQL Injection
    $email = mysqli_real_escape_string($coneccion, $_POST['email']);
    $username = mysqli_real_escape_string($coneccion, $_POST['username']);
    $password = mysqli_real_escape_string($coneccion, $_POST['password']);

    // Especificar los nombres de las columnas en la inserción
    $insertar = "INSERT INTO Usuarios (username, password, correo) VALUES ('$username', '$password', '$email')";

    $resultado = mysqli_query($coneccion, $insertar);

    if ($resultado) {
        // Alerta y redirección
        echo "<script>
                alert('¡Usuario registrado! Ahora serás redigirido para iniciar sesión.');
                window.location.href = '/pages/login.html';
              </script>";
    } else {
        // Mostrar error en caso de fallo
        echo "Error en la consulta: " . mysqli_error($coneccion);
    }
}
?>
