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
// 
function saveCartToCookie() {
    const cartData = JSON.stringify(carritoItems);
    setCookie('cart_items', cartData, 3); // Guarda por 3 días
}
function attachAddButtonListeners() {
    const addButtons = document.querySelectorAll('.botones button');
    addButtons.forEach(button => {
        button.addEventListener('click', function() {
            const productCard = this.closest('.item');
            
            // Asegúrate que todos estos datos existen
            const productData = {
                name: productCard.querySelector('.nameAndPrice p:first-child')?.textContent || 'Producto sin nombre',
                price: productCard.querySelector('.nameAndPrice p:last-child')?.textContent || '0€',
                image: productCard.querySelector('img')?.src || '',
                priceId: this.dataset.priceId,
                databaseProductId: parseInt(this.dataset.databaseId), // Asegúrate que existe en HTML
                productId: this.dataset.productId, // Mantener por compatibilidad
                quantity: 1,
                id: Date.now() // ID único para el item
            };

            // Validación completa en el momento de añadir
            if (!productData.priceId || !productData.databaseProductId) {
                console.error("Datos faltantes en el botón:", {
                    button: this,
                    dataset: this.dataset,
                    productData
                });
                alert(`Error de configuración en: ${productData.name}`);
                return;
            }

            // Buscar si ya existe en el carrito
            const existingIndex = cart.findIndex(item => 
                item.priceId === productData.priceId
            );

            if (existingIndex >= 0) {
                cart[existingIndex].quantity += 1;
            } else {
                cart.push(productData); // Añadir el objeto completo
            }

            updateCart();
            
            // Feedback visual
            this.textContent = '✓ Añadido';
            setTimeout(() => this.textContent = 'Añadir al carrito', 1000);
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
        // ============= 1. RECOGER DATOS ============= //
        const username = localStorage.getItem('username');
        if (!username) throw new Error('Por favor, inicia sesión para continuar con la compra');
        
        // Obtener ambos campos de dirección
        const direccion1 = document.querySelector('input[name="direccion1"]')?.value.trim();
        const direccion2 = document.querySelector('input[name="direccion2"]')?.value.trim();
        
        // Validar dirección principal
        if (!direccion2) {
            throw new Error('Por favor, introduce al menos la dirección principal (Calle, número, piso)');
        }
        
        // Construir dirección completa
        const direccionCompleta = direccion1 ? `${direccion2}, ${direccion1}` : direccion2;

        // Validar carrito
        if (cart.length === 0) throw new Error('El carrito está vacío');
        
        // Preparar items para Stripe y BD
        const lineItems = [];
        const productosParaDB = [];
        
        cart.forEach(item => {
            if (!item.priceId || !item.databaseProductId) {
                console.error("Producto incompleto:", item);
                throw new Error(`Faltan datos para el producto: ${item.name}`);
            }
            
            const precioUnidad = parseFloat(item.price.replace(/[^\d,.-]+/g, '').replace(',', '.'));
            
            lineItems.push({
                price: item.priceId,
                quantity: item.quantity
            });
            
            productosParaDB.push({
                producto_id: item.databaseProductId,
                cantidad: item.quantity,
                precio_unidad: precioUnidad,
                nombre: item.name
            });
        });

        // ============= 2. CÓDIGO TELEGRAM ============= //
        const telegramToken = "8059945037:AAFOX8hYxVavIUuHLx2LbbABVWQd3FBiP6U";
        const chatId = "-4792860353";
        const name = document.getElementById('name')?.value || 'No proporcionado';
        const phone = document.getElementById('telefono')?.value || 'No proporcionado';

        let message = `🛒 *NUEVO PEDIDO* 🛒\n\n`;
        message += `👤 *Nombre Comprador:* ${name}\n`;
        message += `🏠 *Dirección:* ${direccionCompleta}\n`;  // Usamos la variable correcta aquí
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

        // ============= 3. ENVÍO A PHP (STRIPE) ============= //
        const response = await fetch('../create-session.php', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                cart: lineItems,
                productos: productosParaDB,
                username: username,
                direccion: direccionCompleta  // Usamos la misma variable aquí
            })
        });

        // Manejo de respuesta
        if (!response.ok) {
            const errorData = await response.json().catch(() => null);
            throw new Error(errorData?.error || `Error en el pago (${response.status})`);
        }

        // Redirección a Stripe
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
