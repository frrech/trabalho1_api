const cliente_controller = require("../controller/cliente_controller");
const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /clientes:
 *   post:
 *     summary: Create a new client
 *     tags: [Clientes]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       201:
 *         description: Client created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post("/", cliente_controller.createCliente);

/**
 * @swagger
 * /clientes:
 *   get:
 *     summary: Get all clients
 *     tags: [Clientes]
 *     responses:
 *       200:
 *         description: List of all clients
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Cliente'
 *       500:
 *         description: Server error
 */
router.get("/", cliente_controller.getAllClientes);

/**
 * @swagger
 * /clientes/{id}:
 *   get:
 *     summary: Get a client by ID
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Client ID
 *     responses:
 *       200:
 *         description: Client found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       404:
 *         description: Client not found
 *       500:
 *         description: Server error
 */
router.get("/:id", cliente_controller.getClienteById);

/**
 * @swagger
 * /clientes/{id}:
 *   put:
 *     summary: Update a client
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Client ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Cliente'
 *     responses:
 *       200:
 *         description: Client updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Cliente'
 *       404:
 *         description: Client not found
 *       500:
 *         description: Server error
 */
router.put("/:id", cliente_controller.updateCliente);

/**
 * @swagger
 * /clientes/{id}:
 *   delete:
 *     summary: Delete a client
 *     tags: [Clientes]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Client ID
 *     responses:
 *       204:
 *         description: Client deleted successfully
 *       404:
 *         description: Client not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", cliente_controller.deleteCliente);

module.exports = router;
