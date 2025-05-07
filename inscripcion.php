<?php
// Configuración de errores detallada
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Headers iniciales
header("Cache-Control: no-cache, must-revalidate");
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT");

// Configuración de la base de datos
$servidor = "localhost";
$usuario = "root";
$clave = "pirineus";
$bd = "life_club_MMA";

// Conexión con manejo de errores
$conexion = new mysqli($servidor, $usuario, $clave, $bd);
   
if ($conexion->connect_error) {
    die("Error de conexión MySQL: " . $conexion->connect_error);
}

// Configurar charset
if (!$conexion->set_charset("utf8mb4")) {
    die("Error al establecer charset: " . $conexion->error);
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Validar datos recibidos
    $required = array('name', 'genero', 'telefono', 'dni', 'fecha-nacimiento', 'edad', 'clase', 'horario');
    foreach ($required as $field) {
        if (empty($_POST[$field])) {
            die("El campo $field es obligatorio");
        }
    }

    // Procesar datos
    $name = $conexion->real_escape_string($_POST['name']);
    $genero = ($_POST['genero'] == 'hombre') ? 'M' : 'F';
    $tel = $conexion->real_escape_string($_POST['telefono']);
    $dni = $conexion->real_escape_string($_POST['dni']);
    $date = $conexion->real_escape_string($_POST['fecha-nacimiento']);
    $age = $conexion->real_escape_string($_POST['edad']);
    $clase = $conexion->real_escape_string($_POST['clase']);
    $horario = substr($conexion->real_escape_string($_POST['horario']), 0, 50);
    $comments = $conexion->real_escape_string($_POST['comments'] ?? '');

    // Telegram
    $token = "8059945037:AAFOX8hYxVavIUuHLx2LbbABVWQd3FBiP6U";
    $chat_id = "5986349947";
   
    $mensaje = "NUEVA INSCRIPCIÓN:\n"
             . "📦 Nombre: $name\n"
             . "⚧ Género: " . (($genero == 'M') ? 'hombre' : 'mujer') . "\n"
             . "📞 Teléfono: $tel\n"
             . "🆔 DNI: $dni\n"
             . "🎂 Fecha Nac.: $date\n"
             . "👥 Edad: $age\n"
             . "🥋 Clase: $clase\n"
             . "🕐 Horario: $horario\n"
             . "📝 Comentarios: $comments";

    $telegram_url = "https://api.telegram.org/bot{$token}/sendMessage?" .
                   http_build_query(array(
                       'chat_id' => $chat_id,
                       'text' => $mensaje,
                       'parse_mode' => 'Markdown'
                   ));
   
    $telegram_response = file_get_contents($telegram_url);
    if ($telegram_response === false) {
        error_log("Error al enviar a Telegram");
    }

    // Insertar en BD
    $stmt = $conexion->prepare("INSERT INTO Alumnos
                               (Nombre_Completo, Genero, Telefono, DNI,
                                Fecha_Nacimiento, Grupo_Edad, Clase, Horario, Comentarios)
                               VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)");
   
    if (!$stmt) {
        die("Error al preparar consulta: " . $conexion->error);
    }
   
    $stmt->bind_param("sssssssss", $name, $genero, $tel, $dni,
                     $date, $age, $clase, $horario, $comments);
   
    if (!$stmt->execute()) {
        die("Error al ejecutar consulta: " . $stmt->error);
    }
   
    $stmt->close();
   
    // Redirección exitosa
    header("Location: ../index.html?status=success");
    exit();
} else {
    die("Método no permitido");
}

$conexion->close();
?>