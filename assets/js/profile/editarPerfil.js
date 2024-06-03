document.addEventListener("DOMContentLoaded", function() {
    const editProfileForm = document.getElementById('editProfileForm');
    
    if (!editProfileForm) {
        console.error('No se encontró el formulario editProfileForm');
        return;
    }

    // Obtener el ID del perfil de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const profileId = urlParams.get('id');
    
    if (profileId) {
        // Cargar los datos del perfil actual
        fetch(`/api/perfiles/${profileId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                const tipoPerfilInput = document.getElementById('tipoPerfil');
                if (tipoPerfilInput) {
                    tipoPerfilInput.value = data.Tipo_Perfil;
                } else {
                    console.error('No se encontró el input tipoPerfil');
                }
            })
            .catch(error => {
                console.error('Error al cargar los datos del perfil:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrió un error al cargar los datos del perfil'
                });
            });
    } else {
        Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: 'No se encontró el ID del perfil'
        });
    }

    editProfileForm.addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe de forma predeterminada

        const tipoPerfilInput = document.getElementById('tipoPerfil');
        
        if (profileId && tipoPerfilInput) {
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
                    // Redireccionar o realizar alguna otra acción después de actualizar el perfil
                    window.location.href = '/perfil';
                });
            })
            .catch(error => {
                console.error('Error al actualizar el perfil:', error);
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrió un error al actualizar el perfil'
                });
            });
        } else {
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'El ID del perfil o el tipo de perfil es inválido'
            });
        }
    });
});
