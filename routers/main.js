const express = require("express");
const router = express.Router();

const mainController = require("../controllers/mainController.js");


// Index
router.get('/', mainController.index)

// Crear producto
router.get('/login', mainController.login); 

module.exports = router
