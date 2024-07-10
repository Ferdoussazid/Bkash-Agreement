const express = require('express');
const router = express.Router();
const grantToken = require('./grantToken.js');

router.post('/grant-token', async (req, res) => {
    const { amount } = req.body;

    if (!amount) {
        return res.status(400).json({ message: 'Amount is required' });
    }

    try {
        const token = await grantToken(amount);
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Failed to grant token' });
    }
});

module.exports = router;
