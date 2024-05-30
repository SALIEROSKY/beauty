document.addEventListener("DOMContentLoaded", function() {
    // Obtener el ID del perfil desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const perfilId = urlParams.get('id');

    // Obtener el formulario de edición del perfil
    const editProfileForm = document.getElementById('editProfileForm');

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
                // Mostrar el nombre actual del perfil en el formulario
                document.getElementById('name').value = perfil.tipo_perfil;
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

        // Escuchar el evento de envío del formulario de edición del perfil
        editProfileForm.addEventListener('submit', function(event) {
            event.preventDefault();

            // Obtener el nuevo nombre del perfil desde el formulario
            const newName = document.getElementById('name').value;

            // Realizar la solicitud para actualizar el perfil al servidor
            fetch(`/api/perfiles/${perfilId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ tipo_perfil: newName })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo actualizar el perfil');
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
                    // Redireccionar a la página de detalle del perfil
                    window.location.href = `/profile/detail?id=${perfilId}`;
                });
            })
            .catch(error => {
                console.error('Error al actualizar el perfil:', error);
                // Utilizando SweetAlert2 para mostrar un mensaje de error
                Swal.fire({
                    icon: 'error',
                    title: '¡Error!',
                    text: 'Ocurrió un error al intentar actualizar el perfil'
                });
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
