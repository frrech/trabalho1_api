const contaController = require('../controller/conta_controller');
const express = require('express');
const router = express.Router();

router.post('/', contaController.createConta);
router.get('/', contaController.getAllContas);
router.put('/:id', contaController.updateConta);
router.delete('/:id', contaController.deleteConta);
router.post('/depositar/:id', contaController.depositAmount);

module.exports = router;