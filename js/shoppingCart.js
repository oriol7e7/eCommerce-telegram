document.addEventListener("DOMContentLoaded", function () {
    // Comprueba si esta logeado o no i dependiendo de eso muestra el mensaje de login o aparece el formulario para pagar
    const cartToggle = document.getElementById('cart-toggle');
    const loginInfoElement = document.getElementById('loginInfo');
    const ventaFormElement = document.getElementById('ventaForm');

    cartToggle.addEventListener('change', function() {
        if (this.checked) {
            const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
            const username = localStorage.getItem('username');

            if (isLoggedIn && username) {
                loginInfoElement.textContent = ` ${username}`;
                ventaFormElement.style.display = 'block';
            } else {
                loginInfoElement.innerHTML = 'Inicia sesión <a class="login-link" href="./login.html">aquí</a> para poder comprar';
                ventaFormElement.style.display = 'none';
            }
        }
    });

    // Suma un item al contador cuando hace click y guarda items en un array para renderizarlo dentro del carrito
    const addButtons = document.querySelectorAll('.botones button');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');
    const totalPriceElement = document.createElement('div'); // Se crea dinámicamente el total
    
    // Cargar carrito existente o crear uno nuevo
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Función para actualizar todo el carrito
    function updateCart() {
        // Mantener tu contador existente
        cartCount.textContent = cart.length;
        localStorage.setItem('cartCount', cart.length);
        
        // Renderizar productos
        renderCartItems();
        
        // Calcular y mostrar total
        updateTotal();
        
        // Guardar en localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
    }

    function renderCartItems() {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Tu carrito está vacío</p>';
            return;
        }
        
        let itemsHTML = '';
        cart.forEach(item => {
            itemsHTML += `
                <div class="cart-item" data-id="${item.id}">
                    <span>${item.name} - ${item.price}</span>
                    <button class="remove-item">Eliminar</button>
                </div>
            `;
        });
        cartItemsContainer.innerHTML = itemsHTML;
    }

    function updateTotal() {
        const total = cart.reduce((sum, item) => {
            return sum + parseFloat(item.price.replace('€', ''));
        }, 0);
        
        // Insertar el total en el formulario de venta
        if (!document.getElementById('total-price')) {
            totalPriceElement.id = 'total-price';
            totalPriceElement.innerHTML = `<strong>Total: ${total.toFixed(2)}€</strong>`;
            ventaFormElement.appendChild(totalPriceElement);
        } else {
            document.getElementById('total-price').innerHTML = `<strong>Total: ${total.toFixed(2)}€</strong>`;
        }
    }

    // Evento para añadir productos (manteniendo tu feedback visual)
    addButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.item');
            const product = {
                id: Date.now(),
                name: productCard.querySelector('.nameAndPrice p:first-child').textContent,
                price: productCard.querySelector('.nameAndPrice p:last-child').textContent,
                image: productCard.querySelector('img').src // Obtenemos la URL de la imagen
            };
            
            cart.push(product);
            updateCart();
            
            // Mantener tu efecto visual
            this.textContent = '✔ Item añadido';
            setTimeout(() => {
                this.textContent = 'Añadir al carrito';
            }, 1000);
        });
    });

    // Evento para eliminar productos
    cartItemsContainer.addEventListener('click', function(e) {
        if (e.target.classList.contains('remove-item')) {
            const itemId = parseInt(e.target.closest('.cart-item').dataset.id);
            cart = cart.filter(item => item.id !== itemId);
            updateCart();
        }
    });

    // Inicializar carrito
    updateCart();

});