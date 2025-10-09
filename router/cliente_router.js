const cliente_controller = require('../controller/cliente_controller');
const express = require('express');
const router = express.Router();

router.post('/clientes', cliente_controller.createCliente);
router.get('/clientes', cliente_controller.getAllClientes);
router.get('/clientes/:id', cliente_controller.getClienteById);
router.put('/clientes/:id', cliente_controller.updateCliente);
router.delete('/clientes/:id', cliente_controller.deleteCliente);

module.exports = router;