$(document).ready(function() {
    // Verifica si el usuario ya está logueado al cargar la página
    checkLoginStatus();

    // Asigna un evento de envío al formulario de inicio de sesión
    $('#loginForm').submit(function(event) {
        event.preventDefault(); // Previene el comportamiento por defecto del formulario
        // Obtiene los valores de los campos de entrada
        let email = $('#email').val();
        let clave = $('#clave').val();

        // Realiza una solicitud POST al servidor con los datos de inicio de sesión
        $.post('/login', { email: email, clave: clave }, function(response) {
            // Verifica si el usuario existe en la respuesta del servidor
            if (response.exists) {
                // Almacena el email del usuario en localStorage
                localStorage.setItem('userEmail', email);
                localStorage.setItem('userPerfilId', response.perfilId);

                // Redirige a la página correspondiente según el perfil del usuario
                if (response.perfilId === 1) {
                    window.location.href = '/inicio-admin';
                } else {
                    window.location.href = '/inicio';
                }
            } else {
                // Muestra un mensaje de error utilizando la librería Swal
                Swal.fire('Correo no encontrado', 'El correo no existe o la clave es incorrecta.', 'error');
            }
        });
    });

    // Asigna un evento de clic al elemento con id 'logoutLink' para cerrar sesión
    $('#logoutLink').click(function(event) {
        event.preventDefault(); // Previene el comportamiento predeterminado del enlace
        logout(); // Ejecuta la función de logout
    });

    // Asigna un evento de envío al formulario de registro
    $('#registerForm').submit(function(event) {
        event.preventDefault(); // Previene el comportamiento por defecto del formulario
        // Obtiene los valores de los campos de entrada
        let name = $('#name').val();
        let email = $('#email').val();
        let password = $('#password').val();

        // Realiza una solicitud AJAX al servidor para registrar un nuevo usuario
        $.ajax({
            url: '/register',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify({ name: name, email: email, clave: password }),
            success: function(response) {
                // Verifica si el usuario se registró correctamente
                if (response.registered) {
                    // Muestra un mensaje de éxito utilizando la librería Swal
                    Swal.fire('Registro exitoso', '¡Usuario registrado correctamente!', 'success').then(() => {
                        window.location.href = '/login'; // Redirige a la página de inicio de sesión
                    });
                } else {
                    Swal.fire('Error', 'La creación del usuario falló', 'error'); // Muestra un mensaje de error
                }
            },
            error: function(xhr, status, error) {
                Swal.fire('Error', 'El usuario ya está registrado o hubo un problema en el servidor.', 'error'); // Muestra un mensaje de error
            }
        });
    });

    // Función para cerrar sesión
    function logout() {
        // Elimina la información del usuario de localStorage
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userPerfilId');

        // Redirige al index
        window.location.href = '/';
    }

    // Función para verificar el estado de inicio de sesión
    function checkLoginStatus() {
        let userEmail = localStorage.getItem('userEmail');
        let userPerfilId = localStorage.getItem('userPerfilId');

        if (userEmail && userPerfilId) {
            // Muestra el email del usuario y el botón de cerrar sesión
            $('#userEmail').text(userEmail);
            $('#userContainer').show();
            $('#navLinks, #searchForm').hide();
        } else {
            // Si no está logueado, muestra los enlaces de navegación y el formulario de búsqueda
            $('#userContainer').hide();
            $('#navLinks, #searchForm').show();
        }
    }
});
