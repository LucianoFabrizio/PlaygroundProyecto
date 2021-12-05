const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/list', usersController.list);

module.exports = router;
