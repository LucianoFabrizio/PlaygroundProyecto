const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const path = require('path');
const userLogged = require('../middlewares/userLogged.js');
const multer  = require('multer')

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/products')
    },
    filename: function (req, file, cb) {
        let fileName = `${Date.now()}${path.extname(file.originalname)}`;
		cb(null, fileName);
    }
  })
  
  const upload = multer({ storage: storage });


// LISTAR 
router.get('/', productsController.list);

// CREAR
router.get ('/create', productsController.create);
router.post('/create', upload.single('image'), productsController.processCreate);

// EDITAR
router.get ('/edit/:id', productsController.edit);
router.put('/edit/:id', upload.single('image'), productsController.processEdit);

//DETALLE
router.get('/detail/:id', productsController.detail);

//BUSCAR
router.get('/search', productsController.search)

// ELIMINAR
router.delete('/delete/:id', productsController.delete);

// CART
router.get('/cart', productsController.cart);

module.exports = router;
