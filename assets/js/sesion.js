// Función para manejar el inicio de sesión
function login() {
    const email = document.querySelector('#email').value;
    const password = document.querySelector('#password').value;

    // Validar que se ingresen ambos campos
    if (!email || !password) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Por favor, completa todos los campos.',
        });
        return;
    }

    // Aquí iría tu lógica de autenticación, por ejemplo:
    const usuarioRegistrado = true;
    const nombreUsuario = email;

    // Simulando la verificación del usuario
    if (!usuarioRegistrado) {
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Usuario no registrado. Por favor, regístrate.',
        });
        return;
    }

    // Almacenar el nombre del usuario en el localStorage
    localStorage.setItem('username', nombreUsuario);

    // Redirigir al usuario a la página de inicio después de iniciar sesión
    window.location.href = 'carrito.html';
}

// Función para manejar el cierre de sesión
function logout() {
    // Mostrar SweetAlert para confirmar el cierre de sesión
    Swal.fire({
        icon: 'warning',
        title: '¿Estás seguro?',
        text: '¿Quieres cerrar sesión?',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Sí',
        cancelButtonText: 'No'
    }).then((result) => {
        // Si el usuario confirma, eliminar la información de autenticación del almacenamiento local y redirigir a la página de inicio de sesión
        if (result.isConfirmed) {
            localStorage.removeItem('username'); 
            window.location.href = 'index.html';
        }
    });
}

// Función para verificar si el usuario está logeado
function isLoggedIn() {
    const username = localStorage.getItem('username');
    return !!username; // Si el nombre de usuario existe, devuelve true; de lo contrario, devuelve false.
}

// Asignar funciones a los eventos del formulario de inicio de sesión y el botón de cierre de sesión
document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.querySelector('#loginForm');
    const logoutButton = document.querySelector('#logout');

    if (loginForm) {
        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            login();
        });
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', () => {
            logout();
        });
    }

    // Actualizar el nav según el estado de la sesión
    const updateNav = () => {
        const username = localStorage.getItem('username');
        const isLoggedIn = !!username;
        const navUsername = document.querySelector('#username');
        const loginLink = document.querySelector('#loginLink');
        const logoutLink = document.querySelector('#logoutLink');

        if (isLoggedIn) {
            navUsername.textContent = username;
            loginLink.style.display = 'none';
            logoutLink.style.display = 'inline';
        } else {
            navUsername.textContent = '';
            loginLink.style.display = 'inline';
            logoutLink.style.display = 'none';
        }
    };

    updateNav();
});
