const express = require('express');
const exameControle = require('../Controles/exame_controle');
const router = express.Router();
const path = require('path');
const permitidos = require(path.join(__dirname, '../Segurança/autorizacao'));


router.get('/listarporvet', permitidos('admin', 'veterinario'), exameControle.listarExamesPorVet);

// Rotas para administração de exames médicos
router.post('/criarExame', permitidos('admin', 'veterinario'), exameControle.criarExame);
router.post('/listarPorVet', permitidos('admin'), exameControle.listarExamesPorVet);

module.exports = router;
