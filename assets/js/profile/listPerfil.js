document.addEventListener("DOMContentLoaded", function() {
    // Función para obtener la lista de perfiles desde el servidor
    function getProfileList() {
        fetch('/api/profiles')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error al obtener la lista de perfiles');
                }
                return response.json();
            })
            .then(profiles => {
                const profileList = document.getElementById('profileList');
                profileList.innerHTML = '';

                profiles.forEach(profile => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${profile.id_perfil}</td>
                        <td>${profile.tipo_perfil}</td>
                        <td>
                            <button class="btn btn-primary btn-sm" onclick="editProfile(${profile.id_perfil})">Editar</button>
                            <button class="btn btn-danger btn-sm" onclick="deleteProfile(${profile.id_perfil})">Eliminar</button>
                        </td>
                    `;
                    profileList.appendChild(row);
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
    }

    // Función para editar un perfil
    window.editProfile = function(profileId) {
        window.location.href = `/profile/edit/${profileId}`;
    };

    // Función para eliminar un perfil
    window.deleteProfile = function(profileId) {
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
                fetch(`/api/profiles/${profileId}`, {
                    method: 'DELETE'
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al eliminar el perfil');
                    }
                    return response.json();
                })
                .then(data => {
                    // Recargar la lista de perfiles después de eliminar
                    getProfileList();
                    // Mostrar mensaje de éxito con SweetAlert2
                    Swal.fire({
                        icon: 'success',
                        title: 'Éxito',
                        text: data.message
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

    // Obtener la lista de perfiles al cargar la página
    getProfileList();
});
