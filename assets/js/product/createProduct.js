document.addEventListener("DOMContentLoaded", function() {
    const createProductForm = document.getElementById('createProductForm');

    createProductForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const nombreInput = document.getElementById('nombre');
        const descripcionInput = document.getElementById('descripcion');
        const precioInput = document.getElementById('precio');

        if (nombreInput && descripcionInput && precioInput) {
            const nombre = nombreInput.value;
            const descripcion = descripcionInput.value;
            const precio = precioInput.value;

            // Realizar la solicitud para crear el producto al servidor
            fetch('http://localhost:3400/api/CreateProducto', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ nombre, descripcion, precio })
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error('No se pudo crear el producto');
                }
                return response.json();
            })
            .then(data => {
                // Mostrar un mensaje de éxito con SweetAlert2
                Swal.fire({
                    icon: 'success',
                    title: '¡Producto creado!',
                    text: 'El producto ha sido creado exitosamente.'
                }).then(() => {
                    // Redireccionar a la página de listado de productos u otra acción
                    window.location.href = '/product-list.html';
                });
            })
            .catch(error => {
                console.error('Error al crear el producto:', error);
                // Mostrar un mensaje de error con SweetAlert2
                Swal.fire({
                    icon: 'error',
                    title: '¡Error!',
                    text: 'Ocurrió un error al intentar crear el producto.'
                });
            });
        } else {
            console.error('No se pudo encontrar el elemento nombre, descripcion o precio en el DOM');
            // Mostrar un mensaje de error con SweetAlert2
            Swal.fire({
                icon: 'error',
                title: '¡Error!',
                text: 'Ocurrió un error al intentar crear el producto.'
            });
        }
    });
});
