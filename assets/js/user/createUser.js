// createUser.js

document.addEventListener("DOMContentLoaded", function() {
    const createUserForm = document.getElementById('createUserForm');

    createUserForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Obtener los valores del formulario
        const nombre = document.getElementById('nombre').value;
        const email = document.getElementById('email').value;
        const clave = document.getElementById('clave').value;
        const perfil = document.getElementById('perfil').value;

        // Objeto con los datos a enviar en la solicitud POST
        const userData = {
            nombre: nombre,
            email: email,
            clave: clave,
            perfil: perfil
        };

        // Realizar la solicitud POST para crear un nuevo usuario
        fetch('/api/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo crear el usuario');
            }
            return response.json();
        })
        .then(data => {
            // Mostrar una notificación de éxito utilizando SweetAlert
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Usuario creado correctamente'
            }).then(() => {
                // Redirigir al usuario a otra página, recargar la página, etc.
            });
        })
        .catch(error => {
            console.error('Error al crear el usuario:', error);
            // Mostrar una notificación de error utilizando SweetAlert
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo crear el usuario'
            });
        });
    });
});
