


const { DataTypes } = require('sequelize');
const sequelize = require('../Banco_dados/connection');
const cripto = require('bcrypt');

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
    allowNull: false,
    unique: true
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
    select: false
  }
}, {
  tableName: 'responsaveis',
  timestamps: false
});

const getTodosResponsaveis = () => Responsavel.findAll({ raw: true });

const criarResponsavel =  async (params) => {
  const senha_cripto = await cripto.hash(params.senha, 8);
  params.senha = senha_cripto;
  return Responsavel.create(params);
};

const getResponsavelId = (id) => Responsavel.findOne({ where: { id: id }, raw: true });



const editarResponsavel = async (id, params) => {
  const senha_cripto = await cripto.hash(params.senha, 8);
  params.senha = senha_cripto;
  return Responsavel.update(params, { where: { id: id }, raw: true });
};
const deleteResponsavel = (id) => {
    return Responsavel.destroy({ where: { id: id }, raw: true });
};



module.exports = {
  Responsavel,
  getTodosResponsaveis,
  criarResponsavel,
  getResponsavelId,
  editarResponsavel,
  deleteResponsavel,
};