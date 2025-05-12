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




//Funcion para sumar al contador de productos del carrito

document.addEventListener("DOMContentLoaded", function() {
    // 1. Seleccionar elementos
    const addToCartButtons = document.querySelectorAll('.botones button'); // Todos los botones
    const cartCount = document.getElementById('cart-count'); // Elemento del contador

    // 2. Inicializar contador (usando localStorage)
    let count = localStorage.getItem('cartCount') || 0;
    cartCount.textContent = count;

    // 3. Añadir evento a cada botón
    addToCartButtons.forEach(button => {
        button.addEventListener('click', function() {
            // 4. Incrementar contador
            count++;
            cartCount.textContent = count;
            
            // 5. Guardar en localStorage (para persistencia)
            localStorage.setItem('cartCount', count);
            
            // Opcional: Feedback visual
            button.textContent = '✔ Item añadido';
            setTimeout(() => {
                button.textContent = 'Añadir al carrito';
            }, 1000);
        });
    });
});