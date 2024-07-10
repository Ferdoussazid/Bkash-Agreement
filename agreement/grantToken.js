const axios = require('axios');
const bkashConfig = require("../config/bkashConfig.json");
const tokenHeaders = require("./tokenHeaders.js");
const globals = require("node-global-storage");

const grantToken = async () => {
    try {
        const response = await axios.post(bkashConfig.grant_token_url, {
            'app_key': bkashConfig.app_key,
            'app_secret': bkashConfig.app_secret
        }, {
            headers: tokenHeaders(),
        });

        const token = response.data.id_token;
        const expiryTime = Date.now() + 3600 * 1000;

        globals.set("id_token", token);
        globals.set("token_expiry_time", expiryTime);

        return token;
    } catch (error) {
        console.error('Failed to get grant token:', error.response ? error.response.data : error.message);
        throw new Error('Failed to get grant token');
    }
};

const getToken = async () => {
    const storedToken = globals.get("id_token");
    const tokenExpiryTime = globals.get("token_expiry_time");

    if (!storedToken || Date.now() > tokenExpiryTime) {
        return await grantToken();
    }
    return storedToken;
};

module.exports = { getToken, grantToken };
