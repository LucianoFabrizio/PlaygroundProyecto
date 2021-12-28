const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { body } = require('express-validator');

const validationsRegistro = [
    body('name')
    .notEmpty().
    withMessage('Tienes que escribir un Nombre'),

    body('name')
    .isLength({ min: 2 })
    .withMessage('El usuario debe tener al menos 2 caracteres'),


    body('mail')
    .notEmpty()
    .withMessage('Tienes que escribir un mail'),

    body('password')
    .notEmpty()
    .withMessage('Tienes que escribir una contraseña'),
    
    body('password')
   .isLength({ min: 8 })
   .withMessage('La contraseña debe tener al menos 8 caracteres'),
       // .matches('password2').withMessage('Tienes que escribir la misma contraseña en los dos campos'),
    body('password2')
        .notEmpty()
        .withMessage('Tienes que escribir una contraseña'),
        body('password2')
        .isLength({ min: 8 })
       .withMessage('La contraseña debe tener al menos 8 caracteres')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error(
                    'las contraseñas no son iguales'
                );
            }
            return true;
        }),

];

const validationsLogin = [
    body('email')
    .notEmpty(),

    body('password')
    .notEmpty()
    .withMessage('Tienes que escribir una contraseña'),
]


router.get('/list', usersController.list);

router.get('/detail/:id', usersController.detail);

router.get('/register', usersController.register);

router.post('/create', validationsRegistro, usersController.create);

router.get('/login', usersController.login)

router.post('/login', validationsLogin, usersController.processLogin)

router.get('/edit/:id', usersController.edit);

router.post('/update/:id', usersController.update);

router.get('/delete/:id', usersController.delete);

router.post('/delete/:id', usersController.destroy);

module.exports = router;
