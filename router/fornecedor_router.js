const fornecedor_controller = require('../controller/fornecedor_controller');
const express = require('express');
const router = express.Router();

router.post('/fornecedores', fornecedor_controller.createFornecedor);
router.get('/fornecedores', fornecedor_controller.getAllFornecedores);
router.get('/fornecedores/:id', fornecedor_controller.getFornecedorById);
router.put('/fornecedores/:id', fornecedor_controller.updateFornecedor);
router.delete('/fornecedores/:id', fornecedor_controller.deleteFornecedor);

module.exports = router;