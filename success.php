<?php
session_start();
?>
<!DOCTYPE html>
<html>
<head>
    <title>Compra Exitosa</title>
</head>
<body>
    <h1>¡Gracias por tu compra!</h1>
    <p>ID de sesión: <?= htmlspecialchars($_GET['session_id'] ?? 'N/A') ?></p>
    <a href="/">Volver a la tienda</a>
</body>
</html>
