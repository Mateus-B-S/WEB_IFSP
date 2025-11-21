//possui rotas em admin, animal, responsavel, adocao, exame medico e veterinario

const express = require('express');
const router = express.Router();
const path = require('path');


const adminControle = require('../Controles/admin_controle');

// Rota para login do administrador
router.post('/', adminControle.loginAdmin);

//logout
router.get('/logout', adminControle.logoutAdmin);

module.exports = router;