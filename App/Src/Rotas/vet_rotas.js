const vetControle = require('../Controles/vet_controle');

const express = require('express');
const router = express.Router();

router.get('/', vetControle.loginVet);
router.get('/todos', vetControle.getTodosVets);
router.get('buscar/id', vetControle.getVetPorId);
/* só para admins 
router.post('/criar', vetControle.criarVet);
router.put('/editar', vetControle.editarVet);
router.delete('/deletar/id', vetControle.deletarVet);
*/
module.exports = router;