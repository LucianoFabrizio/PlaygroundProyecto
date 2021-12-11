const express = require('express');
const router = express.Router();
const usersController = require('../controllers/usersController');

router.get('/list', usersController.list);

router.get('/detail/:id', usersController.detail);

router.get('/register', usersController.register);

router.post('/create', usersController.create);

router.get('/edit/:id', usersController.edit);

router.post('/update/:id', usersController.update);

router.get('/delete/:id', usersController.delete);

router.post('/delete/:id', usersController.destroy);

module.exports = router;
