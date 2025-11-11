let animais = [
    { id:1 , nome: "Rex", raça: "Cachorro", tipo: "doméstico", adotado: 1},
    { id:2 , nome: "miau", raça: "Gato", tipo: "doméstico", adotado: 0},
    { id:3 , nome: "Nemo", raça: "Peixe", tipo: "aquático", adotado: 0}
];

//funções 
const getTodosAnimais = () => animais;
const animaisdisponiveis = () => animais.filter(a => a.adotado === 0);
const getAnimalId = (id) => animais.find(a => a.id === id);
const criarAnimal = (nome, raça, tipo) =>  {
 const newAnimal = {
 id: animais.length > 0 ? Math.max(...animais.map(a => a.id)) + 1 : 1,
    nome: nome,
    raça: raça,
    tipo: tipo,
    adotado: 0
 };
 animais.push(newAnimal);
 return newAnimal;
};

const mudarAnimal = (id, nome, raça, tipo, adotado) => {
    const animal = getAnimalId(id);
    if (animal) {
        animal.nome = nome ?? animal.nome;
        animal.raça = raça ?? animal.raça;
        animal.tipo = tipo ?? animal.tipo;
        animal.adotado = adotado ?? animal.adotado;
        return animal;
    }
    return null;
};

module.exports = {
    animais,
    animaisdisponiveis,
    getTodosAnimais,
    getAnimalId,
    criarAnimal,
    mudarAnimal
};


//const { DataTypes } = require('sequelize');
//const sequelize = require('../config/db');

//const animal = sequelize.define('animal', {
  //id: {
    //type: DataTypes.INTEGER,
    //primaryKey: true,
    //autoIncrement: true
  //},
  //nome: {
    //type: DataTypes.STRING,
   // allowNull: false

  //}
  //raça: {
   // type: DataTypes.STRING,
   // allowNull: false
  //}
  //adotado: {
    //type: DataTypes.BOOLEAN,
    //defaultValue: false
  //}


//}, {
 // tableName: 'animais',
  //timestamps: false
//});

//module.exports = animal;
