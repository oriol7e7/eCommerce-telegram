const emojiUsuario = "\u{1F464}"; // Código Unicode para 👤

// Esperamos a que todo el contenido del documento se haya cargado antes de ejecutar el código.
document.addEventListener("DOMContentLoaded", function () {
    const loginInfoElement = document.querySelector('#loginInfo'); // Usamos querySelector para mayor compatibilidad
    const ventaFormElement = document.querySelector('#ventaForm'); // Aseguramos que el formulario también se obtiene

    console.log("Elemento login-info:", loginInfoElement);
    console.log("Elemento venta-form:", ventaFormElement);

    if (!loginInfoElement || !ventaFormElement) {
        console.error("Error: No se encontraron los elementos en el DOM. Verifica que los 'id' en HTML sean correctos.");
        return; // Detenemos la ejecución si los elementos no existen
    }

    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const username = localStorage.getItem('username');

    console.log("Estado de sesión:", isLoggedIn);
    console.log("Usuario:", username);

    if (isLoggedIn && username) {
        console.log("Usuario logueado, mostrando el formulario...");
        loginInfoElement.textContent = `👤 ${username}`;
        loginInfoElement.classList.add("usuario-activo");
        ventaFormElement.style.display = 'block';
    } else {
        console.log("No hay sesión activa, ocultando formulario...");
        loginInfoElement.innerHTML = 'Inicia sesión <a class="login-link" href="./login.html">aquí</a> para poder comprar';
        loginInfoElement.classList.remove("usuario-activo");
        ventaFormElement.style.display = 'none';
    }
});
