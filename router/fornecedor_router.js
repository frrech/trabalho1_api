const fornecedor_controller = require('../controller/fornecedor_controller');
const express = require('express');
const router = express.Router();

router.post('/', fornecedor_controller.createFornecedor);
router.get('/', fornecedor_controller.getAl);
router.get('/:id', fornecedor_controller.getFornecedorById);
router.put('/:id', fornecedor_controller.updateFornecedor);
router.delete('/:id', fornecedor_controller.deleteFornecedor);

module.exports = router;