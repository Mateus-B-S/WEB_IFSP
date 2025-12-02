const express = require('express');
const router = express.Router();
const path = require('path');
const permitidos = require(path.join(__dirname, '../Segurança/autorizacao'));
const animalControle = require('../Controles/animal_controle');


router.get("/animais_disponiveis", animalControle.animaisdisponiveis);
router.get("/buscar_animal_por_id", animalControle.getAnimalPorId);

// criar e editar o veterinario, mas aqui tá sem ser por id
router.post('/criar', permitidos('veterinario'), animalControle.criarAnimal);
router.put('/editar', permitidos('veterinario'), animalControle.editarAnimal);

// concessões pro adm e dar acesso a tudo
router.post('/adicionarAnimal', permitidos('admin'), animalControle.criarAnimal);
router.put('/atualizarAnimal', permitidos('admin'), animalControle.editarAnimal);
router.get('/buscarPorId/:id', permitidos('admin'), animalControle.getAnimalPorId);

module.exports = router;
