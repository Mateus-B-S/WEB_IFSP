const express = require('express');
const path = require('path');
const router = express.Router();


const rotaInicial = (req, res) => {
    res.sendFile(path.join(__dirname, '../Front_end/Publico/inicial.html'));
};

const SobreNos = (req, res) => {
    res.render('Sobre/index.ejs');
};
router.get('/', rotaInicial);
router.get('/SobreNos', SobreNos);
module.exports = router;
