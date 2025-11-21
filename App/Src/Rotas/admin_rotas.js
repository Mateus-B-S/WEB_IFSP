//possui rotas em admin, animal, responsavel, adocao, exame medico e veterinario

const express = require('express');
const router = express.Router();
const path = require('path');

// garantir que o corpo das requisições POST seja parseado (form HTML e JSON)
router.use(express.urlencoded({ extended: true }));
router.use(express.json());

const adminControle = require('../Controles/admin_controle');

// Rota para login do administrador
router.post('/', adminControle.loginAdmin);

//logout
router.get('/logout', adminControle.logoutAdmin);

module.exports = router;