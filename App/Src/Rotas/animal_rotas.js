const express = require('express');
const router = express.Router();
const path = require('path');
const permitidos = require(path.join(__dirname, '../Segurança/autorizacao'));
const animalControle = require('../Controles/animal_controle');


router.get('/animais_disponiveis', animalControle.animaisdisponiveis);
router.get('/buscar_animal_por_id', animalControle.getAnimalPorId);

//rotas para animais (editar e criar) veterinario
router.post('/criar',permitidos('veterinario'),  animalControle.criarAnimal);
router.put('/editar', permitidos('veterinario'), animalControle.editarAnimal);


// Rotas para administração de animais
router.post('/adicionarAnimal', permitidos('admin'), animalControle.criarAnimal);
router.put('/atualizarAnimal', permitidos('admin'), animalControle.editarAnimal);
router.get('/listarTodosAnimais',permitidos('admin'), animalControle.getTodosAnimais);
router.get('/buscarPorId', permitidos('admin'), animalControle.getAnimalPorId);

module.exports = router;