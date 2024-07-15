const express = require('express');
const router = express.Router();
const grantToken = require('./grantToken.js');
const createAgreement = require('./createAgreement.js');

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

router.post('/create-agreement', async (req, res) => {
    const { amount } = req.body;

    if (!amount) {
        return res.status(400).json({ message: 'Amount is required' });
    }

    try {
        const agreement = await createAgreement(amount);
        res.status(200).json({ agreement });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create agreement' });
    }
});

module.exports = router;
