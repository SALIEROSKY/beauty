const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const bcrypt = require('bcrypt');
const path = require('path');
const session = require('express-session');
const app = express();
const port = 3400;

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'beauty_cosmeticos'
});

// Conectar a la base de datos
db.connect((err) => {
    if (err) {
        throw err;
    }
    console.log('Conexión a la base de datos establecida');
});

// Middlewares para analizar cuerpos de solicitud
app.use(express.urlencoded({ extended: true })); // Para analizar cuerpos URL-encoded
app.use(express.json()); // Para analizar cuerpos JSON

// Middleware de sesión
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

app.get('/inicio-admin', (req, res) => {
    res.sendFile(path.join(__dirname, 'inicio', 'inicioAdmin.html'));
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
            const user = result[0];
            const hashedPassword = user.Clave;
            bcrypt.compare(clave, hashedPassword, (err, bcryptResult) => {
                if (err) {
                    return res.status(500).json({ error: 'Error en el servidor' });
                }
                if (bcryptResult) {
                    req.session.user = user;
                    res.json({ exists: true, perfilId: user.ID_Perfil });
                } else {
                    res.json({ exists: false });
                }
            });
        } else {
            res.json({ exists: false });
        }
    });
});

// Ruta de cierre de sesión
app.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return console.error(err);
        }
        res.clearCookie('connect.sid');
        res.redirect('/login');
    });
});

// Manejar las solicitudes POST para registrar un nuevo usuario
app.post('/register', (req, res) => {
    const { name, email, clave } = req.body;
    const saltRounds = 10;
    const insertUserQuery = 'INSERT INTO usuario (Nombre, CorreoElectronico, Clave) VALUES (?, ?, ?)';

    const checkEmailQuery = 'SELECT * FROM usuario WHERE CorreoElectronico = ?';
    db.query(checkEmailQuery, [email], (err, result) => {
        if (err) {
            return res.status(500).json({ error: 'Error en el servidor' });
        }
        if (result.length > 0) {
            return res.status(400).json({ error: 'El correo electrónico ya está en uso' });
        }
        bcrypt.hash(clave, saltRounds, (err, hashedPassword) => {
            if (err) {
                return res.status(500).json({ error: 'Error en el servidor' });
            }
            db.query(insertUserQuery, [name, email, hashedPassword], (err, result) => {
                if (err) {
                    return res.status(500).json({ error: 'Error en el servidor' });
                }
                res.json({ registered: true });
            });
        });
    });
});

// Ruta para la página 'inicio.html'
app.get('/inicio', (req, res) => { // Asegúrate de que la ruta esté bien definida
    if (req.session.user) {
        res.sendFile(path.join(__dirname, 'inicio', 'inicio.html'));
    } else {
        res.redirect('/login');
    }
});

app.get('/inicio-admin', (req, res) => {
    if (req.session.user && req.session.user.ID_Perfil === 1) {
        res.sendFile(path.join(__dirname, 'inicio', 'inicioAdmin.html'));
    } else {
        res.redirect('/login');
    }
});

// Definir las rutas para las páginas de productos, perfiles y usuarios
app.get('/productos', (req, res) => {
    // Redireccionar a la página de productos
    res.sendFile(path.join(__dirname, 'views/productos/product-list.html'));
});


app.get('/usuarios', (req, res) => {
    // Redireccionar a la página de usuarios
    res.sendFile(path.join(__dirname, 'views/usuarios/user-list.html'));
});

// Ruta para la página 'carrito.html'
app.get('/carrito.html', (req, res) => {
    if (req.session.user) {
        res.sendFile(path.join(__dirname, 'carrito.html'));
    } else {
        res.redirect('/login');
    }
});

// Ruta para consultar todos los perfiles
app.get('/perfil/consultarPerfil', (req, res) => {
    // Realizar la consulta SQL
    const query = 'SELECT * FROM perfil';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al ejecutar la consulta:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        // Enviar los resultados en formato JSON
        res.json(results);
    });
});


