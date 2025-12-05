const express = require('express');
const router = express.Router();
const path = require('path');
const permitidos = require(path.join(__dirname, '../Segurança/autorizacao'));
const adocaoControle = require('../Controles/adocao_controle');

// listar por responsavel
router.post('/listarPorResponsavel', permitidos('admin', 'veterinario'), adocaoControle.listarAdocoesPorResponsavel);

// aq ele cria
router.post('/adotarAnimal', adocaoControle.criarAdocao);

// devolver (atualizar)





module.exports = router;
