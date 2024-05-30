document.addEventListener("DOMContentLoaded", function() {
    const createProfileForm = document.getElementById('createProfileForm');

    createProfileForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const tipoPerfilInput = document.getElementById('tipoPerfil');

        if (tipoPerfilInput) {
            const tipoPerfil = tipoPerfilInput.value;

            // Realizar la solicitud de creación al servidor
            fetch(`/api/perfiles`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tipo_perfil: tipoPerfil })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo crear el perfil');
                }
                return response.json();
            })
            .then(data => {
                // Utilizando SweetAlert2 para mostrar un mensaje de éxito
                Swal.fire({
                    icon: 'success',
                    title: '¡Éxito!',
                    text: data.message
                }).then(() => {
                    // Redireccionar a otra página, recargar la página, etc.
                });
            })
            .catch(error => {
                console.error('Error al crear el perfil:', error);
                // Utilizando SweetAlert2 para mostrar un mensaje de error
                Swal.fire({
                    icon: 'error',
                    title: '¡Error!',
                    text: 'Ocurrió un error al intentar crear el perfil'
                });
            });
        } else {
            console.error('No se pudo encontrar el elemento tipoPerfil en el DOM');
            // Utilizando SweetAlert2 para mostrar un mensaje de error
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'Ocurrió un error al intentar crear el perfil'
            });
        }
    });
});
