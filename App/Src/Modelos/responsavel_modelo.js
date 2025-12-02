


const { DataTypes } = require('sequelize');
const sequelize = require('../Banco_dados/connection');

const Responsavel = sequelize.define('responsavel', {
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

const getTodosResponsaveis = () => Responsavel.findAll();
const criarResponsavel = (params) => Responsavel.create(params);
const getResponsavelId = (id) => Responsavel.find(r => r.id === id);
const editarResponsavel = (id, params) => {
    return Responsavel.update(params, { where: { id: id } });
};
const deleteResponsavel = (id) => {
    return Responsavel.destroy({ where: { id: id } });
};

module.exports = {
  Responsavel,
  getTodosResponsaveis,
  criarResponsavel,
  getResponsavelId,
  editarResponsavel,
  deleteResponsavel
};
