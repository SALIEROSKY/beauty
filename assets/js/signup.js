    const signupForm = document.getElementById("signupForm");

    signupForm.addEventListener("submit", function(event) {
        event.preventDefault();

        // Obtener los valores del formulario
        const username = document.getElementById("signupUsername").value;
        const email = document.getElementById("signupEmail").value;
        const password = document.getElementById("signupPassword").value;

        // Verificar si ya existe un usuario con el mismo correo electrónico
        const existingUser = JSON.parse(localStorage.getItem(email));
        if (existingUser) {
            Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Ya existe un usuario registrado con este correo electrónico.',
            });
            return;
        }

        const newUser = {
            username: username,
            email: email,
            password: password
        };

        // Guardar el nuevo usuario en localStorage
        localStorage.setItem(email, JSON.stringify(newUser));
        
       // Muestra un mensaje de éxito
        Swal.fire({
        icon: 'success',
        title: 'Registro Exitoso',
        text: 'Tu registro ha sido exitoso. ¡Bienvenido!'
        }).then(()=>{
    window.location.href='login.html'
    });
});