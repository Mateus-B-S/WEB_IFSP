const express = require('express');
const router = express.Router();
const path = require('path');
const permitidos = require(path.join(__dirname, '../Segurança/autorizacao'));
const adocaoControle = require('../Controles/adocao_controle');


router.post('/listarPorResponsavel', adocaoControle.listarAdocoesPorResponsavel);



module.exports = router;