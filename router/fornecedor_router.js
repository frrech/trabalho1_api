const fornecedor_controller = require("../controller/fornecedor_controller");
const express = require("express");
const router = express.Router();

<<<<<<< HEAD
router.post('/', fornecedor_controller.createFornecedor);
router.get('/', fornecedor_controller.getAllFornecedores);
router.get('/:id', fornecedor_controller.getFornecedorById);
router.put('/:id', fornecedor_controller.updateFornecedor);
router.delete('/:id', fornecedor_controller.deleteFornecedor);
=======
router.post("/", fornecedor_controller.createFornecedor);
router.get("/", fornecedor_controller.getAllFornecedores);
router.get("/:id", fornecedor_controller.getFornecedorById);
router.put("/:id", fornecedor_controller.updateFornecedor);
router.delete("/:id", fornecedor_controller.deleteFornecedor);
>>>>>>> eae864c8070db0b67061f43e971a8339c9676979

module.exports = router;
