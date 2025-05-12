const emojiUsuario = "\u{1F464}"; // Código Unicode para 👤

document.addEventListener("DOMContentLoaded", function () {
    const cartToggle = document.getElementById('cart-toggle');
    const loginInfoElement = document.getElementById('loginInfo');
    const ventaFormElement = document.getElementById('ventaForm');

    // Verificar el estado de sesión cada vez que se abre el carrito
    cartToggle.addEventListener('change', function() {
        if (this.checked) { // Solo si la modal está abierta
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            const username = localStorage.getItem('username');

            if (isLoggedIn && username) {
                loginInfoElement.textContent = ` ${username}`;
                ventaFormElement.style.display = 'block'; // Mostrar usuario
            } else {
                loginInfoElement.innerHTML = 'Inicia sesión <a class="login-link" href="./login.html">aquí</a> para poder comprar';
                ventaFormElement.style.display = 'none';
            }
        }
    });
});