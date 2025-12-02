
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

const getTodosAnimais = () => Animal.findAll();
const animaisdisponiveis = () => Animal.findAll({ where: { adotado: false } });
const criarAnimal = (params) => Animal.create(params);
const getAnimalId = (id) => Animal.findByPk(id);
const mudarAnimal = (id, params) => {
    return Animal.update(params, { where: { id: id } });
};
const deleteAnimal = (id) => {
    return Animal.destroy({ where: { id: id } });
};

module.exports = {
  Animal, 
  getTodosAnimais, 
  criarAnimal, getAnimalId,
  mudarAnimal, 
  deleteAnimal, 
  animaisdisponiveis
};
