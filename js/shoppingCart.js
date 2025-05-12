const emojiUsuario = "\u{1F464}"; // Código Unicode para 👤
// Esperamos a que todo el contenido del documento se haya cargado antes de ejecutar el código.
document.addEventListener("DOMContentLoaded", function() {

    // Se obtiene del almacenamiento local la información sobre si el usuario está logueado.
    // Si la clave 'isLoggedIn' tiene el valor 'true', se considera que el usuario ha iniciado sesión.
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

    // Se obtiene el nombre de usuario guardado en el almacenamiento local.
    const username = localStorage.getItem('username');

    // Se selecciona el elemento HTML donde se mostrará la información del usuario.
    const loginInfoElement = document.getElementById('login-info');

    // Se selecciona el formulario con el id 'venta-form', que inicialmente está oculto (display: none en CSS).
    const ventaFormElement = document.getElementById('venta-form');

    // Si el usuario está logueado (isLoggedIn es true) y hay un nombre de usuario guardado, se actualiza el contenido del elemento 'login-info'.
    if (isLoggedIn && username && loginInfoElement) {
        loginInfoElement.textContent = `${emojiUsuario} ${username}`; // Se muestra el nombre del usuario.
        loginInfoElement.classList.add("usuario-activo"); // Agrega una clase cuando hay usuario logueado

        // Además, si el formulario de venta existe en el documento, se cambia su display para que aparezca.
        if (ventaFormElement) {
            ventaFormElement.style.display = 'block'; // Se hace visible el formulario.
        }
    }
});
