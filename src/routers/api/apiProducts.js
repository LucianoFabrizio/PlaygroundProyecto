const express = require('express');
const router = express.Router();
const apiProductsController = require('../../controllers/api/apiProductsController');
const path = require('path');


// LISTAR 
router.get('/', apiProductsController.list);

router.get('/:id', apiProductsController.detail);



module.exports = router;