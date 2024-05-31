$(document).ready(function() {
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
                // Redirige a la página correspondiente según el perfil del usuario
                if (response.perfilId === 1) {
                    // Redirige a la página de inicio del administrador
                    window.location.href = '/inicio-admin';
                } else {
                    // Redirige a la página de inicio regular
                    window.location.href = '/inicio';
                }
            } else {
                // Muestra un mensaje de error utilizando la librería Swal
                Swal.fire('Correo no encontrado', 'El correo no existe o la clave es incorrecta.', 'error');
            }
        });
    });

    // Función para cerrar sesión
    function logout() {
        // Redirige al index
        window.location.href = '/index';
    }

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
            // Función a ejecutar si la solicitud es exitosa
            success: function(response) {
                // Verifica si el usuario se registró correctamente
                if (response.registered) {
                    // Muestra un mensaje de éxito utilizando la librería Swal
                    Swal.fire('Registro exitoso', '¡Usuario registrado correctamente!', 'success').then(() => {
                        // Redirige a la página de inicio de sesión después de que se cierre el mensaje de éxito
                        window.location.href = '/login';
                    });
                } else {
                    // Muestra un mensaje de error utilizando la librería Swal
                    Swal.fire('Error', 'La creación del usuario falló', 'error');
                }
            },
            // Función a ejecutar si hay un error en la solicitud
            error: function(xhr, status, error) {
                // Muestra un mensaje de error utilizando la librería Swal
                Swal.fire('Error', 'El usuario ya está registrado o hubo un problema en el servidor.', 'error');
            }
        });
    });
});
