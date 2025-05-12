function getQueryParam(param) {
  const urlParams = new URLSearchParams(window.location.search);
  return urlParams.get(param);
}

const loginParam = getQueryParam('login');
const userParam = getQueryParam('user');

if (loginParam === 'success' && userParam) {
  localStorage.setItem('isLoggedIn', 'true');
  localStorage.setItem('username', decodeURIComponent(userParam));
}

const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
const username = localStorage.getItem('username');

const loginBtn = document.getElementById('loginBtn');
const userMenu = document.getElementById('userMenu');
const logoutBtn = document.getElementById('logoutBtn');

if (isLoggedIn && username && loginBtn) {
  loginBtn.textContent = `Bienvenido, ${username} `;
  loginBtn.href = "#";

  // Mostrar menú al hacer clic
  loginBtn.addEventListener('click', function (e) {
    e.preventDefault();
    userMenu.style.display = userMenu.style.display === 'block' ? 'none' : 'block';

    // Posicionar el menú
    const rect = loginBtn.getBoundingClientRect();
    userMenu.style.top = `${rect.bottom + window.scrollY}px`;
    userMenu.style.left = `${rect.left + window.scrollX}px`;
  });

  logoutBtn.addEventListener('click', function (e) {
    e.preventDefault();

    // Eliminar información de sesión del localStorage
    localStorage.removeItem('isLoggedIn');
    localStorage.removeItem('username');

    // Ocultar el menú de usuario
    userMenu.style.display = 'none';

    // Restaurar el botón de login
    loginBtn.textContent = "Iniciar sesión";
    loginBtn.href = "/pages/login.html";

    // Redirigir a la página sin parámetros en la URL
    window.location.href = "/pages/store.html";
});

}
