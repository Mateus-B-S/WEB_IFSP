const express = require('express');
const session  = require('express-session');
const app = express();

const methodOverride = require('method-override');
app.use(methodOverride('_method'));

const path = require('path');
app.use(express.static(path.join(__dirname, 'Front_End/Publico')));

app.use(session({
 secret: 'chave-secreta-bem-dificil', // usada para assinar o ID da sessão
 resave: false,
 saveUninitialized: true,
 cookie: { maxAge: 60000 } // duração da sessão (1 min)
}));


// Configurando middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Configurando EJS como motor de visualização
app.set("view engine", "ejs");
app.set("views", __dirname + "/Front_End/Views");

app.use('Scripts', express.static(path.join(__dirname, 'Front_End/Publico/Scripts')));
const rotaInicial = require('./Rotas/rota_inicial');
app.use('/', rotaInicial);

const vetRotas = require('./Rotas/vet_rotas');
app.use('/veterinario', vetRotas);

const responsavelRotas = require('./Rotas/responsavel_rotas');
app.use('/responsavel', responsavelRotas);

const adminRotas = require('./Rotas/admin_rotas');
app.use('/admin', adminRotas);

const animalRotas =  require('./Rotas/animal_rotas');
app.use('/animal', animalRotas);

const exameRotas = require('./Rotas/exame_rotas');
app.use('/exame', exameRotas);

const adocaoRotas = require('./Rotas/adocao_rotas');
app.use('/adocao', adocaoRotas);


module.exports = app;