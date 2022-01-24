const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const path = require('path');
const userLogged = require('../middlewares/userLogged.js');
const multer  = require('multer')
const { body } = require('express-validator');
const userAuth = require('../middlewares/userAuth')

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

const validationProd = [
    body('name')
    .notEmpty()
    .withMessage('Tienes que escribir un nombre con al menos 5 caracteres.')
    .isLength({ min: 5 })
    .withMessage('Tienes que escribir un nombre con al menos 5 caracteres.'),

    body('description')
    .notEmpty()
    .withMessage('Tienes que escribir una descripción con al menos 20 caracteres.')
    .isLength({ min: 20 })
    .withMessage('Tienes que escribir una descripción con al menos 20 caracteres.'),

    body('image')
    .notEmpty()
    .withMessage('Tienes que subir una imagen.')
    .custom( function(value, filename) {

      let extension = (path.extname(filename)).toLowerCase();
      switch (extension) {
          case '.jpg':
              return '.jpg';
          case '.jpeg':
              return '.jpeg';
          case  '.png':
              return '.png';
          case '.gif':
          default:
            throw new Error ('La extensión del archivo es incorrecta.')
            
      }
  }
)
]




// LISTAR 
router.get('/', productsController.list);

// ADMIN 
router.get('/admin', userAuth, productsController.admin);

// CREAR
router.get ('/create', userAuth, productsController.create);
router.post('/create',  validationProd, upload.single('image'), productsController.processCreate);

// EDITAR
router.get ('/edit/:id',validationProd, userAuth,  productsController.edit);
router.put('/edit/:id',  validationProd,  upload.single('image'), productsController.processEdit);

//DETALLE
router.get('/detail/:id', productsController.detail);

//BUSCAR
router.get('/search', productsController.search)

// ELIMINAR
router.delete('/delete/:id', productsController.delete);

// CART
router.get('/cart', productsController.cart);

module.exports = router;
