const express = require('express');
const bodyParser = require('body-parser');
const { Pool } = require('pg');
const bcrypt = require('bcrypt');
const path = require('path');
const session = require('express-session');
const cors = require('cors');
const app = express();
app.use(cors()); 
const port = 3400;

const pool = new Pool({
    user: 'admin',
    host: 'dpg-cpaht6f109ks73aot47g-a',
    database: 'beautybd',
    password: 'AfsEo1bmhm2McpgYscOEUwjk2Qer8rAX',
    port: 5432, // Puerto predeterminado de PostgreSQL
  });

app.use(express.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json()); // Asegura que el servidor pueda manejar JSON
app.use(session({
    secret: 'secret', // Cambia esto por una cadena secreta segura
    resave: false,
    saveUninitialized: true
}));

// Servir archivos estáticos de las carpetas 'beauty' y 'assets'
app.use(express.static(path.join(__dirname, 'beauty')));
app.use('/assets', express.static(path.join(__dirname, 'assets')));

// Ruta para la página principal
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Ruta para la página 'nosotros.html'
app.get('/nosotros.html', (req, res) => {
    res.sendFile(path.join(__dirname, 'nosotros.html'));
});

// Ruta para la página 'login.html'
app.get('/login', (req, res) => {
    res.sendFile(path.join(__dirname, 'login', 'login.html'));
});

// Ruta para la página 'register.html'
app.get('/register', (req, res) => {
    res.sendFile(path.join(__dirname, 'register', 'signup.html'));
});

// Manejar la autenticación de inicio de sesión
app.post('/login', (req, res) => {
    const { email, clave } = req.body;
    const query = 'SELECT * FROM usuario WHERE CorreoElectronico = ?';
    db.query(query, [email], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error en el servidor' });
        }
        if (result.length > 0) {
            const hashedPassword = result[0].Clave; // Cambia esto si el nombre de la columna es diferente
            bcrypt.compare(clave, hashedPassword, (err, bcryptResult) => {
                if (err) {
                    return res.status(500).json({ error: 'Error en el servidor' });
                }
                if (bcryptResult) {
                    req.session.user = result[0];
                    res.json({ exists: true });
                } else {
                    res.json({ exists: false });
                }
            });
        } else {
            res.json({ exists: false });
        }
    });
});

// Manejar las solicitudes POST para registrar un nuevo usuario
app.post('/register', async (req, res) => {
    const { nombre, email, clave } = req.body;
    const saltRounds = 10;
    const insertUserQuery = 'INSERT INTO usuario (nombre, email, clave) VALUES ($1, $2, $3)';
    const checkEmailQuery = 'SELECT * FROM usuario WHERE email = $1';

    try {
        const client = await pool.connect();
        
        // Verificar si el correo electrónico ya está en uso
        const result = await client.query(checkEmailQuery, [email]);
        if (result.rows.length > 0) {
            client.release();
            return res.status(400).json({ error: 'El correo electrónico ya está en uso' });
        }

        // Encriptar la contraseña
        const hashedPassword = await bcrypt.hash(clave, saltRounds);
        
        // Insertar el nuevo usuario en la base de datos
        await client.query(insertUserQuery, [nombre, email, hashedPassword]);
        client.release();

        res.json({ registered: true });
    } catch (err) {
        console.error('Error en el servidor:', err);
        res.status(500).json({ error: 'Error en el servidor' });
    }
});
// Ruta para la página 'inicio.html'
app.get('/inicio', (req, res) => { // Asegúrate de que la ruta esté bien definida
    if (req.session.user) {
        res.sendFile(path.join(__dirname, 'inicio', 'inicio.html'));
    } else {
        res.redirect('/login');
    }
});

// Ruta para la página 'carrito.html'
app.get('/carrito.html', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, 'carrito.html'));
    } else {
        res.redirect('/login');
    }
});

// Manejar el cierre de sesión
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return console.error(err);
        }
        res.redirect('/login');
    });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});
