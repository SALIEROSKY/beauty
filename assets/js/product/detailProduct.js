document.addEventListener("DOMContentLoaded", function() {
    // Obtener el ID del producto desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    // Realizar la solicitud para obtener los detalles del producto
    fetch(`/api/products/${productId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo obtener los detalles del producto');
            }
            return response.json();
        })
        .then(product => {
            // Mostrar los detalles del producto en el DOM
            const productDetailsContainer = document.getElementById('productDetails');
            productDetailsContainer.innerHTML = `
                <div class="card">
                    <div class="card-body">
                        <h5 class="card-title">${product.nombre}</h5>
                        <p class="card-text">Descripción: ${product.descripcion}</p>
                        <p class="card-text">Precio: $${product.precio}</p>
                    </div>
                </div>
            `;
        })
        .catch(error => {
            console.error('Error al obtener los detalles del producto:', error);
            // Manejar el error, por ejemplo, mostrar un mensaje de error
            alert('Error al obtener los detalles del producto');
        });
});
