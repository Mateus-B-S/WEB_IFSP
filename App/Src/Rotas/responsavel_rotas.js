const responsavelControle = require('../Controles/responsavel_controle');



const express = require('express');
const router = express.Router();
const path = require('path');
const permitidos = require(path.join(__dirname, '../Segurança/autorizacao'));

router.post('/', responsavelControle.loginResponsavel);
router.post('/criar', responsavelControle.criarResponsavel);
router.put('/editar', responsavelControle.editarResponsavel);


// Rotas para administração de responsáveis

router.post('/responsavelPorId', permitidos('admin'), responsavelControle.getResponsavelPorId);

//logout
router.get('/logout', responsavelControle.logoutResp);

module.exports = router;