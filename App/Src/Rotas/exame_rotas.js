const express = require('express');
const exameControle = require('../Controles/exame_controle');
const router = express.Router();
const path = require('path');
const permitidos = require(path.join(__dirname, '../Segurança/autorizacao'));


// rotas para administração de exames médicos
router.post('/criarExame', permitidos('admin', 'veterinario'), exameControle.criarExame);
router.post('/listarPorVet', permitidos('admin'), exameControle.listarExamesPorVet); //tem q apagar um desses
//router.delete('/deletarExame', permitidos('admin'), exameControle.deletarExame);
//router.put('/mudarExame', permitidos('admin'), exameControle.atualizarExame);

module.exports = router;
