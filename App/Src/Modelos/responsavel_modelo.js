


const { DataTypes } = require('sequelize');
const sequelize = require('../Banco_dados/connection');

const responsavel = sequelize.define('responsavel', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false

  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  }
  
}, {
  tableName: 'responsaveis',
  timestamps: false
});

module.exports = responsavel;
