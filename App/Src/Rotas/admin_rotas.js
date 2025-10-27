//possui rotas em admin, animal, responsavel, adocao, exame medico e veterinario

const express = require('express');
const router = express.Router();
const adminControle = require('../Controles/admin_controle');
const animalControle = require('../Controles/animal_controle');
const adocaoControle = require('../Controles/adocao_controle');
const exameControle = require('../Controles/exame_controle');
const vetControle = require('../Controles/vet_controle');
const responsavelControle = require('../Controles/responsavel_controle');

// Rotas para administração de usuários
router.post('/loginAdmin', adminControle.loginAdmin);

// Rotas para administração de animais
router.post('/animal/adicionarAnimal', animalControle.criarAnimal);
router.put('/animal/atualizarAnimal', animalControle.editarAnimal);
router.get('/animal/listarTodosAnimais', animalControle.getTodosAnimais);
router.put('/animal/buscarPorId', animalControle.getAnimalPorId);

// Rotas para administração de responsáveis
router.get('/resp/listarResponsaveis', responsavelControle.getTodosResponsaveis);
router.put('/resp/responsavel_por_id', responsavelControle.getResponsavelPorId);

//Rotas para adocao
router.get('/adocao/listarporResponsavel', adocaoControle.listarAdocoesPorResponsavel);

// Rotas para administração de exames médicos
router.post('/exame/criarExame', exameControle.criarExame);
router.get('/exame/listarExames', exameControle.listarExames);
router.post('/exame/listarPorVet', exameControle.listarExamesPorVet);

// Rotas para administração de veterinários
router.post('/vet/criarVet', vetControle.criarVet);
router.put('/vet/editarVet', vetControle.editarVet);
router.delete('/vet/deletarVet', vetControle.deletarVet);

module.exports = router;