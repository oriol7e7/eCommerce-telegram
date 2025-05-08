// session.js (actualizado)
let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
let currentUser = localStorage.getItem('username') || null;

// Verificar autenticación al cargar la página
function checkAuth() {
    if (window.location.pathname.includes('store.html') && !isLoggedIn) {
        window.location.href = '../login/login.html';
    }
}

// Llamar al cargar
document.addEventListener('DOMContentLoaded', checkAuth);