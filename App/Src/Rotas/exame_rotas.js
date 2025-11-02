const express = require('express');
const router = express.Router();
const path = require('path');
const permitidos = require(path.join(__dirname, '../Segurança/autorizacao'));
const exameControle = require('../Controles/exame_controle');

router.post('/criar', permitidos('admin', 'veterinario'), exameControle.criarExame);
router.get('/listar', permitidos('admin', 'veterinario'), exameControle.listarExames);
router.get('/listarporvet',permitidos('admin', 'veterinario'), exameControle.listarExamesPorVet);

// Rotas para administração de exames médicos
router.post('/criarExame', permitidos('admin'), exameControle.criarExame);
router.post('/listarExames', permitidos('admin'), exameControle.listarExames);
router.post('/listarPorVet', permitidos('admin'), exameControle.listarExamesPorVet);

module.exports = router;
