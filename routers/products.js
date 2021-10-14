const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController');

// Mostrar todos los productos
router.get('/', productsController.index); 

// Creat producto
router.get('/create', productsController.create); 
router.post('/', productsController.store); 


// Mostrar producto
router.get('/detail/:id', productsController.detail); 

// Editar producto
router.get('/edit/:id', productsController.edit); 
router.patch('/edit/:id', productsController.update); 


// Borrar producto
router.delete('/delete/:id', productsController.destroy); 


module.exports = router;