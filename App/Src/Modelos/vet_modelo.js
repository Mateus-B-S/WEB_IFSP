const { DataTypes } = require('sequelize');
const sequelize = require('../Banco_dados/connection');
const cripto = require('bcrypt');



const Veterinario = sequelize.define('veterinario', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false

  },
  formacao: {
    type: DataTypes.STRING,
    allowNull: false
  },
  prontuario: {
    type: DataTypes.STRING,
    defaultValue: '',
    unique: true
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
    select: false
  }
}, {
  tableName: 'veterinarios',
  timestamps: false
});

const getTodosvets = () => Veterinario.findAll({ raw: true });
const getProntuarioVet = (prontuario) => Veterinario.findAll({ where: { prontuario: prontuario }, raw: true });
const getVetsId = (id) => Veterinario.findByPk(id , { raw: true });

const mudarVet = async (id, params) => {
  const senha_cripto = await cripto.hash(params.senha, 8);
  params.senha = senha_cripto;
  return Veterinario.update(params, { where: { id: id }, raw: true });
};

const criarVet = async (params) => {
  const senha_cripto = await cripto.hash(params.senha, 8);
  params.senha = senha_cripto;
  return Veterinario.create(params, { raw: true });
};

const deleteVet = (id) =>  Veterinario.destroy({where:{id: id} });

const validacao = (senha, hash) => {
  return cripto.compare(senha, hash);
};

module.exports = { 
  Veterinario,
  getTodosvets,
  getProntuarioVet,
  getVetsId,
  criarVet,
  mudarVet,
  deleteVet,
  validacao
};
