const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');
const userLogged = require('../middlewares/userAuth.js');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img/uploads');
    },
    filename(req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname));
    },
});

const upload = multer({ storage });

const productsController = require('../controllers/productsController');

// Listado de productos
router.get('/', productsController.index);

// Crear producto
router.get('/create', userLogged, productsController.create);

// Detalle de un producto particular
router.get('/:id', productsController.detail);

//Acción de creación (a donde se envía el formulario)
router.post('/', upload.single('imgProd'), productsController.store);

// Formulario de edición de productos
router.get('/edit/:id', userLogged, productsController.edit);

// Acción de edición de productos
router.post('/edit/:id', upload.single('imgProd'), userLogged, productsController.update);

// Acción de borrado
router.delete('/:id', productsController.delete);

module.exports = router;
