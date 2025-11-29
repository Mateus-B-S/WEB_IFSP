const express = require('express');
const router = express.Router();
const path = require('path');
const permitidos = require(path.join(__dirname, '../Segurança/autorizacao'));
const adocaoControle = require('../Controles/adocao_controle');

// LISTAR TODAS AS ADOÇÕES
router.get('/', permitidos('admin', 'veterinario'), adocaoControle.listar);

// LISTAR ADOÇÕES POR RESPONSÁVEL
router.post('/listarPorResponsavel', 
    permitidos('admin', 'veterinario'), 
    adocaoControle.listarAdocoesPorResponsavel
);

// BUSCAR POR ID
router.get('/:id', permitidos('admin', 'veterinario'), adocaoControle.buscarPorId);

// CRIAR ADOÇÃO
router.post('/adotarAnimal', adocaoControle.criar);

// ATUALIZAR
router.put('/:id', permitidos('admin'), adocaoControle.atualizar);

// DELETAR
router.delete('/:id', permitidos('admin'), adocaoControle.deletar);

module.exports = router;
