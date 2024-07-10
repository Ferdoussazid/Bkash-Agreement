const axios = require('axios');
const bkashConfig = require("../config/bkashConfig.json");
const authHeaders = require('./authHeaders.js');

const createAgreement = async (amount) => {
    try {
        const headers = await authHeaders();
        const response = await axios.post(bkashConfig.create_agreement_url, {
            amount: amount
        }, {
            headers: headers,
        });

        return response.data;
    } catch (error) {
        console.error('Failed to create agreement:', error.response ? error.response.data : error.message);
        throw new Error('Failed to create agreement');
    }
};

module.exports = createAgreement;
