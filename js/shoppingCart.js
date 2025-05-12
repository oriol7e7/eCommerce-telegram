const emojiUsuario = "\u{1F464}"; // Código Unicode para 👤

// Esperamos a que todo el contenido del documento se haya cargado antes de ejecutar el código.
document.addEventListener("DOMContentLoaded", function () {
    // Se obtiene del almacenamiento local la información sobre si el usuario está logueado.
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const username = localStorage.getItem('username');

    // Se selecciona el elemento donde se mostrará la información del usuario.
    const loginInfoElement = document.getElementById('login-info');

    // Se selecciona el formulario con el id 'venta-form'.
    const ventaFormElement = document.getElementById('venta-form');

    console.log("Estado de sesión:", isLoggedIn);
    console.log("Usuario:", username);
    console.log("Elemento login-info:", loginInfoElement);
    console.log("Elemento venta-form:", ventaFormElement);

    if (loginInfoElement && ventaFormElement) {
        if (isLoggedIn && username) {
            console.log("Usuario logueado, actualizando la interfaz...");
            loginInfoElement.textContent = `${emojiUsuario} ${username}`;
            loginInfoElement.classList.add("usuario-activo");
            ventaFormElement.style.display = 'block'; // Muestra el formulario
        } else {
            console.log("No hay usuario logueado, restaurando el mensaje...");
            loginInfoElement.innerHTML = 'Inicia sesión <a class="login-link" href="./login.html">aquí</a> para poder comprar';
            loginInfoElement.classList.remove("usuario-activo");
            ventaFormElement.style.display = 'none'; // Oculta el formulario
        }
    } else {
        console.log("Error: No se encontraron los elementos en el DOM.");
    }
});
