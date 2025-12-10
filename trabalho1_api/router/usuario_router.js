const express = require('express');
const router = express.Router();

// Get all users
router.get('/', (req, res) => {
    res.send('List of users');
});

// Get a user by ID
router.get('/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`User details for user with ID: ${userId}`);
});

// Create a new user
router.post('/', (req, res) => {
    const newUser = req.body;
    res.status(201).send(`User created with details: ${JSON.stringify(newUser)}`);
});

// Update a user by ID
router.put('/:id', (req, res) => {
    const userId = req.params.id;
    const updatedUser = req.body;
    res.send(`User with ID: ${userId} updated with details: ${JSON.stringify(updatedUser)}`);
});

// Delete a user by ID
router.delete('/:id', (req, res) => {
    const userId = req.params.id;
    res.send(`User with ID: ${userId} deleted`);
});

module.exports = router;