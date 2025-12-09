//possui rotas em admin, animal, responsavel, adocao, exame medico e veterinario

const express = require('express');
const router = express.Router();
const path = require('path');
permitidos = require(path.join(__dirname, '../Segurança/autorizacao'));


const adminControle = require('../Controles/admin_controle');

// rota para login do administrador
router.post('/', adminControle.perfilAdmin);

//logout
router.get('/logout', adminControle.logoutAdmin);

router.get('/login', adminControle.loginAdmin);

module.exports = router;