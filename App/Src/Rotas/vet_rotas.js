const vetControle = require('../Controles/vet_controle');

const express = require('express');
const router = express.Router();
const path = require('path');
const permitidos = require(path.join(__dirname, '../Segurança/autorizacao'));

router.post('/', vetControle.perfilVet);
router.get('/buscar/id', vetControle.getVetPorId);
router.get('/login', vetControle.loginVet);


// Rotas para administração de veterinários
router.post('/criarVet', permitidos('admin'), vetControle.criarVet);
router.put('/editarVet', permitidos('admin'), vetControle.editarVet);
router.delete('/deletarVet', permitidos('admin'), vetControle.deletarVet);

//logout
router.post('/logout', vetControle.logoutVet);

module.exports = router;

//aparentemente ok