// Ruta para agregar un nuevo perfil
app.post('/perfil/agregarPerfil', (req, res) => {
    const { Tipo_Perfil } = req.body;
    db.query('INSERT INTO perfil (Tipo_Perfil) VALUES (?)', [Tipo_Perfil], (err, results) => {
        if (err) {
            console.error('Error al agregar el perfil:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.status(201).json({ message: 'Perfil agregado exitosamente' });
    });
});

// Ruta para actualizar los datos de un perfil
app.put('/perfil/actualizarPerfil/:id', (req, res) => {
    const { id } = req.params;
    const { Tipo_Perfil } = req.body;
    const query = 'UPDATE perfil SET Tipo_Perfil = $1 WHERE ID_Perfil = $2';

    db.query(query, [Tipo_Perfil, id], (err, results) => {
        if (err) {
            console.error('Error al actualizar el perfil:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.json({ message: 'Datos del perfil actualizados exitosamente' });
    });
});

// Ruta para eliminar un perfil
app.delete('/perfil/eliminarPerfil/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM perfil WHERE ID_Perfil = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar el perfil:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.json({ message: 'Perfil eliminado exitosamente' });
    });
});


// Ruta para actualizar los datos de un usuario
app.post('/usuarios/agregarUsuario', (req, res) => {
    const { nombre, correoElectronico, clave, idPerfil } = req.body;
    const saltRounds = 10;

    bcrypt.hash(clave, saltRounds, (err, hashedPassword) => {
        if (err) {
            console.error('Error al hashear la contraseña:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }

        // Una vez que la contraseña ha sido hasheada, insertamos el usuario en la base de datos
        db.query('INSERT INTO usuario (Nombre, CorreoElectronico, Clave, ID_Perfil) VALUES (?, ?, ?, ?)', [nombre, correoElectronico, hashedPassword, idPerfil], (err, results) => {
            if (err) {
                console.error('Error al agregar el usuario:', err);
                res.status(500).json({ error: 'Error interno del servidor' });
                return;
            }
            res.status(201).json({ message: 'Usuario agregado exitosamente' });
        });
    });
});

app.put('/usuarios/actualizarUsuario/:id', (req, res) => {
    const { id } = req.params;
    const { nombre, correoElectronico, clave, idPerfil } = req.body;
    const query = 'UPDATE usuario SET Nombre = ?, CorreoElectronico = ?, Clave = ?, ID_Perfil = ? WHERE ID_Usuario = ?';

    db.query(query, [nombre, correoElectronico, clave, idPerfil, id], (err, results) => {
        if (err) {
            console.error('Error al actualizar el usuario:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.json({ message: 'Datos del usuario actualizados exitosamente' });
    });
});

// Ruta para eliminar un usuario
app.delete('/usuarios/eliminarUsuario/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM usuario WHERE ID_Usuario = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar el usuario:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.json({ message: 'Usuario eliminado exitosamente' });
    });
});

// Ruta para consultar todos los usuarios
app.get('/usuarios/consultarUsuarios', (req, res) => {
    // Realizar la consulta SQL
    const query = 'SELECT * FROM usuario';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al ejecutar la consulta:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        // Enviar los resultados en formato JSON
        res.json(results);
    });
});


// Ruta para productos
app.post('/producto/agregarProducto', (req, res) => {
    const { Nombre, Descripcion, Precio } = req.body;
    db.query('INSERT INTO producto (Nombre, Descripcion, Precio) VALUES (?, ?, ?)', [Nombre, Descripcion, Precio], (err, results) => {
        if (err) {
            console.error('Error al agregar el producto:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.status(201).json({ message: 'Producto agregado exitosamente' });
    });
});

app.put('/producto/actualizarProducto/:id', (req, res) => {
    const { id } = req.params;
    const { Nombre, Descripcion, Precio } = req.body;
    const query = 'UPDATE producto SET Nombre = ?, Descripcion = ?, Precio = ? WHERE ID_Producto = ?';

    db.query(query, [Nombre, Descripcion, Precio, id], (err, results) => {
        if (err) {
            console.error('Error al actualizar el producto:', err);
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
        res.json({ message: 'Datos del producto actualizados exitosamente' });
    });
});

app.delete('/producto/eliminarProducto/:id', (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM producto WHERE ID_Producto = ?', [id], (err, results) => {
        if (err) {
            console.error('Error al eliminar el producto:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        res.json({ message: 'Producto eliminado exitosamente' });
    });
});

app.get('/producto/consultarProducto', (req, res) => {
    // Realizar la consulta SQL
    const query = 'SELECT * FROM producto';
    db.query(query, (err, results) => {
        if (err) {
            console.error('Error al ejecutar la consulta:', err);
            res.status(500).json({ error: 'Error interno del servidor' });
            return;
        }
        // Enviar los resultados en formato JSON
        res.json(results);
    });
});


app.get('/perfil', (req, res) => {
    // Redireccionar a la página de perfiles
    res.sendFile(path.join(__dirname, 'views','perfil','profile-list.html'));
});

app.get('/profile-create', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'perfil', 'profile-create.html'));
});

app.get('/profile-detail', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'perfil', 'profile-detail.html'));
});

app.get('/profile-edit', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'perfil', 'profile-edit.html'));
});

app.get('/profile-list', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'perfil', 'profile-list.html'));
});

// Ruta para mostrar la lista de usuarios
app.get('/user-list', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'usuarios', 'user-list.html'));
});

// Ruta para mostrar el formulario de creación de usuario
app.get('/user-create', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'usuarios', 'user-create.html'));
});

// Ruta para mostrar el formulario de edición de usuario
app.get('/user-edit/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'usuarios', 'user-edit.html'));
});

// Ruta para mostrar la lista de productos
app.get('/product-list', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'productos', 'product-list.html'));
});

// Ruta para mostrar el formulario de creación de productos
app.get('/product-create', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'productos', 'product-create.html'));
});

// Ruta para mostrar el formulario de edición de productos
app.get('/product-edit/:id', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'productos', 'product-edit.html'));
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});


