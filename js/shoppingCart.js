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
        updateTotal();
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

    function updateTotal() {
        const total = cart.reduce((sum, item) => {
            const price = parseFloat(item.price.replace(/[^\d,.-]+/g, '').replace(',', '.'));
            return sum + price * item.quantity;
        }, 0);

        let totalElement = document.getElementById('total-price');
        if (!totalElement) {
            totalElement = document.createElement('div');
            totalElement.id = 'total-price';
            ventaFormElement.appendChild(totalElement);
        }

        totalElement.innerHTML = `<strong>Total: ${total.toFixed(2)}€</strong>`;
    }

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

                // Comprobar si el producto ya está en el carrito
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

                // Feedback visual
                const originalText = this.textContent;
                this.textContent = '✔ Añadido';
                setTimeout(() => {
                    this.textContent = originalText;
                }, 1000);
            });
        });
    }

    // Delegación para botones dentro del carrito
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
