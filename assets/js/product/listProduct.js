document.addEventListener("DOMContentLoaded", function() {
    // Realizar la solicitud para obtener la lista de productos
    fetch(`/api/products`)
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo obtener la lista de productos');
            }
            return response.json();
        })
        .then(products => {
            // Generar las filas de la tabla con los productos
            const productList = document.getElementById('productList');
            products.forEach(product => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${product.id_producto}</td>
                    <td>${product.nombre}</td>
                    <td>${product.descripcion}</td>
                    <td>${product.precio}</td>
                    <td>
                        <button class="btn btn-primary btn-sm" onclick="viewProduct(${product.id_producto})">Ver</button>
                        <button class="btn btn-secondary btn-sm" onclick="editProduct(${product.id_producto})">Editar</button>
                        <button class="btn btn-danger btn-sm" onclick="deleteProduct(${product.id_producto})">Eliminar</button>
                    </td>
                `;
                productList.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Error al obtener la lista de productos:', error);
            // Manejar el error, por ejemplo, mostrar un mensaje de error
            alert('Error al obtener la lista de productos');
        });
});

// Función para ver los detalles de un producto
function viewProduct(productId) {
    window.location.href = `/product-detail.html?id=${productId}`;
}

// Función para editar un producto
function editProduct(productId) {
    window.location.href = `/product-edit.html?id=${productId}`;
}

// Función para eliminar un producto
function deleteProduct(productId) {
    if (confirm('¿Estás seguro de que quieres eliminar este producto?')) {
        // Realizar la solicitud DELETE al servidor para eliminar el producto
        fetch(`/api/products/${productId}`, {
            method: 'DELETE'
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('No se pudo eliminar el producto');
            }
            return response.json();
        })
        .then(data => {
            // Mostrar un mensaje de éxito
            alert('Producto eliminado correctamente');
            // Recargar la página para actualizar la lista de productos
            window.location.reload();
        })
        .catch(error => {
            console.error('Error al eliminar el producto:', error);
            // Manejar el error, por ejemplo, mostrar un mensaje de error
            alert('Error al eliminar el producto');
        });
    }
}
