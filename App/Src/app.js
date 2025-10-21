const express = require('express');

const app = express();

//const methodOverride = require('method-override');
//app.use(methodOverride('_method'));

const path = require('path');
app.use(express.static(path.join(__dirname, './Front_End/Publico')));


// Configurando middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));


// Configurando EJS como motor de visualização
app.set("view engine", "ejs");
app.set("views", __dirname + "/Front_End");


const vetRotas = require('./Rotas/vet_rotas');
app.use('/veterinario', vetRotas);
// Importando e usando as rotas de tarefas e usuarios
//const userRoutes = require('./routes/user_routes');
//app.use('/', userRoutes);
//const tarefasRoutes = require('./routes/tarefas_routes');
//app.use('/paginaInicialTarefas', tarefasRoutes);

module.exports = app;