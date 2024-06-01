document.getElementById('addProfileForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Evitar que el formulario se envíe de forma predeterminada

    const tipoPerfil = document.getElementById('Tipo_Perfil').value; // Corregido el nombre del campo

    // Realizar la solicitud POST al servidor
    fetch('/perfil/agregarPerfil', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            Tipo_Perfil: tipoPerfil // Enviar el nombre del campo como se usa en la tabla
        })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al agregar el perfil');
        }
        return response.json();
    })
    .then(data => {
        // Mostrar mensaje de éxito con SweetAlert2 y redirigir a la lista de perfiles
        Swal.fire({
            icon: 'success',
            title: 'Éxito',
            text: data.message
        }).then(() => {
            window.location.href = '/perfil';
        });
    })
    .catch(error => {
        console.error('Error al agregar el perfil:', error);
        // Mostrar mensaje de error con SweetAlert2
        Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al agregar el perfil'
        });
    });
});
