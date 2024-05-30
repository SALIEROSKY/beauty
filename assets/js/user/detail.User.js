// detailUser.js

document.addEventListener("DOMContentLoaded", function() {
    // Obtener el ID del usuario de la URL
    const userId = window.location.pathname.split('/').pop();

    // Realizar la solicitud GET para obtener los detalles del usuario
    fetch(`/api/users/${userId}`)
    .then(response => {
        if (!response.ok) {
            throw new Error('No se pudieron obtener los detalles del usuario');
        }
        return response.json();
    })
    .then(user => {
        // Construir el HTML para mostrar los detalles del usuario
        const userDetailsHtml = `
            <div class="card mt-3" style="width: 18rem;">
                <div class="card-body">
                    <h5 class="card-title">${user.nombre}</h5>
                    <p class="card-text">Email: ${user.email}</p>
                    <p class="card-text">Perfil: ${user.perfil}</p>
                </div>
            </div>
        `;

        // Insertar el HTML en el contenedor userDetails
        const userDetailsContainer = document.getElementById('userDetails');
        userDetailsContainer.innerHTML = userDetailsHtml;
    })
    .catch(error => {
        console.error('Error al obtener los detalles del usuario:', error);
        // Mostrar una notificación de error utilizando SweetAlert
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'No se pudieron obtener los detalles del usuario'
        });
    });
});
