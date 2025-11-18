const contaController = require("../controller/conta_controller");
const express = require("express");
const router = express.Router();

<<<<<<< HEAD
router.post('/', contaController.createConta);
router.get('/', contaController.getAllContas);
router.put('/:id', contaController.updateConta);
router.delete('/:id', contaController.deleteConta);
router.post('/depositar/:id', contaController.depositAmount);
=======
router.post("", contaController.createConta);
router.get("/:id", contaController.getContaById);
router.put("/:id", contaController.updateConta);
router.delete("/:id", contaController.deleteConta);
router.post("/:id/depositar", contaController.depositAmount);
>>>>>>> eae864c8070db0b67061f43e971a8339c9676979

module.exports = router;
