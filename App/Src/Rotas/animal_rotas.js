const animalControle = require('../Controles/animal_controle');

const express = require('express');
const router = express.Router();

router.get('/', animalControle.getTodosAnimais);
router.get('/buscar/id', animalControle.getAnimalPorId);
/* só para admins ou veterinarios
router.post('/criar', animalControle.criarAnimal);
router.put('/editar', animalControle.editarAnimal);
*/

module.exports = router;