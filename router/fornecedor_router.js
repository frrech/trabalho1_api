const fornecedor_controller = require("../controller/fornecedor_controller");
const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /fornecedores:
 *   post:
 *     summary: Create a new supplier
 *     tags: [Fornecedores]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Fornecedor'
 *     responses:
 *       201:
 *         description: Supplier created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Fornecedor'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post("/", fornecedor_controller.createFornecedor);

/**
 * @swagger
 * /fornecedores:
 *   get:
 *     summary: Get all suppliers
 *     tags: [Fornecedores]
 *     responses:
 *       200:
 *         description: List of all suppliers
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Fornecedor'
 *       500:
 *         description: Server error
 */
router.get("/", fornecedor_controller.getAllFornecedores);

/**
 * @swagger
 * /fornecedores/{id}:
 *   get:
 *     summary: Get a supplier by ID
 *     tags: [Fornecedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Supplier ID
 *     responses:
 *       200:
 *         description: Supplier found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Fornecedor'
 *       404:
 *         description: Supplier not found
 *       500:
 *         description: Server error
 */
router.get("/:id", fornecedor_controller.getFornecedorById);

/**
 * @swagger
 * /fornecedores/{id}:
 *   put:
 *     summary: Update a supplier
 *     tags: [Fornecedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Supplier ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Fornecedor'
 *     responses:
 *       200:
 *         description: Supplier updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Fornecedor'
 *       404:
 *         description: Supplier not found
 *       500:
 *         description: Server error
 */
router.put("/:id", fornecedor_controller.updateFornecedor);

/**
 * @swagger
 * /fornecedores/{id}:
 *   delete:
 *     summary: Delete a supplier
 *     tags: [Fornecedores]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Supplier ID
 *     responses:
 *       204:
 *         description: Supplier deleted successfully
 *       404:
 *         description: Supplier not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", fornecedor_controller.deleteFornecedor);

module.exports = router;
