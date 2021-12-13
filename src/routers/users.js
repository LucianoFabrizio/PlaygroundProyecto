const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');
const { body } = require('express-validator');

const validations = [
    body('name').notEmpty().withMessage('Tienes que escribir un Nombre'),
    body('mail').notEmpty().withMessage('Tienes que escribir un mail'),
    body('password')
        .notEmpty()
        .withMessage('Tienes que escribir una contraseña'),
    // .matches('password2').withMessage('Tienes que escribir la misma contraseña en los dos campos'),
    body('password2')
        .notEmpty()
        .withMessage('Tienes que escribir una contraseña')
        .custom((value, { req }) => {
            if (value !== req.body.password) {
                throw new Error(
                    'Password confirmation does not match password'
                );
            }
            return true;
        }),
];


router.get('/list', usersController.list);

router.get('/detail/:id', usersController.detail);

router.get('/register', validations, usersController.register);

router.post('/create', usersController.create);

router.get('/login', usersController.login)

router.post('/login', usersController.processLogin)

router.get('/edit/:id', usersController.edit);

router.post('/update/:id', usersController.update);

router.get('/delete/:id', usersController.delete);

router.post('/delete/:id', usersController.destroy);

module.exports = router;
