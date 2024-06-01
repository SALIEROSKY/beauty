// Definir variables globales para el control de paginación
let currentPage = 1;
const usersPerPage = 5;

// Función para dividir la lista de usuarios en páginas
function paginateUsers(users) {
    const startIndex = (currentPage - 1) * usersPerPage;
    const endIndex = startIndex + usersPerPage;
    return users.slice(startIndex, endIndex);
}

// Función para renderizar los usuarios en la tabla
function renderUsers(users) {
    const userList = document.getElementById('userList');
    userList.innerHTML = '';
    users.forEach(user => {
        const row = `
        <tr>
            <td>${user.ID_Usuario}</td>
            <td>${user.Nombre}</td>
            <td>${user.CorreoElectronico}</td>
            <td>${user.ID_Perfil}</td>
            <td>
                <button class="btn btn-primary btn-sm" onclick="editarUsuario(${user.ID_Usuario})">Editar</button>
                <button class="btn btn-danger btn-sm" onclick="eliminarUsuario(${user.ID_Usuario})">Eliminar</button>
            </td>
        </tr>
    `;
        userList.innerHTML += row;
    });
}

// Función para actualizar la paginación en la interfaz de usuario
function updatePagination(totalUsers) {
    const prevPageBtn = document.getElementById('prevPageBtn');
    const nextPageBtn = document.getElementById('nextPageBtn');

    prevPageBtn.disabled = currentPage === 1;
    nextPageBtn.disabled = currentPage === Math.ceil(totalUsers.length / usersPerPage);

    prevPageBtn.addEventListener('click', () => {
        if (currentPage > 1) {
            currentPage--;
            renderUsers(paginateUsers(totalUsers));
        }
    });

    nextPageBtn.addEventListener('click', () => {
        if (currentPage < Math.ceil(totalUsers.length / usersPerPage)) {
            currentPage++;
            renderUsers(paginateUsers(totalUsers));
        }
    });
}

// Función para eliminar un usuario
function eliminarUsuario(idUsuario) {
    // Realizar la lógica para eliminar el usuario con el ID proporcionado
    console.log('Eliminar usuario con ID:', idUsuario);
    // Aquí puedes agregar la lógica para realizar la eliminación en el servidor y luego actualizar la lista de usuarios
    // Por ejemplo, puedes hacer una solicitud fetch al servidor para eliminar el usuario
    // Después de eliminar el usuario, actualiza la lista de usuarios
    fetch(`/usuarios/eliminarUsuario/${idUsuario}`, {
        method: 'DELETE'
    })
    .then(response => response.json())
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
                const totalUsers = usuarios;
                // Si la cantidad total de usuarios restantes es menor que la cantidad de usuarios por página,
                // ajusta la página actual para que la última página se muestre correctamente
                const totalPages = Math.ceil(totalUsers.length / usersPerPage);
                if (currentPage > totalPages) {
                    currentPage = totalPages;
                }
                // Vuelve a renderizar la lista de usuarios
                renderUsers(paginateUsers(totalUsers));
                // Actualizar la paginación
                updatePagination(totalUsers);
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

// Lógica principal para obtener y mostrar los usuarios paginados
function fetchAndRenderUsers(page) {
    fetch(`/usuarios/consultarUsuarios?page=${page}`)
        .then(response => response.json())
        .then(users => {
            const totalUsers = users;
            // Renderizar los usuarios paginados
            renderUsers(paginateUsers(totalUsers));
            // Actualizar la paginación
            updatePagination(totalUsers);
        })
        .catch(error => {
            console.error('Error al obtener la lista de usuarios:', error);
        });
}
