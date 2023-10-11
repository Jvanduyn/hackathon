const express = require('express');
const router = express.Router();
const { User, Employee } = require('../models/User');

router.get('/user', async (req, res) => {
    try {
        const users = await User.find({});
        console.log(users, ':)')
        res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error getting user data' });
    }
});

router.get('/employees', async (req, res) => {
    try {
        const employees = await Employee.find({});
        res.json(employees);
    } catch (error) {
        res.status(500).json({ error: 'Error getting employee data' });
    }
});

module.exports = router;