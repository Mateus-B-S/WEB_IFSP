const express = require('express');
const path = require('path');
const router = express.Router();


const rotaInicial = (req, res) => {
    res.sendFile(path.join(__dirname, '../Front_end/Publico/inicial.html'));
};
router.get('/', rotaInicial);

module.exports = router;
