
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

module.exports = Animal;
