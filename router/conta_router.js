const contaController = require('../controllers/conta_controller');
const express = require('express');
const router = express.Router();

router.post('/contas', contaController.createConta);
router.get('/contas/:id', contaController.getContaById);
router.put('/contas/:id', contaController.updateConta);
router.delete('/contas/:id', contaController.deleteConta);
router.post('/contas/:id/depositar', contaController.depositAmount);

module.exports = router;