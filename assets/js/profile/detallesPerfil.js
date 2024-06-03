// detallePerfil.js

document.addEventListener("DOMContentLoaded", function() {
    // Obtener el ID del perfil de la URL
    const urlParams = new URLSearchParams(window.location.search);
    const profileId = urlParams.get('id');

    if (profileId) {
        // Realizar la solicitud para obtener los detalles del perfil específico
        fetch(`/perfil/consultarPerfil/${profileId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener los detalles del perfil');
                }
                return response.json();
            })
            .then(profile => {
                // Función para mostrar los detalles del perfil en la página
                mostrarDetallesPerfil(profile);
            })
            .catch(error => {
                console.error('Error al obtener los detalles del perfil:', error);
                // Mostrar mensaje de error con SweetAlert2
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'Ocurrió un error al obtener los detalles del perfil'
                });
            });
    } else {
        console.error('ID del perfil no encontrado en la URL');
        // Mostrar mensaje de error con SweetAlert2
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'ID del perfil no encontrado en la URL'
        });
    }

    // Función para mostrar los detalles del perfil en la página
    function mostrarDetallesPerfil(profile) {
        // Actualizar el contenido de los elementos HTML con los detalles del perfil
        document.getElementById('idPerfil').textContent = profile.ID_Perfil;
        document.getElementById('tipoPerfil').textContent = profile.Tipo_Perfil;
    }
});
