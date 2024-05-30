$(document).ready(function() {
    // Asigna un evento de envío al formulario con id 'loginForm'
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
    // Asigna un evento de envío al formulario con id 'registerForm'
$('#registerForm').submit(function(event) {
    event.preventDefault(); // Previene el comportamiento por defecto del formulario
    // Obtiene los valores de los campos de entrada
    let nombre = $('#name').val();
    let email = $('#email').val();
    let clave = $('#password').val(); 
    // Realiza una solicitud AJAX al servidor para registrar un nuevo usuario
    $.ajax({
        url: '/register',
        type: 'POST',
        data: { nombre: nombre, email: email, clave: clave },
        success: function(response) {
            if (response.registered) {
                Swal.fire('Registro exitoso', '¡Correo registrado correctamente!', 'success').then(() => {
                    window.location.href = '/login';
                });
            } else {
                Swal.fire('Error', 'La creación del correo falló', 'error');
            }
        },
        error: function(xhr, status, error) {
            Swal.fire('Error', 'Error en la solicitud AJAX: ' + error, 'error');
        },
        complete: function(xhr, status) {
            console.log('Solicitud completada. Estado:', status);
        }
    });
    
});
});
