document.addEventListener("DOMContentLoaded", function() {
    const createUserForm = document.getElementById('createUserForm');

    createUserForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const nombre = document.getElementById('nombre').value;
        const correoElectronico = document.getElementById('email').value;
        const clave = document.getElementById('clave').value;
        const idPerfil = document.getElementById('perfil').value;

        fetch('/usuarios/agregarUsuario', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, correoElectronico, clave, idPerfil })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al agregar el usuario');
            }
            return response.json();
        })
        .then(data => {
            Swal.fire({
                icon: 'success',
                title: '¡Éxito!',
                text: data.message
            }).then(() => {
                window.location.href = '/usuarios';
            });
        })
        .catch(error => {
            console.error('Error al agregar el usuario:', error);
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'Ocurrió un error al agregar el usuario'
            });
        });
    });
});
