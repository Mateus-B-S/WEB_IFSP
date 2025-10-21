const controleAutor = require('../Controles/autor_controle');

const express = require('express');
const router = express.Router();


router.get('/autores', controleAutor.getTodosAutores);
router.get('/autores/id', controleAutor.getAutorId);

module.exports = router;