"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
// Basic GET route
router.get('/', (req, res) => {
    res.json({ message: 'Welcome to the API' });
});
// GET route with parameters
router.get('/users/:id', (req, res) => {
    const userId = req.params.id;
    res.json({ userId });
});
router.post('/users', (req, res) => {
    const userData = req.body;
    // Handle user creation
    res.json({ message: 'User created', userData });
});
// PUT route with query parameters
router.put('/users', (req, res) => {
    const { id } = req.query;
    const updateData = req.body;
    res.json({ message: 'User updated', id, updateData });
});
// DELETE route
router.delete('/users/:id', (req, res) => {
    const userId = req.params.id;
    res.json({ message: 'User deleted', userId });
});
exports.default = router;
