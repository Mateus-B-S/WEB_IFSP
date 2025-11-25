const responsavelControle = require('../Controles/responsavel_controle');



const express = require('express');
const router = express.Router();
const path = require('path');
const permitidos = require(path.join(__dirname, '../Segurança/autorizacao'));

router.post('/', responsavelControle.perfilResponsavel);
router.post('/criar', responsavelControle.criarResponsavel);
router.put('/editar', responsavelControle.editarResponsavel);
router.get('/login', responsavelControle.loginResponsavel);


// Rotas para administração de responsáveis

router.post('/responsavelPorId', permitidos('admin'), responsavelControle.getResponsavelPorId);

//logout
router.post('/logout', responsavelControle.logoutResp);

module.exports = router;