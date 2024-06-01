// user-edit.js
document.addEventListener("DOMContentLoaded", function() {
    const editUserForm = document.getElementById('editUserForm');

    editUserForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Obtener los valores del formulario
        const nombre = document.getElementById('nombre').value;
        const clave = document.getElementById('clave').value;
        const perfil = document.getElementById('perfil').value;

        // Objeto con los datos a enviar en la solicitud PUT
        const userData = {
            nombre: nombre,
            clave: clave,
            perfil: perfil
        };

        // Obtener el ID del usuario desde la URL
        const userId = window.location.pathname.split('/').pop();

        // Realizar la solicitud PUT para actualizar el usuario
        fetch(`/api/users/${userId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo actualizar el usuario');
            }
            return response.json();
        })
        .then(data => {
            // Mostrar una notificación de éxito utilizando SweetAlert
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: 'Usuario actualizado correctamente'
            }).then(() => {
                // Redirigir al usuario a otra página, recargar la página, etc.
            });
        })
        .catch(error => {
            console.error('Error al actualizar el usuario:', error);
            // Mostrar una notificación de error utilizando SweetAlert
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'No se pudo actualizar el usuario'
            });
        });
    });
});
