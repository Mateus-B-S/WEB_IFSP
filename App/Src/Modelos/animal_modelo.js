let animais = [
    { id:1 , nome: "Rex", raça: "Cachorro", tipo: "doméstico", adotado: 1},
    { id:2 , nome: "miau", raça: "Gato", tipo: "doméstico", adotado: 0},
    { id:3 , nome: "Nemo", raça: "Peixe", tipo: "aquático", adotado: 0}
];

//funções 





const  DataTypes = require('sequelize');
const sequelize = require('../Banco_dados/connection');
const animal = sequelize.define('animal', {
id: {
  type: DataTypes.INTEGER,
  primaryKey: true,
  autoIncrement: true
},
nome: {
  type: DataTypes.STRING,
   allowNull: false
},
raça: {
  type: DataTypes.STRING,
  allowNull: false
},
adotado: {
type: DataTypes.BOOLEAN,
defaultValue: false
}
}, 
{
  timestamp: false
});
animal.sync();

//sequelize.

const getTodosAnimais = () => animal.findAll();
const animaisdisponiveis = () => animal.findAll({ where: { adotado: true } });
const getAnimalId = (id) => animal.findbyPk(id);
const criarAnimal = (params) => animal.create(params);
const mudarAnimal = (id, params) => {
    return animal.update(params, { where: { id: id } });
};
const deleteAnimal = (id) => {
    return animal.destroy({ where: { id: id } });
};




module.exports = {
    animal,
    animaisdisponiveis,
    getTodosAnimais,
    getAnimalId,
    criarAnimal,
    mudarAnimal,
    deleteAnimal
};
