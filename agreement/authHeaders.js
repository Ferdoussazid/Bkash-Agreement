const globalStorage = require('node-global-storage');
const tokenHeaders = require('./tokenHeaders.js');
const grantToken = require('./grantToken.js');

const authHeaders = async () => {
    const token = await grantToken();  // Ensure you have a valid token
    return {
        ...tokenHeaders(),
        Authorization: `Bearer ${token}`
    };
};

module.exports = authHeaders;
