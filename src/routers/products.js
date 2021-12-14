const express = require('express');
const router = express.Router();
const productsController = require('../controllers/productsController');
const path = require('path');
const userLogged = require('../middlewares/userLogged.js');

// LISTAR 
router.get('/', productsController.list);

// CREAR
router.get ('/create', productsController.create);
router.post('/create', productsController.processCreate);

// EDITAR
router.get ('/:id/edit', productsController.edit);
router.put('/:id/edit', productsController.processEdit);

//DETALLE
router.get('/:id/detail', productsController.detail);

//BUSCAR

// ELIMINAR
router.delete('/', productsController.delete);

module.exports = router;
