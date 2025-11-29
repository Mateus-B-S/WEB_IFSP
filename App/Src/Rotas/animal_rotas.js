const express = require('express');
const router = express.Router();
const path = require('path');
const permitidos = require(path.join(__dirname, '../Segurança/autorizacao'));
const animalControle = require('../Controles/animal_controle');

// LISTAR TODOS
router.get('/animais_disponiveis', animalControle.listarAnimais);

// BUSCAR POR ID (SEM PERMISSÃO)
router.get('/buscar_animal_por_id/:id', animalControle.buscarAnimalPorId);

// VETERINÁRIO – criar e editar
router.post('/criar', permitidos('veterinario'), animalControle.criarAnimal);
router.put('/editar/:id', permitidos('veterinario'), animalControle.atualizarAnimal);

// ADMIN – pode tudo
router.post('/adicionarAnimal', permitidos('admin'), animalControle.criarAnimal);
router.put('/atualizarAnimal/:id', permitidos('admin'), animalControle.atualizarAnimal);
router.get('/buscarPorId/:id', permitidos('admin'), animalControle.buscarAnimalPorId);

module.exports = router;
