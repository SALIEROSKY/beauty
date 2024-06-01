document.addEventListener("DOMContentLoaded", function() {
    // Realizar la solicitud para obtener la lista de usuarios al cargar la página
    fetch('/usuarios/consultarUsuarios')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener la lista de usuarios');
            }
            return response.json();
        })
        .then(usuarios => {
            // Función para mostrar los usuarios en la página
            mostrarUsuarios(usuarios);
        })
        .catch(error => {
            console.error('Error al obtener la lista de usuarios:', error);
            // Mostrar mensaje de error con SweetAlert2
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrió un error al obtener la lista de usuarios'
            });
        });

    // Función para mostrar los usuarios en la página
    function mostrarUsuarios(usuarios) {
        const userList = document.getElementById('userList');
        userList.innerHTML = '';

        usuarios.forEach(usuario => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${usuario.ID_Usuario}</td>
                <td>${usuario.Nombre}</td>
                <td>${usuario.CorreoElectronico}</td>
                <td>${usuario.ID_Perfil}</td>
                <td>
                    <button class="btn btn-primary btn-sm" onclick="editarUsuario(${usuario.ID_Usuario})">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarUsuario(${usuario.ID_Usuario})">
                        <i class="fas fa-trash-alt"></i> Eliminar
                    </button>
                </td>
            `;
            userList.appendChild(row);
        });
    }

    // Función para redirigir a la página de edición de usuario
    window.editarUsuario = function(idUsuario) {
        window.location.href = `/user-edit.html?id=${idUsuario}`;
    };

    // Función para eliminar un usuario
    window.eliminarUsuario = function(idUsuario) {
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
                fetch(`/usuarios/eliminarUsuario/${idUsuario}`, {
                    method: 'DELETE'
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al eliminar el usuario');
                    }
                    return response.json();
                })
                .then(data => {
                    // Actualizar la lista de usuarios después de eliminar
                    fetch('/usuarios/consultarUsuarios')
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Error al obtener la lista de usuarios');
                            }
                            return response.json();
                        })
                        .then(usuarios => {
                            // Mostrar los usuarios actualizados en la página
                            mostrarUsuarios(usuarios);
                            // Mostrar mensaje de éxito con SweetAlert2
                            Swal.fire({
                                icon: 'success',
                                title: 'Éxito',
                                text: data.message
                            });
                        })
                        .catch(error => {
                            console.error('Error al obtener la lista de usuarios:', error);
                            // Mostrar mensaje de error con SweetAlert2
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: 'Ocurrió un error al obtener la lista de usuarios'
                            });
                        });
                })
                .catch(error => {
                    console.error('Error al eliminar el usuario:', error);
                    // Mostrar mensaje de error con SweetAlert2
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Ocurrió un error al eliminar el usuario'
                    });
                });
            }
        });
    };
});
