const express = require("express");
const router = express.Router();

const mainController = require("../controllers/mainController.js");


// Index
router.get('/', mainController.index)

// Login
router.get('/login', mainController.login); 

// Register
router.get('/register', mainController.register); 

// Carrito
router.get('/cart', mainController.cart);

module.exports = router
