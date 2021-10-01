const express = require("express");
const router = express.Router();
const controlador = require("../controllers/mainController.js");

router.get("/",controlador.index)
router.get("/productCart",controlador.productCart)
router.get("/register",controlador.register)
router.get("/login",controlador.login)
router.get("/productPage",controlador.productPage)

module.exports = router
