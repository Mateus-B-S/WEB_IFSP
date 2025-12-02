const express = require('express');
const router = express.Router();
const path = require('path');
const permitidos = require(path.join(__dirname, '../Segurança/autorizacao'));
const adocaoControle = require('../Controles/adocao_controle');

// lista tds as adoções
router.get('/', permitidos('admin', 'veterinario'), adocaoControle.listar);

// listar por responsavel
router.post('/listarPorResponsavel', permitidos('admin', 'veterinario'), adocaoControle.listarAdocoesPorResponsavel);

// busca pelo id
router.get('/:id', permitidos('admin', 'veterinario'), adocaoControle.buscarPorId);

// aq ele cria
router.post('/adotarAnimal', adocaoControle.criarAdocao);

// devolver (atualizar)
router.put('/:id', permitidos('admin'), adocaoControle.atualizar);

// exclui
router.delete('/:id', permitidos('admin'), adocaoControle.deletar);

module.exports = router;
