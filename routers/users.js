const express = require('express');
const router = express.Router();
const path = require('path');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'public/img/uploads')
    },
    filename (req, file, cb) {
        let filename = `${Date.now()}_img${path.extname(file.filename)}`; 
                cb(null, filename);
    }
})

const upload = multer({storage})

const usersController = require('../controllers/usersController');
  
// Registrar usuario
router.get('/register', usersController.register); 

// Acción de registro de usuario (a donde se envía el formulario)
router.post('/', upload.single('imgUser'), usersController.store);

// Login usuario
router.get('/login', usersController.login)

// Proceso de login (a donde se envía el formulario)
router.post('/', usersController.processLogin)

// Edición/Borrar usuario
router.get('/:id/edit', usersController.edit)

// Detalle de usuario
router.get('/:id', usersController.detail)

// Proceso de Edición (a donde se envía el formulario)
router.put('/:id', usersController.update)

// Proceso de borrado
router.delete('/:id', usersController.delete); 

module.exports = router;