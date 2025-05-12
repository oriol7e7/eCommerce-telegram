const emojiUsuario = "\u{1F464}"; // Código Unicode para 👤

// Esperamos a que todo el contenido del documento se haya cargado antes de ejecutar el código.
document.addEventListener("DOMContentLoaded", function () {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const username = localStorage.getItem('username');

    const loginInfoElement = document.getElementById('login-info');
    const ventaFormElement = document.getElementById('venta-form');

    console.log("Estado de sesión:", isLoggedIn);
    console.log("Usuario:", username);

    if (isLoggedIn && username) {
        console.log("Usuario logueado, mostrando el formulario...");
        loginInfoElement.textContent = `${emojiUsuario} ${username}`;
        loginInfoElement.classList.add("usuario-activo");
        ventaFormElement.style.display = 'block';
    } else {
        console.log("No hay sesión activa, ocultando formulario...");
        loginInfoElement.innerHTML = 'Inicia sesión <a class="login-link" href="./login.html">aquí</a> para poder comprar';
        loginInfoElement.classList.remove("usuario-activo");
        ventaFormElement.style.display = 'none';
    }
});
