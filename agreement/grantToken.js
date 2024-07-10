const axios = require('axios');
const bkashConfig = require("../config/bkashConfig.json");
const tokenHeaders = require("./tokenHeaders.js");

let storedToken = null;
let tokenExpiryTime = null;

const grantToken = async (amount) => {
    try {
        const response = await axios.post(bkashConfig.grant_token_url, {
            'app_key': bkashConfig.app_key,
            'app_secret': bkashConfig.app_secret,
            'amount': amount // Pass the amount to the API
        }, {
            headers: tokenHeaders(),
        });

        storedToken = response.data.id_token;
        tokenExpiryTime = Date.now() + 3600 * 1000;
        return storedToken;
    } catch (error) {
        console.error('Failed to get grant token:', error.response ? error.response.data : error.message);
        throw new Error('Failed to get grant token');
    }
};

module.exports = grantToken;
