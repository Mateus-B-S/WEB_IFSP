
const { DataTypes } = require('sequelize');
const sequelize = require('../Banco_dados/connection');

const Animal = sequelize.define('animal', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false

  },

  raca: {
    type: DataTypes.STRING,
    allowNull: false
  },
  adotado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
}, {
  tableName: 'animais',
  timestamps: false
});

const getTodosAnimais = () => Animal.findAll({ raw: true });
const animaisdisponiveis = () => Animal.findAll({ where: { adotado: false }, raw: true });
const criarAnimal = (params) => Animal.create(params);
const getAnimalId = (id) => Animal.findByPk(id, { raw: true });
const devolverAnimal = (id) => {
    return Animal.update({ adotado: false }, { where: { id: id } });
};
const deleteAnimal = (id) => {
  // destroy retorna o número de linhas removidas (0 ou 1)
  return Animal.destroy({ where: { id: id } });
};
const editarAnimal = (id, params) => {
    return Animal.update(params, { where: { id: id }, raw: true });
};

module.exports = {
  Animal, 
  getTodosAnimais, 
  criarAnimal, getAnimalId,
  devolverAnimal, 
  deleteAnimal, 
  animaisdisponiveis,
  editarAnimal
};
