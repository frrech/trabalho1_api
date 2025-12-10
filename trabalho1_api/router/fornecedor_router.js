const express = require('express');
const router = express.Router();

// Sample data for suppliers
let fornecedores = [];

// Get all suppliers
router.get('/', (req, res) => {
    res.json(fornecedores);
});

// Get a supplier by ID
router.get('/:id', (req, res) => {
    const fornecedor = fornecedores.find(f => f.id === parseInt(req.params.id));
    if (!fornecedor) return res.status(404).send('Supplier not found');
    res.json(fornecedor);
});

// Create a new supplier
router.post('/', (req, res) => {
    const fornecedor = {
        id: fornecedores.length + 1,
        name: req.body.name,
        contact: req.body.contact
    };
    fornecedores.push(fornecedor);
    res.status(201).json(fornecedor);
});

// Update a supplier
router.put('/:id', (req, res) => {
    const fornecedor = fornecedores.find(f => f.id === parseInt(req.params.id));
    if (!fornecedor) return res.status(404).send('Supplier not found');

    fornecedor.name = req.body.name;
    fornecedor.contact = req.body.contact;
    res.json(fornecedor);
});

// Delete a supplier
router.delete('/:id', (req, res) => {
    const fornecedorIndex = fornecedores.findIndex(f => f.id === parseInt(req.params.id));
    if (fornecedorIndex === -1) return res.status(404).send('Supplier not found');

    fornecedores.splice(fornecedorIndex, 1);
    res.status(204).send();
});

module.exports = router;