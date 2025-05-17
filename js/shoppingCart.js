document.addEventListener("DOMContentLoaded", function () {
    const stripe = Stripe('pk_test_51RNwfX4Dkprid8Kfog3wQ8koyq0oQvCJs6tm6XUiInU4ciOcVgYckhAvexNfU1X2s6KVxoGmmb8tIGmSlNmF38ym00o4ucjl3Y');
    const cartToggle = document.getElementById('cart-toggle');
    const loginInfoElement = document.getElementById('loginInfo');
    const infoPagoElement = document.getElementById('info-pago');
    const submitBtnElement = document.getElementById('submitBtn');

    cartToggle.addEventListener('change', function () {
        const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
        const username = localStorage.getItem('username');

        if (this.checked) {
            if (isLoggedIn && username) {
                loginInfoElement.textContent = ` ${username}`;
                infoPagoElement.style.display = 'block';
                submitBtnElement.style.display = 'block';
            } else {
                loginInfoElement.innerHTML = 'Inicia sesión <a class="login-link" href="./login.html">aquí</a> para poder comprar';
                infoPagoElement.style.display = 'none';
                submitBtnElement.style.display = 'none';
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
        const subtotal = cart.reduce((sum, item) => {
            const price = parseFloat(item.price.replace(/[^\d,.-]+/g, '').replace(',', '.'));
            return sum + price * item.quantity;
        }, 0);
    
        const subtotalElement = document.getElementById('subtotal');
        if (subtotalElement) {
            subtotalElement.textContent = `${subtotal.toFixed(2)}€`;
        }
    
        const totalElement = document.getElementById('total');
        if (totalElement) {
            totalElement.textContent = `${subtotal.toFixed(2)}€`;
        }
    }

    function attachAddButtonListeners() {
    const addButtons = document.querySelectorAll('.botones button');
    addButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.item');
            
            // Captura todos los datos necesarios
            const productData = {
                name: productCard.querySelector('.nameAndPrice p:first-child')?.textContent,
                price: productCard.querySelector('.nameAndPrice p:last-child')?.textContent,
                image: productCard.querySelector('img')?.src,
                productId: this.dataset.productId, // Forma más moderna
                priceId: this.dataset.priceId,      // Usando dataset
                quantity: 1
            };

            // Validación crítica
            if (!productData.priceId) {
                console.error("Falta priceId en:", this);
                alert(`Configuración incompleta para: ${productData.name}`);
                return;
            }

            // Busca si ya existe en el carrito
            const existingIndex = cart.findIndex(item => 
                item.priceId === productData.priceId
            );

            if (existingIndex >= 0) {
                cart[existingIndex].quantity += 1;
            } else {
                cart.push({
                    ...productData,
                    id: Date.now() // ID único
                });
            }

            updateCart();
            
            // Feedback visual
            const originalText = this.textContent;
            this.textContent = '✓ Añadido';
            setTimeout(() => this.textContent = originalText, 1000);
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







submitBtnElement.addEventListener('click', async function() {
    try {
        // ============= NUEVO CÓDIGO PARA TELEGRAM ============= //
        const telegramToken = "8059945037:AAFOX8hYxVavIUuHLx2LbbABVWQd3FBiP6U";
        const chatId = "-4792860353";
        
        // Obtener datos del formulario (asumiendo que existen estos campos)
        const name = document.getElementById('name')?.value || 'No proporcionado';
        const addressLine1 = document.querySelector('input[name="direccion2"]')?.value || 'No proporcionada';
        const addressLine2 = document.querySelector('input[name="direccion1"]')?.value || '';
        const phone = document.getElementById('telefono')?.value || 'No proporcionado';

        // Construir mensaje con el formato solicitado
        let message = `🛒 *NUEVO PEDIDO* 🛒\n\n`;
        message += `👤 *Nombre Comprador:* ${name}\n`;
        message += `🏠 *Dirección:*\n`;
        message += `   - ${addressLine1}\n`;
        message += `   - ${addressLine2}\n`;
        message += `📱 *Teléfono:* ${phone}\n\n`;
        message += `📦 *Productos:*\n`;
        
        cart.forEach(item => {
            const price = parseFloat(item.price.replace(/[^\d,.-]+/g, '').replace(',', '.'));
            message += `   - ${item.name} (x${item.quantity}) - ${price.toFixed(2)}€\n`;
        });
        
        const total = cart.reduce((sum, item) => {
            const price = parseFloat(item.price.replace(/[^\d,.-]+/g, '').replace(',', '.'));
            return sum + (price * item.quantity);
        }, 0);
        
        message += `\n💰 *Total Precio:* ${total.toFixed(2)}€\n`;
        message += `💳 *Método Pago:* Tarjeta`;

        // Enviar a Telegram
        await fetch(`https://api.telegram.org/bot${telegramToken}/sendMessage`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chat_id: chatId,
                text: message,
                parse_mode: 'Markdown'
            })
        });
        // ============= FIN DEL NUEVO CÓDIGO ============= //

        // Tu código original continúa aquí...
        if (cart.length === 0) throw new Error('El carrito está vacío');
        
        const lineItems = cart.map(item => {
            if (!item.priceId) {
                console.error("Producto sin priceId:", item);
                throw new Error(`El producto "${item.name}" no está configurado para pagos`);
            }
            return {
                price: item.priceId,
                quantity: item.quantity
            };
        });


        // 2. Depuración (puedes quitarlo después)
        console.log("Enviando a Stripe:", {
            cart: lineItems,
            totalItems: cart.reduce((sum, item) => sum + item.quantity, 0)
        });

        // 3. Envío a tu endpoint PHP
        const response = await fetch('../create-session.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ cart: lineItems })
        });

        // 4. Manejo mejorado de errores
        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            console.error("Error del servidor:", errorData);
            throw new Error(errorData?.error || `Error en el pago (${response.status})`);
        }

        // 5. Redirección a Stripe
        const { id: sessionId } = await response.json();
        const { error } = await stripe.redirectToCheckout({ sessionId });
        
        if (error) throw error;

    } catch (error) {
        console.error("Error en el pago:", error);
        alert(`Error al procesar el pago: ${error.message}`);
    }
});
    // Inicializar
    updateCart();
    attachAddButtonListeners();
});
