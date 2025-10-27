const vetControle = require('../Controles/vet_controle');
//veterinario pode mexer nos exames e ver os animais
const animalControle = require('../Controles/animal_controle');
const examecontrole = require('../Controles/exame_controle');

const express = require('express');
const router = express.Router();

router.get('/', vetControle.loginVet);
router.get('/todos', vetControle.getTodosVets);
router.get('/buscar/id', vetControle.getVetPorId);


//rotas para animais (editar e criar)
router.post('/animal/criar', animalControle.criarAnimal);
router.put('/animal/editar', animalControle.editarAnimal);


//rota para exames  (criar, listar e listar por vet)
router.post('/exame/criar', examecontrole.criarExame);
router.get('/exame/listar', examecontrole.listarExames);
router.get('/exame/listarporvet', examecontrole.listarExamesPorVet);

module.exports = router;