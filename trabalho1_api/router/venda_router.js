const express = require('express');
const router = express.Router();

// Sample data for sales
let vendas = [];

// Get all sales
router.get('/', (req, res) => {
    res.json(vendas);
});

// Get a specific sale by ID
router.get('/:id', (req, res) => {
    const venda = vendas.find(v => v.id === parseInt(req.params.id));
    if (!venda) return res.status(404).send('Sale not found');
    res.json(venda);
});

// Create a new sale
router.post('/', (req, res) => {
    const venda = {
        id: vendas.length + 1,
        produto: req.body.produto,
        quantidade: req.body.quantidade,
        preco: req.body.preco
    };
    vendas.push(venda);
    res.status(201).json(venda);
});

// Update a sale
router.put('/:id', (req, res) => {
    const venda = vendas.find(v => v.id === parseInt(req.params.id));
    if (!venda) return res.status(404).send('Sale not found');

    venda.produto = req.body.produto;
    venda.quantidade = req.body.quantidade;
    venda.preco = req.body.preco;
    res.json(venda);
});

// Delete a sale
router.delete('/:id', (req, res) => {
    const vendaIndex = vendas.findIndex(v => v.id === parseInt(req.params.id));
    if (vendaIndex === -1) return res.status(404).send('Sale not found');

    vendas.splice(vendaIndex, 1);
    res.status(204).send();
});

module.exports = router;