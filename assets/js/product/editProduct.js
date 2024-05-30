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
            // Rellenar el formulario con los detalles del producto
            document.getElementById('nombre').value = product.nombre;
            document.getElementById('descripcion').value = product.descripcion;
            document.getElementById('precio').value = product.precio;
        })
        .catch(error => {
            console.error('Error al obtener los detalles del producto:', error);
            // Manejar el error, por ejemplo, mostrar un mensaje de error
            alert('Error al obtener los detalles del producto');
        });

    // Manejar la submisión del formulario de edición de producto
    const editProductForm = document.getElementById('editProductForm');
    editProductForm.addEventListener('submit', function(event) {
        event.preventDefault();

        // Obtener los valores del formulario
        const nombre = document.getElementById('nombre').value;
        const descripcion = document.getElementById('descripcion').value;
        const precio = document.getElementById('precio').value;

        // Realizar la solicitud PUT al servidor para actualizar el producto
        fetch(`/api/products/${productId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, descripcion, precio })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo actualizar el producto');
            }
            return response.json();
        })
        .then(data => {
            // Mostrar un mensaje de éxito
            alert('Producto actualizado correctamente');
            // Redirigir a la página de detalles del producto actualizado
            window.location.href = `/product-detail.html?id=${productId}`;
        })
        .catch(error => {
            console.error('Error al actualizar el producto:', error);
            // Manejar el error, por ejemplo, mostrar un mensaje de error
            alert('Error al actualizar el producto');
        });
    });
});
