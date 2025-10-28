//possui rotas em admin, animal, responsavel, adocao, exame medico e veterinario

const express = require('express');
const router = express.Router();
const adminControle = require('../Controles/admin_controle');
const animalControle = require('../Controles/animal_controle');
const adocaoControle = require('../Controles/adocao_controle');
const exameControle = require('../Controles/exame_controle');
const vetControle = require('../Controles/vet_controle');
const responsavelControle = require('../Controles/responsavel_controle');

// Rota para login do administrador
router.post('/login', adminControle.loginAdmin);

// Rotas para administração de animais
router.post('/animal/adicionarAnimal', animalControle.criarAnimal);
router.put('/animal/atualizarAnimal', animalControle.editarAnimal);
router.get('/animal/listarTodosAnimais', animalControle.getTodosAnimais);
router.get('/animal/buscarPorId', animalControle.getAnimalPorId);

// Rotas para administração de responsáveis
router.post('/resp/listarResponsaveis', responsavelControle.getTodosResponsaveis);
router.post('/resp/responsavelPorId', responsavelControle.getResponsavelPorId);

//Rotas para adocao
router.post('/adocao/listarPorResponsavel', adocaoControle.listarAdocoesPorResponsavel);

// Rotas para administração de veterinários
router.post('/vet/criarVet', vetControle.criarVet);
router.put('/vet/editarVet', vetControle.editarVet);
router.delete('/vet/deletarVet', vetControle.deletarVet);
router.get('/vet/listarVets', vetControle.getTodosVets);

// Rotas para administração de exames médicos
router.post('/exame/criarExame', exameControle.criarExame);
router.post('/exame/listarExames', exameControle.listarExames);
router.post('/exame/listarPorVet', exameControle.listarExamesPorVet);



module.exports = router;