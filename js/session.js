// Definimos el emoji para representar al usuario.
const emojiUsuario = "\u{1F464}"; // Código Unicode para 👤

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
  localStorage.setItem('isLoggedIn', 'true'); // Guarda el estado de sesión como 'true'
  localStorage.setItem('username', decodeURIComponent(userParam)); // Guarda el nombre del usuario
}

// Recuperamos los datos de sesión guardados en `localStorage`.
const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true'; // Verifica si el usuario está logueado
const username = localStorage.getItem('username'); // Obtiene el nombre del usuario

// Capturamos los elementos HTML necesarios para actualizar la interfaz.
const loginBtn = document.getElementById('loginBtn'); // Botón de inicio de sesión
const userMenu = document.getElementById('userMenu'); // Menú desplegable del usuario
const logoutBtn = document.getElementById('logoutBtn'); // Botón de cerrar sesión

// Si el usuario está logueado, actualizamos el botón de login para mostrar su nombre.
if (isLoggedIn && username && loginBtn) {
  loginBtn.textContent = `Bienvenido, ${username}`;
  loginBtn.href = "#"; // Evitamos que se redirija a la página de login nuevamente

  // Evento para mostrar el menú de usuario cuando se haga clic en el botón de login.
  loginBtn.addEventListener('click', function (e) {
    e.preventDefault();
    userMenu.style.display = userMenu.style.display === 'block' ? 'none' : 'block';

    // Posicionamos dinámicamente el menú cerca del botón de login.
    const rect = loginBtn.getBoundingClientRect();
    userMenu.style.top = `${rect.bottom + window.scrollY}px`;
    userMenu.style.left = `${rect.left + window.scrollX}px`;
  });

  // Evento para cerrar sesión cuando el usuario haga clic en "Cerrar sesión".
  logoutBtn.addEventListener('click', function (e) {
    e.preventDefault();

    // Eliminamos los datos de sesión del almacenamiento local.
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');

    // Ocultamos el menú de usuario.
    userMenu.style.display = 'none';

    // Restauramos el botón de login con su texto original.
    loginBtn.textContent = "Iniciar sesión";
    loginBtn.href = "/pages/login.html"; // Redirigimos a la página de login

    // Ocultamos el formulario de venta, ya que el usuario ha cerrado sesión.
    const ventaFormElement = document.getElementById('venta-form');
    if (ventaFormElement) {
        ventaFormElement.style.display = 'none';
    }

    // Restauramos el mensaje por defecto en el área de usuario y eliminamos estilos especiales.
    const loginInfoElement = document.getElementById('login-info');
    if (loginInfoElement) {
        loginInfoElement.textContent = "Inicia sesión"; // Restauramos el mensaje estándar
        loginInfoElement.classList.remove("usuario-activo"); // Quitamos la clase de usuario activo
    }

    // Redirigimos a la página principal para evitar que la URL conserve los parámetros de sesión.
    window.location.href = "/pages/store.html";
  });
}
