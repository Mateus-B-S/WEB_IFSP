


const { DataTypes } = require('sequelize');
const sequelize = require('../Banco_dados/connection');
const bcrypt = require('bcrypt');

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
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'responsaveis',
  timestamps: false,
  hooks: {
      beforeCreate: async (responsavel) => {
        const salt = await bcrypt.genSalt(10);
        responsavel.senha = await bcrypt.hash(responsavel.senha, salt);
      },
      beforeUpdate: async (responsavel) => {
        if (responsavel.changed('senha')) {
          const salt = await bcrypt.genSalt(10);
          responsavel.senha = await bcrypt.hash(responsavel.senha, salt);
        }
      }
    }
});

const getTodosResponsaveis = () => Responsavel.findAll({ raw: true });
const criarResponsavel = (params) => 
  Responsavel.create( params );
const getResponsavelId = (id) => Responsavel.findOne({ where: { id: id }, raw: true });
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
