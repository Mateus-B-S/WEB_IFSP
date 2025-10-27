const responsavelControle = require('../Controles/responsavel_controle');

//pode ver animais disponíveis e criar conta
const animalControle = require('../Controles/animal_controle');

const express = require('express');
const router = express.Router();

router.get('/', responsavelControle.loginResponsavel);
router.post('/criar', responsavelControle.criarResponsavel);
router.put('/editar', responsavelControle.editarResponsavel);
router.get('/animais_disponiveis', animalControle.animaisdisponiveis);
router.get('/buscar_animal_por_id', animalControle.getAnimalPorId);


module.exports = router;