const contaController = require("../controller/conta_controller");
const express = require("express");
const router = express.Router();

/**
 * @swagger
 * /contas:
 *   post:
 *     summary: Create a new account
 *     tags: [Contas]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               cliente_id:
 *                 type: integer
 *               saldo:
 *                 type: number
 *                 format: float
 *     responses:
 *       201:
 *         description: Account created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Conta'
 *       400:
 *         description: Bad request
 *       500:
 *         description: Server error
 */
router.post("/", contaController.createConta);

/**
 * @swagger
 * /contas/{id}:
 *   get:
 *     summary: Get an account by ID
 *     tags: [Contas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Account ID
 *     responses:
 *       200:
 *         description: Account found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Conta'
 *       404:
 *         description: Account not found
 *       500:
 *         description: Server error
 */
router.get("/:id", contaController.getContaById);

/**
 * @swagger
 * /contas/{id}:
 *   put:
 *     summary: Update an account
 *     tags: [Contas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Account ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Conta'
 *     responses:
 *       200:
 *         description: Account updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Conta'
 *       404:
 *         description: Account not found
 *       500:
 *         description: Server error
 */
router.put("/:id", contaController.updateConta);

/**
 * @swagger
 * /contas/{id}:
 *   delete:
 *     summary: Delete an account
 *     tags: [Contas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Account ID
 *     responses:
 *       204:
 *         description: Account deleted successfully
 *       404:
 *         description: Account not found
 *       500:
 *         description: Server error
 */
router.delete("/:id", contaController.deleteConta);

/**
 * @swagger
 * /contas/{id}/depositar:
 *   post:
 *     summary: Deposit money into an account
 *     tags: [Contas]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Account ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               valor:
 *                 type: number
 *                 format: float
 *     responses:
 *       200:
 *         description: Deposit successful
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Conta'
 *       400:
 *         description: Invalid amount
 *       404:
 *         description: Account not found
 *       500:
 *         description: Server error
 */
router.post("/:id/depositar", contaController.depositAmount);

module.exports = router;
