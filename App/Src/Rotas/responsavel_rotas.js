const responsavelControle = require('../Controles/responsavel_controle');

const express = require('express');
const router = express.Router();
const path = require('path');
const permitidos = require(path.join(__dirname, '../Segurança/autorizacao'));

// LOGIN
router.get('/login', responsavelControle.loginResponsavel);

// CRUD
router.get('/todos', responsavelControle.listarResponsaveis);
router.get('/:id', responsavelControle.buscarResponsavelPorId);
router.post('/criar', responsavelControle.criarResponsavel);
router.put('/editar/:id', responsavelControle.atualizarResponsavel);
router.delete('/deletar/:id', responsavelControle.deletarResponsavel);

// ADMIN
router.get('/admin/:id', permitidos('admin'), responsavelControle.buscarResponsavelPorId);

module.exports = router;
