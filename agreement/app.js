const express = require('express');
const bodyParser = require('body-parser');
const bkashController = require('./bkashController.js');

const app = express();
const port = 3000;

app.use(bodyParser.json());
app.use('/api', bkashController);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
