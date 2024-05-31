document.addEventListener("DOMContentLoaded", function() {
    // Obtener el ID del perfil desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const perfilId = urlParams.get('id');

    // Obtener el elemento donde se mostrará el nombre del perfil
    const profileNameElement = document.getElementById('profileName');

    // Verificar si se ha proporcionado un ID de perfil válido
    if (perfilId) {
        // Realizar la solicitud para obtener los detalles del perfil al servidor
        fetch(`/api/perfiles/${perfilId}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo obtener el detalle del perfil');
                }
                return response.json();
            })
            .then(perfil => {
                // Mostrar el nombre del perfil en la página
                profileNameElement.textContent = perfil.tipo_perfil;
            })
            .catch(error => {
                console.error('Error al obtener el detalle del perfil:', error);
                // Utilizando SweetAlert2 para mostrar un mensaje de error
                Swal.fire({
                    icon: 'error',
                    title: '¡Error!',
                    text: 'Ocurrió un error al intentar obtener el detalle del perfil'
                });
            });
    } else {
        console.error('ID de perfil no proporcionado en la URL');
        // Utilizando SweetAlert2 para mostrar un mensaje de error
        Swal.fire({
            icon: 'error',
            title: '¡Error!',
            text: 'ID de perfil no proporcionado en la URL'
        });
    }
});
