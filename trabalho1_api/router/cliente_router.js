const express = require('express');
const router = express.Router();

// Get all clients
router.get('/', (req, res) => {
    res.send('List of clients');
});

// Get a specific client by ID
router.get('/:id', (req, res) => {
    const clientId = req.params.id;
    res.send(`Client details for ID: ${clientId}`);
});

// Create a new client
router.post('/', (req, res) => {
    const newClient = req.body;
    res.status(201).send(`Client created: ${JSON.stringify(newClient)}`);
});

// Update an existing client by ID
router.put('/:id', (req, res) => {
    const clientId = req.params.id;
    const updatedClient = req.body;
    res.send(`Client with ID: ${clientId} updated with data: ${JSON.stringify(updatedClient)}`);
});

// Delete a client by ID
router.delete('/:id', (req, res) => {
    const clientId = req.params.id;
    res.send(`Client with ID: ${clientId} deleted`);
});

module.exports = router;