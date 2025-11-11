const express = require('express');
const router = express.Router();
const path = require('path');
const permitidos = require(path.join(__dirname, '../Segurança/autorizacao'));
const exameControle = require('../Controles/exame_controle');

router.post('/criar', permitidos('admin', 'veterinario'), exameControle.criarExame);
router.get('/listar', permitidos('admin', 'veterinario'), exameControle.listarExames); //apagar qnd fazer a pagina do vet
router.get('/listarporvet', permitidos('admin', 'veterinario'), exameControle.listarExamesPorVet);

// Rotas para administração de exames médicos
router.post('/criarExame', permitidos('admin', 'veterinario'), exameControle.criarExame);
router.post('/listarPorVet', permitidos('admin'), exameControle.listarExamesPorVet);

module.exports = router;
