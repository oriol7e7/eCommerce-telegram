document.addEventListener('DOMContentLoaded', function() {
    // 1. Mostrar banner solo si no hay decisión previa
    if (!getCookie('cookies_accepted')) {
        document.getElementById('cookie-banner').style.display = 'block';
    }

    // 2. Configurar eventos de los botones
    document.getElementById('accept-cookies').addEventListener('click', function() {
        setCookie('cookies_accepted', 'all', 365);
        loadAllCookies();
        hideBanner();
    });

    document.getElementById('reject-cookies').addEventListener('click', function() {
        setCookie('cookies_accepted', 'necessary', 365);
        loadNecessaryCookies();
        hideBanner();
    });

    document.getElementById('configure-cookies').addEventListener('click', function() {
        document.getElementById('cookie-settings').style.display = 'block';
    });
});

// Funciones básicas
function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    document.cookie = `${name}=${value};expires=${date.toUTCString()};path=/;SameSite=Lax`;
}

function getCookie(name) {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
        const [cookieName, cookieValue] = cookie.trim().split('=');
        if (cookieName === name) return cookieValue;
    }
    return null;
}

function hideBanner() {
    document.getElementById('cookie-banner').style.display = 'none';
}

// Carga de cookies
function loadNecessaryCookies() {
    // Cookies para sesión y carrito
    setCookie('session_cookie', 'active', 1);
    console.log('Cookies necesarias cargadas');
}

function loadAllCookies() {
    loadNecessaryCookies();
    // Aquí inicializarías Google Analytics si lo usas
    console.log('Todas las cookies cargadas');
}
