const usuarioController = require('../controller/usuario_controller');
const express = require('express');
const router = express.Router();


router.post('/register', usuarioController.registerUsuario);


router.post('/login', usuarioController.loginUsuario);


router.get('/', usuarioController.getAllUsuarios);


router.get('/:id', usuarioController.getUsuarioById);


router.delete('/:id', usuarioController.deleteUsuario);

module.exports = router;
