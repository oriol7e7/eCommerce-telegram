
// Detectar si el usuario ha iniciado sesión
let isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

if (isLoggedIn) {
  // Oculta el botón de login
  const loginBtn = document.getElementById('loginBtn');
  if (loginBtn) {
    loginBtn.style.display = 'none';
  }

  // Muestra un texto de prueba (puedes ponerlo donde quieras)
  const testText = document.createElement('p');
  testText.textContent = 'TEST: Usuario logueado';
  testText.style.color = 'lime';
  document.body.appendChild(testText); // O puedes añadirlo a un contenedor específico
}
    