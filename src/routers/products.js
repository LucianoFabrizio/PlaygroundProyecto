const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const path = require('path');
const userLogged = require('../middlewares/userLogged.js');
const multer = require('multer');
const { body } = require('express-validator');
const userAuth = require('../middlewares/userAuth');

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'public/uploads/products');
    },
    filename: function (req, file, cb) {
        let fileName = `${Date.now()}${path.extname(file.originalname)}`;
        cb(null, fileName);
    },
});

const upload = multer({ storage: storage });

const validationProd = [
    body('name')
        .notEmpty()
        .withMessage('Tienes que escribir un nombre.')
        .isLength({ min: 5, max: undefined })
        .withMessage(
            'Tienes que escribir un nombre con al menos 5 caracteres.'
        ),

    body('description')
        .notEmpty()
        .withMessage('Tienes que escribir una descripción.')
        .isLength({ min: 20, max: undefined })
        .withMessage(
            'Tienes que escribir una descripción con al menos 20 caracteres.'
        ),

    // body('image').custom((value, { req }) => {
    //     let file = req.file;
    //     let extensionsAllowed = ['.jpeg', '.jpg', '.png', '.gif'];
    //     if (req.file != undefined) {
    //         let fileExtension = path.extname(file.originalname);
    //         if (!extensionsAllowed.includes(fileExtension)) {
    //             throw new Error(
    //                 'Solo puedes usar archivos ' + extensionsAllowed.join(', ')
    //             );
    //         }
    //     }
    //     return true;
    // })

    body('image').custom((value, { req }) => {
        let file = req.file;
        let acceptedExtensions = ['.jpg', '.png', '.gif'];
        if (!file) {
            throw new Error('Tienes que subir una imagen');
        } else {
            let fileExtension = path.extname(file.originalname);
            if (!acceptedExtensions.includes(fileExtension)) {
                throw new Error(`Las extensiones de archivo permitidas son"  ${acceptedExtensions.join(', ')} `);
            }
        }

        return true;
    })
];

// LISTAR
router.get('/', productsController.list);

// ADMIN
router.get('/admin', userAuth, productsController.admin);

// CREAR
router.get('/create', userAuth, productsController.create);
router.post(
    '/create',
    upload.single('image'),
    validationProd,
    productsController.processCreate
);

// EDITAR
router.get('/edit/:id', userAuth, productsController.edit);
router.put(
    '/edit/:id',
    upload.single('image'),
    validationProd,
    productsController.processEdit
);

//DETALLE
router.get('/detail/:id', productsController.detail);

//BUSCAR
router.get('/search', productsController.search);

// ELIMINAR
router.delete('/delete/:id', productsController.delete);

// CART
router.get('/cart', productsController.cart);

module.exports = router;
