document.addEventListener("DOMContentLoaded", function() {
    // Realizar la solicitud para obtener la lista de productos al cargar la página
    fetch('/producto/consultarProducto')
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al obtener la lista de productos');
            }
            return response.json();
        })
        .then(productos => {
            // Función para mostrar los productos en la página
            mostrarProductos(productos);
        })
        .catch(error => {
            console.error('Error al obtener la lista de productos:', error);
            // Mostrar mensaje de error con SweetAlert2
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrió un error al obtener la lista de productos'
            });
        });

    // Función para mostrar los productos en la página
    function mostrarProductos(productos) {
        const productList = document.getElementById('productList');
        productList.innerHTML = '';

        productos.forEach(producto => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${producto.ID_Producto}</td>
                <td>${producto.Nombre}</td>
                <td>${producto.Descripcion}</td>
                <td>${producto.Precio}</td>
                <td>
                    <button class="btn btn-primary btn-sm" onclick="editarProducto(${producto.ID_Producto})">
                        <i class="fas fa-edit"></i> Editar
                    </button>
                    <button class="btn btn-danger btn-sm" onclick="eliminarProducto(${producto.ID_Producto})">
                        <i class="fas fa-trash-alt"></i> Eliminar
                    </button>
                </td>
            `;
            productList.appendChild(row);
        });
    }

    // Función para editar un producto
    window.editarProducto = function(idProducto) {
        // Redirigir a la página de edición de producto con el ID del producto como parámetro
        window.location.href = `/producto/editarProducto.html?id=${idProducto}`;
    };

    // Función para eliminar un producto
    window.eliminarProducto = function(idProducto) {
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
                // Realizar la solicitud para eliminar el producto
                fetch(`/producto/eliminarProducto/${idProducto}`, {
                    method: 'DELETE'
                })
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al eliminar el producto');
                    }
                    return response.json();
                })
                .then(data => {
                    // Actualizar la lista de productos después de eliminar
                    fetch('/producto/consultarProducto')
                        .then(response => {
                            if (!response.ok) {
                                throw new Error('Error al obtener la lista de productos');
                            }
                            return response.json();
                        })
                        .then(productos => {
                            // Mostrar los productos actualizados en la página
                            mostrarProductos(productos);
                            // Mostrar mensaje de éxito con SweetAlert2
                            Swal.fire({
                                icon: 'success',
                                title: 'Éxito',
                                text: data.message
                            });
                        })
                        .catch(error => {
                            console.error('Error al obtener la lista de productos:', error);
                            // Mostrar mensaje de error con SweetAlert2
                            Swal.fire({
                                icon: 'error',
                                title: 'Error',
                                text: 'Ocurrió un error al obtener la lista de productos'
                            });
                        });
                })
                .catch(error => {
                    console.error('Error al eliminar el producto:', error);
                    // Mostrar mensaje de error con SweetAlert2
                    Swal.fire({
                        icon: 'error',
                        title: 'Error',
                        text: 'Ocurrió un error al eliminar el producto'
                    });
                });
            }
        });
    };
});
