// listUser.js

document.addEventListener("DOMContentLoaded", function() {
    // Realizar la solicitud GET para obtener el listado de usuarios
    fetch('/api/users')
    .then(response => {
        if (!response.ok) {
            throw new Error('No se pudieron obtener los usuarios');
        }
        return response.json();
    })
    .then(users => {
        // Construir el HTML para mostrar el listado de usuarios
        let userListHtml = '';
        users.forEach(user => {
            userListHtml += `
                <tr>
                    <td>${user.id}</td>
                    <td>${user.nombre}</td>
                    <td>${user.email}</td>
                    <td>${user.perfil}</td>
                    <td>
                        <a href="/user-detail/${user.id}" class="btn btn-info btn-sm">Ver Detalles</a>
                        <a href="/user-edit/${user.id}" class="btn btn-primary btn-sm">Editar</a>
                        <button onclick="deleteUser(${user.id})" class="btn btn-danger btn-sm">Eliminar</button>
                    </td>
                </tr>
            `;
        });

        // Insertar el HTML en el contenedor userList
        const userListContainer = document.getElementById('userList');
        userListContainer.innerHTML = userListHtml;
    })
    .catch(error => {
        console.error('Error al obtener los usuarios:', error);
        // Mostrar una notificación de error utilizando SweetAlert
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudieron obtener los usuarios'
        });
    });
});

// Función para eliminar un usuario
function deleteUser(userId) {
    // Realizar la solicitud DELETE para eliminar el usuario con el ID dado
    fetch(`/api/users/${userId}`, {
        method: 'DELETE'
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('No se pudo eliminar el usuario');
        }
        return response.json();
    })
    .then(data => {
        // Recargar la página para actualizar el listado de usuarios
        location.reload();
    })
    .catch(error => {
        console.error('Error al eliminar el usuario:', error);
        // Mostrar una notificación de error utilizando SweetAlert
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudo eliminar el usuario'
        });
    });
}
