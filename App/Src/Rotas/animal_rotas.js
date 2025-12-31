const express = require('express');
const router = express.Router();
const path = require('path');
const permitidos = require(path.join(__dirname, '../Segurança/autorizacao'));
const upload = require(path.join(__dirname, '../Banco_dados/imagens')); //multer
const animalControle = require('../Controles/animal_controle');


router.get("/buscarPorId", animalControle.getAnimalPorId);

// criar e editar o veterinario, mas aqui tá sem ser por id
router.post('/criar', permitidos('veterinario', 'admin'), upload.single('imagem'), animalControle.criarAnimal);
router.put('/editar', permitidos('veterinario', 'admin'), upload.single('imagem'), animalControle.editarAnimal);
router.delete('/deletar', permitidos('admin'), animalControle.deletarAnimal);
router.put('/devolver', permitidos('responsavel', 'admin'), animalControle.devolverAnimal);
router.get('/:id', animalControle.mostrarDetalhesAnimal);

module.exports = router;
