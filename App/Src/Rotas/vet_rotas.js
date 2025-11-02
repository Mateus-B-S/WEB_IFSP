const vetControle = require('../Controles/vet_controle');
//veterinario pode mexer nos exames e ver os animais
const animalControle = require('../Controles/animal_controle');
const examecontrole = require('../Controles/exame_controle');

const express = require('express');
const router = express.Router();
const path = require('path');
const permitidos = require(path.join(__dirname, '../Segurança/autorizacao'));

router.post('/', vetControle.loginVet);
router.get('/todos', vetControle.getTodosVets);
router.get('/buscar/id', vetControle.getVetPorId);



// Rotas para administração de veterinários
router.post('/criarVet', permitidos('admin'), vetControle.criarVet);
router.put('/editarVet', permitidos('admin'), vetControle.editarVet);
router.delete('/deletarVet', permitidos('admin'), vetControle.deletarVet);
router.get('/listarVets', permitidos('admin'), vetControle.getTodosVets);

//logout
router.get('/logout', vetControle.logoutVet);

module.exports = router;