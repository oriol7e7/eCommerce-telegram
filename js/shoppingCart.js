document.addEventListener("DOMContentLoaded", function() {
    const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
    const username = localStorage.getItem('username');
    const loginInfoElement = document.getElementById('login-info');

    // Solo modificamos el texto si está logueado y existe el elemento
    if (isLoggedIn && username && loginInfoElement) {
        loginInfoElement.textContent = `Usuario: ${username}`;
    }
    // Si no está logueado, sale el texto que hay en el html
});