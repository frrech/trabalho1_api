const express = require('express');
const router = express.Router();

// Get all accounts
router.get('/', (req, res) => {
    res.send('List of accounts');
});

// Get a specific account by ID
router.get('/:id', (req, res) => {
    const { id } = req.params;
    res.send(`Account details for ID: ${id}`);
});

// Create a new account
router.post('/', (req, res) => {
    const newAccount = req.body;
    res.status(201).send(`Account created: ${JSON.stringify(newAccount)}`);
});

// Update an existing account by ID
router.put('/:id', (req, res) => {
    const { id } = req.params;
    const updatedAccount = req.body;
    res.send(`Account with ID: ${id} updated to: ${JSON.stringify(updatedAccount)}`);
});

// Delete an account by ID
router.delete('/:id', (req, res) => {
    const { id } = req.params;
    res.send(`Account with ID: ${id} deleted`);
});

module.exports = router;