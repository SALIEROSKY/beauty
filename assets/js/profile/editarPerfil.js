document.addEventListener("DOMContentLoaded", function() {
    const editProfileForm = document.getElementById('editProfileForm');

    editProfileForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe de forma predeterminada

        const profileIdInput = document.getElementById('profileId');
        const tipoPerfilInput = document.getElementById('tipoPerfil');

        if (profileIdInput && tipoPerfilInput) {
            const profileId = profileIdInput.value;
            const tipoPerfil = tipoPerfilInput.value;

            // Realizar la solicitud PUT al servidor
            fetch(`/perfil/actualizarPerfil/${profileId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    Tipo_Perfil: tipoPerfil
                })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al actualizar el perfil');
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
                    window.location.href = '/perfil'; // Por ejemplo, redirige a la página de listado de perfiles
                });
            })
            .catch(error => {
                console.error('Error al actualizar el perfil:', error);
                // Utilizando SweetAlert2 para mostrar un mensaje de error
                Swal.fire({
                    icon: 'error',
                    title: '¡Error!',
                    text: 'Ocurrió un error al actualizar el perfil'
                });
            });
        } else {
            console.error('No se pudo encontrar el elemento profileId o tipoPerfil en el DOM');
            // Utilizando SweetAlert2 para mostrar un mensaje de error
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'Ocurrió un error al intentar actualizar el perfil'
            });
        }
    });
});
