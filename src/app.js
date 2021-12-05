const express = require('express');
const app = express();
const path = require('path');
const methodOverride = require('method-override');
const session = require('express-session');

const sessionMiddle = require('./middlewares/sessionMiddle')

const PORT = process.env.PORT || 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(session({ secret: 'Session de Station Game' }));
app.use(methodOverride('_method'));

app.set('view engine', 'ejs'); // Define que el motor que utilizamos es EJS
app.set('views', path.join(__dirname, '/views')); // Define la ubicación de la carpeta de las Vistas

// const mainRouter = require('./routers/main');
// const productRouter = require('./routers/products');
usersRouter = require('./routers/users');

// app.use('/', mainRouter);
// app.use('/products', productRouter);
app.use('/users', usersRouter);
// app.use(sessionMiddle)

app.listen(PORT, () => {
    console.log(`El servidor está corriento en http://localhost:` + PORT);
});
app.use(express.static('public'));
