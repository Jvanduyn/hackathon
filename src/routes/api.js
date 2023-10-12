const express = require('express');
const router = express.Router();
const { call } = require('../dbController');

router.get('/login', async (req, res) => {
    try {
        const email = req.query.email;
        const password = req.query.password;
        
        call('findUser', {email: email, password: password}, (result) => {
            res.json(result.user)
        });
        // const users = await User.findOne({email: email, password: password});
        // res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error getting user data' });
    }
});

router.get('/logininfo', async (req, res) => {
    try {
        
        call('findUser', {email: email, password: password}, (result) => {
            res.json(result.user)
        });
        // const users = await User.findOne({email: email, password: password});
        // res.json(users);
    } catch (error) {
        res.status(500).json({ error: 'Error getting user data' });
    }
});

router.get('/employees', async (req, res) => {
    try {
        call('findallUsers', {}, (result) => {
            res.json(result.users)
        });
    } catch (error) {
        res.status(500).json({ error: 'Error getting employee data' });
    }
});

module.exports = router;