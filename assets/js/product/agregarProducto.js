document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('addProductForm').addEventListener('submit', function(event) {
        event.preventDefault(); // Evitar que el formulario se envíe de forma predeterminada

        const nombre = document.getElementById('nombre').value;
        const descripcion = document.getElementById('descripcion').value;
        const precio = document.getElementById('precio').value;

        // Realizar la solicitud POST al servidor
        fetch('/producto/agregarProducto', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                Nombre: nombre,
                Descripcion: descripcion,
                Precio: precio
            })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al agregar el producto');
            }
            return response.json();
        })
        .then(data => {
            // Mostrar mensaje de éxito con SweetAlert2 y redirigir a la lista de productos
            Swal.fire({
                icon: 'success',
                title: 'Éxito',
                text: data.message
            }).then(() => {
                window.location.href = '/productos';
            });
        })
        .catch(error => {
            console.error('Error al agregar el producto:', error);
            // Mostrar mensaje de error con SweetAlert2
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Ocurrió un error al agregar el producto'
            });
        });
    });
});
