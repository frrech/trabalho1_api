const cliente_controller = require('../controller/cliente_controller');
const express = require('express');
const router = express.Router();

router.post('/', cliente_controller.createCliente);
router.get('/', cliente_controller.getAllClientes);
router.get('/:id', cliente_controller.getClienteById);
router.put('/:id', cliente_controller.updateCliente);
router.delete('/:id', cliente_controller.deleteCliente);

module.exports = router;