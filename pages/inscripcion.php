<?php

// Mostrar errors para depuraci\u00f3n
informe_d'errors(E_ALL);
ini_set('visualitza_errors', 1);

si ($_SERVIDOR["MÈTODE_SOL·LICITUD"] == "PUBLICACIÓ") {

// Recoger els dades del formulari
$nom = $_POST['nom'] ?? '';
$genero = $_POST['genero'] ?? '';
$tel = $_POST['telèfon'] ?? '';
$dni = $_POST['dni'] ?? '';
$data = $_POST['fecha-nacimiento'] ?? '';
$edat = $_POST['edat'] ?? '';
$clase = $_POST['clase'] ?? '';
$horario = $_POST['horario'] ?? '';
$comentaris = $_POST['comentaris'] ?? '';

// \u2705 CORREGIDO: Validaci\u00f3n amb los camps correctos
si (
buit($nom) ||
buit($genere) ||
buit($tel) ||
buit($dni) ||
buit($data) ||
buit($edat) ||
buit($clase) ||
buit($horari)
) {
die("\u274c Error: Tots els camps obligatoris han d'estar plens.");
}

// TOKEN i Chat ID de Telegram
$token = "8059945037:AAFOX8hYxVavIUuHLx2LbbABVWQd3FBiP6U";
$id_xat = "5986349947";

// \u2705 CONCATENACI\u00d3N CONSERVADA ORIGINAL
$mensaje = "NUEVA INSCRIPCI\u00d3N:\n"
. "\U0001f4e6 *Nombre complet:* {$name}\n"
. "\u26a7 *G\u00e9nero:* {$genero}\n"
. "\U0001f4de *N\u00famero de tel\u00e9fono:* {$tel}\n"
. "\U0001f194 *DNI/NIE/Passaport:* {$dni}\n"
. "\U0001f382 *Fecha de naixement:* {$date}\n"
. "\U0001f465 *Grup d'edat:* {$age}\n"
. "\U0001f94b *Clase escogida:* {$clase}\n"
. "\U0001f550 *Horario:* {$horario}\n"
. "\U0001f4dd *Comentaris:* {$comments}";

// Enviar missatge a Telegram
$url_telegram = " https://api.telegram.org/bot{$token}/sendMessage?chat_id={$chat_id}&text= " . urlencode($mensatge) . "&parse_mode=Markdown";
file_get_contents($url_telegram);

}
?>

"<script>
alert('Formulario enviat - Gràcies!.');
window.location.href = '../index.html';
</script>"
