document.addEventListener('DOMContentLoaded', function() {
    const userEmail = localStorage.getItem('userEmail');
    const userPerfilId = localStorage.getItem('userPerfilId');

    if (!userEmail || !userPerfilId) {
        window.location.href = '/login';
    } else {
        const userEmailElement = document.getElementById('userEmail');
        const userContainerElement = document.getElementById('userContainer');

        if (userEmailElement) {
            userEmailElement.innerText = userEmail;
        }

        if (userContainerElement) {
            userContainerElement.style.display = 'block';
        }

        const userPerfilElement = document.getElementById('userPerfil');
        if (userPerfilElement) {
            userPerfilElement.innerText = userPerfilId == 1 ? 'Administrador' : 'Usuario';
        }
    }
});
