const express = require('express');
const exameControle = require('../Controles/exame_controle');
const router = express.Router();
const path = require('path');
const permitidos = require(path.join(__dirname, '../Segurança/autorizacao'));


//router.get('/listarporvet', permitidos('admin', 'veterinario'), exameControle.listarExamesPorVet);

// rotas para administração de exames médicos
router.post('/criarExame', permitidos('admin', 'veterinario'), exameControle.criarExame);
router.post('/listarPorVet', permitidos('admin'), exameControle.listarExamesPorVet); //tem q apagar um desses
router.delete('/:id', permitidos('admin'), exameControle.deletarExame);
router.put('/:id', permitidos('admin'), exameControle.atualizarExame);
//ver se eu boto  busca por id tbm
module.exports = router;
