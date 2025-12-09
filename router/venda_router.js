const vendaController = require('../controller/venda_controller');
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /venda:
 *   post:
 *     summary: Create a new sale
 *     tags: [Vendas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Venda'
 *     responses:
 *       201:
 *         description: Sale created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Venda'
 */
router.post('/', vendaController.createVenda);

/**
 * @swagger
 * /venda:
 *   get:
 *     summary: Get all sales
 *     tags: [Vendas]
 *     responses:
 *       200:
 *         description: List of sales
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Venda'
 */
router.get('/', vendaController.getAllVendas);

/**
 * @swagger
 * /venda/{id}:
 *   get:
 *     summary: Get a sale by ID
 *     tags: [Vendas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Sale found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Venda'
 */
router.get('/:id', vendaController.getVendaById);

/**
 * @swagger
 * /venda/{id}:
 *   delete:
 *     summary: Delete a sale
 *     tags: [Vendas]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Sale deleted
 */
router.delete('/:id', vendaController.deleteVenda);

module.exports = router;
