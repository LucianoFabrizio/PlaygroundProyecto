const express = require('express');
const router = express.Router();

const productsController = require('../controllers/productsController');

// Listado de productos
router.get('/', productsController.index); 

// Crear producto
router.get('/create', productsController.create); 

// Detalle de un producto particular
router.get('/:id', productsController.detail); 

//Acción de creación (a donde se envía el formulario)
router.post('/', productsController.store); 

// Formulario de edición de productos
router.get('/:id/edit', productsController.edit); 

// Acción de edición de productos
router.put('/:id/edit', productsController.update); 

// Acción de borrado
router.delete('/:id', productsController.delete); 


module.exports = router;