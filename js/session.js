
  function getQueryParam(param) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(param);
  }

  // Detectar login desde la URL
  const loginParam = getQueryParam('login');
  const userParam = getQueryParam('user');

  if (loginParam === 'success' && userParam) {
    // Guardar en localStorage
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('username', decodeURIComponent(userParam));
  }

  // Leer desde localStorage (esto funcionará incluso en otras páginas)
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';
  const username = localStorage.getItem('username');

  if (isLoggedIn && username) {
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
      loginBtn.textContent = `Bienvenido, ${username} `;
      loginBtn.href = "#";
    }
  }
