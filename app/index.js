const express = require('express');
const Blockchain = require('../blockchain');

const HTTP_PORT = process.env.HTTP_PORT || 80;

const app = express();
const bc = new Blockchain();

app.get('/blocks', function(req, res) {
    res.json(bc.chain);
});

app.listen(HTTP_PORT, function() {
    console.log(`Listening on port ${HTTP_PORT}`);
});