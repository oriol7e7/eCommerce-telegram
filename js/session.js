let isLoggedIn = false;
let currentUser = null;

//Verificar el estado al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    
    // Si estamos en la página de la tienda (store.html)...
    if (window.location.pathname.includes('store.html')) {
        
        // Comprobar si hay una sesión activa
        if (localStorage.getItem('isLoggedIn') === 'true') {
            console.log('Bienvenido, estás logueado');
        } else {
            // Si no hay sesión, volver a login
            window.location.href = './login.html';
        }
    }
    // Manejar el formulario de login
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function() {
            // Cuando se envía el formulario, marcamos como "logueado"
            localStorage.setItem('isLoggedIn', 'true');
        });
    }
});