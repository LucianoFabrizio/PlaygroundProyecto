const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { body } = require('express-validator');
const userAuth = require('../middlewares/userAuth')
const adminRedirect = require('../middlewares/adminRedirect')

const validationsRegistro = [
    body('name')
    .notEmpty().
    withMessage('Tienes que escribir un Nombre'),

    body('name')
    .isLength({ min: 2 })
    .withMessage('El usuario debe tener al menos 2 caracteres'),

    body('email')
    .notEmpty()
    .withMessage('Tienes que escribir un email'),

    body('password')
    .notEmpty()
    .withMessage('Tienes que escribir una contraseña'),
    
    body('password')
   .isLength({ min: 8 })
   .withMessage('La contraseña debe tener al menos 8 caracteres'),
       // .matches('password2').withMessage('Tienes que escribir la misma contraseña en los dos campos'),
    body('password2')
        .notEmpty()
        .withMessage('Tienes que escribir una contraseña')
  
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

router.get('/detail/:id', adminRedirect, usersController.detail);

router.get('/register', validationsRegistro, usersController.register);

router.post('/create', validationsRegistro, usersController.create);

router.get('/login', usersController.login)

router.post('/login', validationsLogin, usersController.processLogin)

router.get('/edit/:id', userAuth, usersController.edit);

router.post('/update/:id', userAuth, usersController.update);

router.get('/delete/:id', userAuth, usersController.delete);

router.delete('/delete/:id', userAuth, usersController.destroy);

module.exports = router;
