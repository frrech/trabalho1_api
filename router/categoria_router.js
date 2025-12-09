const categoriaController = require('../controller/categoria_controller');
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /categoria:
 *   post:
 *     summary: Create a new category
 *     tags: [Categorias]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Categoria'
 *     responses:
 *       201:
 *         description: Category created
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Categoria'
 */
router.post('/', categoriaController.createCategoria);

/**
 * @swagger
 * /categoria:
 *   get:
 *     summary: Get all categories
 *     tags: [Categorias]
 *     responses:
 *       200:
 *         description: List of categories
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Categoria'
 */
router.get('/', categoriaController.getAllCategorias);

/**
 * @swagger
 * /categoria/{id}:
 *   get:
 *     summary: Get a category by ID
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Category found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Categoria'
 */
router.get('/:id', categoriaController.getCategoriaById);

/**
 * @swagger
 * /categoria/{id}:
 *   put:
 *     summary: Update a category
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Categoria'
 *     responses:
 *       200:
 *         description: Category updated
 */
router.put('/:id', categoriaController.updateCategoria);

/**
 * @swagger
 * /categoria/{id}:
 *   delete:
 *     summary: Delete a category
 *     tags: [Categorias]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       204:
 *         description: Category deleted
 */
router.delete('/:id', categoriaController.deleteCategoria);

module.exports = router;
