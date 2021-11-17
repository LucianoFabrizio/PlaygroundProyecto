const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const userAuth = require('../middlewares/userAuth.js')

const { body } = require('express-validator');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './public/img/uploads')
    },
    filename (req, file, cb) {
        let filename = `${Date.now()}_img${path.extname(file.originalname)}`; 
                cb(null, filename);
    }
})  

const upload = multer({storage})

const usersController = require('../controllers/usersController');
    
const validations = [
    body('name').notEmpty().withMessage('Tienes que escribir un Nombre'),
    body('mail').notEmpty().withMessage('Tienes que escribir un mail'),
    body('password')
    .notEmpty().withMessage('Tienes que escribir una contraseña'),
    // .matches('password2').withMessage('Tienes que escribir la misma contraseña en los dos campos'),
    body('password2') 
    .notEmpty().withMessage('Tienes que escribir una contraseña')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('Password confirmation does not match password');
      }
      return true;
    })
];

// Registrar usuario
router.get('/register', usersController.register); 

// Acción de registro de usuario (a donde se envía el formulario)
router.post('/', upload.single('imgUser'), validations, usersController.store);

// Login usuario
router.get('/login', usersController.login)

// Proceso de login (a donde se envía el formulario)
router.post('/login', usersController.processLogin)

// Edición/Borrar usuario
router.get('/:id/edit', usersController.edit) 

// Detalle de usuario
router.get('/:id', usersController.detail)

// Formulario de edición de usuarios
router.get('/edit/:id', usersController.edit)

// Proceso de Edición (a donde se envía el formulario)
router.post('/edit/:id', upload.single('imgUser'), validations, usersController.store)

// Proceso de borrado
router.delete('/:id', usersController.delete); 

module.exports = router;