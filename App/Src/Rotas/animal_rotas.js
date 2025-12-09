const express = require('express');
const router = express.Router();
const path = require('path');
const permitidos = require(path.join(__dirname, '../Segurança/autorizacao'));
const animalControle = require('../Controles/animal_controle');


router.get("/buscarPorId", animalControle.getAnimalPorId);

// criar e editar o veterinario, mas aqui tá sem ser por id
router.post('/criar', permitidos('veterinario', 'admin'), animalControle.criarAnimal);
router.put('/editar', permitidos('veterinario', 'admin'), animalControle.editarAnimal);
router.delete('/deletar', permitidos('admin'), animalControle.deletarAnimal);
router.put('/devolver', permitidos('responsavel', 'admin'), animalControle.devolverAnimal);

module.exports = router;
