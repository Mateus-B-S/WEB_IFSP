const responsavelControle = require('../Controles/responsavel_controle');

const express = require('express');
const router = express.Router();

router.get('/', responsavelControle.loginResponsavel);
/* só admin pode acessar
router.get('/todos', responsavelControle.getTodosResponsaveis);
router.get('buscar/id', responsavelControle.getResponsavelPorId);
*/
router.post('/criar', responsavelControle.criarResponsavel);
router.put('/editar', responsavelControle.editarResponsavel);


module.exports = router;