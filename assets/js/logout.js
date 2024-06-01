document.addEventListener('DOMContentLoaded', function() {
    document.getElementById('logoutLink').addEventListener('click', function(event) {
        event.preventDefault();
        localStorage.removeItem('userEmail');
        localStorage.removeItem('userPerfilId');
        window.location.href = '/login';
    });
});