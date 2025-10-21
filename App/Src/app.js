const express = require('express');

const app = express();

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const path = require('path');
app.use(express.static(path.join(__dirname, './Front_End/Publico')));


// Configurando middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Configurando EJS como motor de visualização
app.set("view engine", "ejs");
app.set("views", __dirname + "/Front_End");


const rotaInicial = require('./Rotas/rota_inicial');
app.use('/', rotaInicial);

const vetRotas = require('./Rotas/vet_rotas');
app.use('/veterinario', vetRotas);

const responsavelRotas = require('./Rotas/responsavel_rotas');
app.use('/responsavel', responsavelRotas);

const animalRotas = require('./Rotas/animal_rotas');
app.use('/animais', animalRotas);



module.exports = app;