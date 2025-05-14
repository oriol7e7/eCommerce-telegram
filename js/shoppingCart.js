document.addEventListener("DOMContentLoaded", function () {
    const cartToggle = document.getElementById('cart-toggle');
    const loginInfoElement = document.getElementById('loginInfo');
    const ventaFormElement = document.getElementById('ventaForm');

    cartToggle.addEventListener('change', function () {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const username = localStorage.getItem('username');

        if (this.checked) {
            if (isLoggedIn && username) {
                loginInfoElement.textContent = ` ${username}`;
                ventaFormElement.style.display = 'block';
            } else {
                loginInfoElement.innerHTML = 'Inicia sesión <a class="login-link" href="./login.html">aquí</a> para poder comprar';
                ventaFormElement.style.display = 'none';
            }
        }
    });

    const cartItemsContainer = document.getElementById('cart-items');
    const cartCount = document.getElementById('cart-count');

    if (!cartItemsContainer || !cartCount) {
        console.error('Error: No se encontraron los elementos del carrito en el DOM');
        return;
    }

    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    function updateCart() {
        cartCount.textContent = cart.reduce((total, item) => total + item.quantity, 0);
        localStorage.setItem('cart', JSON.stringify(cart));
        renderCartItems();
        updateTotal(); // Llama a esta función para actualizar precios
    }

    function renderCartItems() {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<p>Tu carrito está vacío</p>';
            return;
        }

        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item" data-id="${item.id}">
                <img src="${item.image}" alt="${item.name}" class="cart-item-img" width="100">
                <div class="cart-item-info">
                    <span class="cart-item-name">${item.name}</span>
                    <span class="cart-item-price">${item.price}</span>
                    <span class="cart-item-quantity">Cantidad: <span class="item-quantity">${item.quantity}</span></span>
                </div>
                <div class="botones-add">
                    <button class="add-item">Añadir</button>
                    <button class="remove-item">Eliminar</button>
                </div>
            </div>
        `).join('');
    }

    // --- FUNCIÓN ACTUALIZADA PARA MOSTRAR SUBTOTAL Y TOTAL ---
    function updateTotal() {
        // 1. Calcula el subtotal (suma de todos los items)
        const subtotal = cart.reduce((sum, item) => {
            // Convierte precios como "10,99€" a 10.99 (float)
            const price = parseFloat(item.price.replace(/[^\d,.-]+/g, '').replace(',', '.'));
            return sum + price * item.quantity;
        }, 0);
    
        // 2. Muestra el Subtotal en tu modal (id="subtotal")
        const subtotalElement = document.getElementById('subtotal');
        if (subtotalElement) {
            subtotalElement.textContent = `${subtotal.toFixed(2)}€`; // Solo el precio (sin texto "Subtotal")
        }
    
        // 3. Muestra el Total en tu modal (id="total")
        const totalElement = document.getElementById('total');
        if (totalElement) {
            totalElement.textContent = `${subtotal.toFixed(2)}€`; // Mismo valor que subtotal (envío gratis)
        }
    
        // --- Elimina esta parte si no quieres el "total-price" extra ---
        let totalPriceElement = document.getElementById('total-price');
        if (totalPriceElement) {
            totalPriceElement.remove(); // Elimina el elemento duplicado si existe
        }
    }
    

    // --- Resto del código (sin cambios) ---
    function attachAddButtonListeners() {
        const addButtons = document.querySelectorAll('.botones button');
        addButtons.forEach(button => {
            button.addEventListener('click', function () {
                const productCard = this.closest('.item');
                if (!productCard) return;

                const name = productCard.querySelector('.nameAndPrice p:first-child')?.textContent;
                const price = productCard.querySelector('.nameAndPrice p:last-child')?.textContent;
                const image = productCard.querySelector('img')?.src;

                if (!name || !price || !image) return;

                const existingItem = cart.find(item => item.name === name);

                if (existingItem) {
                    existingItem.quantity += 1;
                } else {
                    cart.push({
                        id: Date.now(),
                        name,
                        price,
                        image,
                        quantity: 1
                    });
                }

                updateCart();

                const originalText = this.textContent;
                this.textContent = '✔ Añadido';
                setTimeout(() => {
                    this.textContent = originalText;
                }, 1000);
            });
        });
    }

    cartItemsContainer.addEventListener('click', function (e) {
        const itemElement = e.target.closest('.cart-item');
        if (!itemElement) return;

        const name = itemElement.querySelector('.cart-item-name')?.textContent;
        if (!name) return;

        const itemIndex = cart.findIndex(item => item.name === name);
        if (itemIndex === -1) return;

        if (e.target.classList.contains('remove-item')) {
            if (cart[itemIndex].quantity > 1) {
                cart[itemIndex].quantity -= 1;
            } else {
                cart.splice(itemIndex, 1);
            }
            updateCart();
        }

        if (e.target.classList.contains('add-item')) {
            cart[itemIndex].quantity += 1;
            updateCart();
        }
    });

    // Inicializar
    updateCart();
    attachAddButtonListeners();
});