const express = require('express');
const router = express.Router();

// Sample data for products
let products = [];

// Get all products
router.get('/', (req, res) => {
    res.json(products);
});

// Get a product by ID
router.get('/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found');
    res.json(product);
});

// Create a new product
router.post('/', (req, res) => {
    const product = {
        id: products.length + 1,
        name: req.body.name,
        price: req.body.price,
        description: req.body.description
    };
    products.push(product);
    res.status(201).json(product);
});

// Update a product by ID
router.put('/:id', (req, res) => {
    const product = products.find(p => p.id === parseInt(req.params.id));
    if (!product) return res.status(404).send('Product not found');

    product.name = req.body.name;
    product.price = req.body.price;
    product.description = req.body.description;
    res.json(product);
});

// Delete a product by ID
router.delete('/:id', (req, res) => {
    const productIndex = products.findIndex(p => p.id === parseInt(req.params.id));
    if (productIndex === -1) return res.status(404).send('Product not found');

    products.splice(productIndex, 1);
    res.status(204).send();
});

module.exports = router;