// Importa el framework Express
const express = require('express');
// Importa el middleware bodyParser para analizar datos de solicitud en formato JSON
const bodyParser = require('body-parser');
// Importa el módulo MySQL para interactuar con la base de datos MySQL
const mysql = require('mysql');
// Importa la biblioteca bcrypt para el cifrado de contraseñas
const bcrypt = require('bcrypt');
// Importa el módulo path para manejar rutas de archivos y directorios
const path = require('path');

// Crea una instancia de la aplicación Express
const app = express();
// Establece el puerto en el que el servidor escuchará las solicitudes
const port = 3000;

// Crea una conexión a la base de datos MySQL
const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'beauty_cosmeticos'
});

// Establece la conexión a la base de datos MySQL
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conexión a la base de datos establecida');
});

// Configura el middleware bodyParser para analizar datos de solicitud codificados en URL
app.use(bodyParser.urlencoded({ extended: true }));
// Configura Express para servir archivos estáticos desde el directorio 'public'
const publicPath = path.join(__dirname, '\beauty');
app.use(express.static(publicPath));


// Define la ruta para la página de inicio
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Define la ruta para la página de inicio de sesión
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});

// Manejar solicitudes GET para '/login.html'
app.get('/login.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'login.html'));
});


// Maneja las solicitudes POST para iniciar sesión
app.post('/login', (req, res) => {
    const { correo, contraseña } = req.body;
    const query = 'SELECT * FROM usuario WHERE CorreoElectronico = ?';

    // Realiza una consulta a la base de datos para obtener el usuario con el correo electrónico proporcionado
    db.query(query, [correo], (err, result) => {
        if (err) {
            throw err;
        }
        // Verifica si se encontró un usuario con el correo electrónico proporcionado
        if (result.length > 0) {
            const storedPassword = result[0].contraseña;
            // Compara la contraseña proporcionada con la contraseña almacenada
            if (contraseña === storedPassword) {
                console.log("Inicio de sesión exitoso");
                // Redirige al usuario a la página de inicio después del inicio de sesión exitoso
                res.redirect('/inicio');
            } else {
                // Si las contraseñas no coinciden, devuelve un objeto JSON con exists: false
                res.json({ exists: false });
            }
        } else {
            // Si no se encuentra ningún usuario, devuelve un objeto JSON con exists: false
            res.json({ exists: false });
        }
    });
});



// Definir la ruta para la página de inicio después de loguearse
app.get('/inicio',(req, res) => {
    // Aquí especificamos que nos redirija al archivo home.html
    res.sendFile(path.join(__dirname, 'inicio.html'));
});

// Manejar solicitudes GET para '/inicio.html'
app.get('/inicio.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'inicio.html'));
});

//Definir la ruta para el cierre de sesión
app.get('/logout', (req, res) => {
    // Cuando el usuario cierre sesión , lo tiene que redirigir al login.html
    res.redirect('/login');
});

// Especificamos en la consola que el servidor y el puerto estén corriendo
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});