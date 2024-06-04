document.addEventListener("DOMContentLoaded", function() {
    // Realizar la solicitud para obtener la lista de perfiles al cargar la página
    fetch('/perfil/consultarPerfil')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener la lista de perfiles');
            }
            return response.json();
        })
        .then(perfiles => {
            // Función para mostrar los perfiles en la página
            mostrarPerfiles(perfiles);
        })
        .catch(error => {
            console.error('Error al obtener la lista de perfiles:', error);
            // Mostrar mensaje de error con SweetAlert2
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrió un error al obtener la lista de perfiles'
            });
        });

    function editarPerfil(idPerfil) {
          // Llamar a la función en editarPerfil.js y pasar el ID del perfil como parámetro
            redirigirEditarPerfil(idPerfil);
    };
    // Función para mostrar los perfiles en la página
    function mostrarPerfiles(perfiles) {
        const profileList = document.getElementById('profileList');
        profileList.innerHTML = '';

        perfiles.forEach(profile => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${profile.ID_Perfil}</td>
                <td>${profile.Tipo_Perfil}</td>
                <td>
    <button class="btn btn-danger btn-sm" onclick="eliminarPerfil(${profile.ID_Perfil})">
        <i class="fas fa-trash-alt"></i> Eliminar
    </button>
</td>
            `;
            profileList.appendChild(row);
        });
    }

    // Función para editar un perfil
    window.editarPerfil = function(idPerfil) {
        // Redirigir a la página de edición de perfil con el ID del perfil como parámetro
        window.location.href = `/profile-edit?id=${idPerfil}`;
    };

    // Función para eliminar un perfil
    window.eliminarPerfil = function(idPerfil) {
        // Mostrar confirmación con SweetAlert2
        Swal.fire({
            title: '¿Estás seguro?',
            text: 'Esta acción no se puede deshacer',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#d33',
            cancelButtonColor: '#3085d6',
            confirmButtonText: 'Sí, eliminar',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                // Realizar la solicitud para eliminar el perfil
                fetch(`/perfil/eliminarPerfil/${idPerfil}`, {
                    method: 'DELETE'
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al eliminar el perfil');
                    }
                    return response.json();
                })
                .then(data => {
                    // Actualizar la lista de perfiles después de eliminar
                    fetch('/perfil/consultarPerfil')
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Error al obtener la lista de perfiles');
                            }
                            return response.json();
                        })
                        .then(perfiles => {
                            // Mostrar los perfiles actualizados en la página
                            mostrarPerfiles(perfiles);
                            // Mostrar mensaje de éxito con SweetAlert2
                            Swal.fire({
                                icon: 'success',
                                title: 'Éxito',
                                text: data.message
                            });
                        })
                        .catch(error => {
                            console.error('Error al obtener la lista de perfiles:', error);
                            // Mostrar mensaje de error con SweetAlert2
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: 'Ocurrió un error al obtener la lista de perfiles'
                            });
                        });
                })
                .catch(error => {
                    console.error('Error al eliminar el perfil:', error);
                    // Mostrar mensaje de error con SweetAlert2
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Ocurrió un error al eliminar el perfil'
                    });
                });
            }
        });
    };
    
});
