

// Función para obtener parámetros de la URL.
// Se utiliza para detectar si el usuario ha iniciado sesión a través de una redirección.
function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
}

// Recuperamos los parámetros de la URL para verificar si el usuario ha iniciado sesión correctamente.
const loginParam = getQueryParam('login'); // Obtiene el estado de login (success o vacío)
const userParam = getQueryParam('user'); // Obtiene el nombre del usuario si está en la URL

// Si el usuario ha iniciado sesión correctamente, guardamos los datos en el almacenamiento local.
if (loginParam === 'success' && userParam) {
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', decodeURIComponent(userParam));
    
    // Obtener user_id de la URL o hacer una petición al servidor si no está
    const userIdParam = getQueryParam('user_id');
    if (userIdParam) {
        localStorage.setItem('user_id', userIdParam);
        console.log('User ID almacenado:', userIdParam);
    } else {
        // Hacer petición al servidor para obtener el ID del usuario
        fetch('/api/get-user-id?username=' + encodeURIComponent(userParam))
            .then(response => response.json())
            .then(data => {
                if (data.user_id) {
                    localStorage.setItem('user_id', data.user_id);
                    console.log('User ID obtenido del servidor:', data.user_id);
                }
            });
    }
}


// Recuperamos los datos de sesión guardados en `localStorage`.
const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Verifica si el usuario está logueado
const username = localStorage.getItem('username'); // Obtiene el nombre del usuario

// Capturamos los elementos HTML necesarios para actualizar la interfaz.
const loginBtn = document.getElementById('loginBtn'); // Botón de inicio de sesión
const userMenu = document.getElementById('userMenu'); // Menú desplegable del usuario
const logoutBtn = document.getElementById('logoutBtn'); // Botón de cerrar sesión
const loginInfoElement = document.getElementById('loginInfo'); // Área donde se muestra el usuario
const ventaFormElement = document.getElementById('ventaForm'); // Formulario de compra

// Verificación en consola para depuración
console.log("Estado de sesión:", isLoggedIn);
console.log("Usuario:", username);
console.log("Elemento loginInfo:", loginInfoElement);
console.log("Elemento ventaForm:", ventaFormElement);

if (isLoggedIn && username) {
    console.log("Usuario logueado, actualizando la interfaz...");
    
    if (loginBtn) {
        loginBtn.textContent = `Bienvenido, ${username}`;
        loginBtn.href = "#"; // Evitamos que se redirija a login nuevamente
    }

    if (loginInfoElement) {
        loginInfoElement.textContent = `${username}`;
        loginInfoElement.classList.add("usuario-activo");
    }

    if (ventaFormElement) {
        ventaFormElement.style.display = 'block'; // Mostrar formulario de compra
    }

    // Evento para mostrar el menú de usuario al hacer clic en el botón de login.
    loginBtn.addEventListener('click', function (e) {
        e.preventDefault();
        userMenu.style.display = userMenu.style.display === 'block' ? 'none' : 'block';

        // Posicionamos dinámicamente el menú cerca del botón de login.
        const rect = loginBtn.getBoundingClientRect();
        userMenu.style.top = `${rect.bottom + window.scrollY}px`;
        userMenu.style.left = `${rect.left + window.scrollX}px`;
    });

} else {
    console.log("No hay usuario logueado, restaurando el mensaje...");
    
    if (loginInfoElement) {
        loginInfoElement.innerHTML = 'Inicia sesión <a class="login-link" href="./login.html">aquí</a> para poder comprar';
        loginInfoElement.classList.remove("usuario-activo");
    }

    if (ventaFormElement) {
        ventaFormElement.style.display = 'none'; // Ocultar formulario de compra
    }
}

// Evento para cerrar sesión cuando el usuario haga clic en "Cerrar sesión".
logoutBtn.addEventListener('click', function (e) {
    e.preventDefault();

    console.log("Cerrando sesión...");

    // Eliminar información de sesión del almacenamiento local.
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');

    // Ocultar el menú de usuario.
    userMenu.style.display = 'none';

    // Restaurar el botón de login.
    if (loginBtn) {
        loginBtn.textContent = "Iniciar sesión";
        loginBtn.href = "/pages/login.html";
    }

    // Restaurar `loginInfo` al mensaje por defecto.
    if (loginInfoElement) {
        loginInfoElement.innerHTML = 'Inicia sesión <a class="login-link" href="./login.html">aquí</a> para poder comprar';
        loginInfoElement.classList.remove("usuario-activo");
    }

    // Ocultar el formulario de compra.
    if (ventaFormElement) {
        ventaFormElement.style.display = 'none';
    }

    // Redirigir a la página de tienda sin sesión activa.
    window.location.href = "/pages/store.html";
});
