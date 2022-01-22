const express = require('express');
const router = express.Router();

const mainController = require('../controllers/mainController.js');

// Index
router.get('/', mainController.index);

// Xbox
router.get('/xbox', mainController.xbox);

// PlayStation
router.get('/playstation', mainController.playstation);

// Switch
router.get('/switch', mainController.switch);

module.exports = router;
