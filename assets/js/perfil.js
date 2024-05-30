const swal = require('sweetalert2');
const bodyParser = require('body-parser');


app.use(bodyParser.json());


app.use(bodyParser.urlencoded({ extended: true }));


function createProfile(data) {
    return fetch(`/api/perfil`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error al agregar el perfil');
        }
        return response.json();
    })
    .then(() => {
        swal("¡Perfil agregado!", "El perfil se ha agregado exitosamente.", "success");
    })
    .catch(error => {
        console.error('Error al agregar el perfil:', error);
        swal("Error", "Se produjo un error al agregar el perfil.", "error");
    });
}


document.getElementById('addProfileForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const tipoPerfil = document.getElementById('tipoPerfil').value;
    createProfile({ Tipo_Perfil: tipoPerfil });
});
