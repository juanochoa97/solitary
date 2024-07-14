document.addEventListener('DOMContentLoaded', (event) => {
    checkLoginStatus();

    document.getElementById('login-form').addEventListener('submit', function (event) {
        event.preventDefault();
        login();
    });
});

function login() {
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    if (username === 'admin' && password === 'admin') { // Cambia esto por una autenticación real
        sessionStorage.setItem('isAuthenticated', true);
        checkLoginStatus();
    } else {
        alert('Usuario o contraseña incorrectos');
    }
}

function logout() {
    sessionStorage.removeItem('isAuthenticated');
    checkLoginStatus();
}

function checkLoginStatus() {
    const isAuthenticated = sessionStorage.getItem('isAuthenticated');

    if (isAuthenticated) {
        document.getElementById('login-section').style.display = 'none';
        document.querySelectorAll('.admin-section').forEach(section => section.style.display = 'block');
        document.getElementById('admin-nav').style.display = 'block';
        document.getElementById('client-nav').style.display = 'none';
    } else {
        document.getElementById('login-section').style.display = 'none';
        document.querySelectorAll('.admin-section').forEach(section => section.style.display = 'none');
        document.getElementById('admin-nav').style.display = 'none';
        document.getElementById('client-nav').style.display = 'block';
    }
}

function showSection(sectionId) {
    document.querySelectorAll('main > section').forEach(section => section.style.display = 'none');
    document.getElementById(sectionId).style.display = 'block';
}
