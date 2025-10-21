const express = require('express');
const router = express.Router();


const rotaInicial = (req, res => {
    res.send('../Front_end/Publico/inicial.html');
})
router.get('/', rotaInicial);

module.exports = router;
