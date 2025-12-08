const { DataTypes } = require('sequelize');
const sequelize = require('../Banco_dados/connection');


const Veterinario = sequelize.define('veterinario', {
  id: {
    type: DataTypes.INTEGER,
    //primaryKey: true,
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
    primaryKey: true
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  }
}, {
  tableName: 'veterinarios',
  timestamps: false
});

const getTodosvets = () => Veterinario.findAll({ raw: true });
const getProntuarioVet = (prontuario) => Veterinario.findAll({ where: { prontuario: prontuario }, raw: true });
const getVetsId = (id) => Veterinario.findByPk(id , { raw: true });
const criarVet = (params) => Veterinario.create(params, { raw: true });
const mudarVet = (id, params) => Veterinario.update(params, {where: {id: id}, raw: true});
const deleteVet = (id) =>  Veterinario.destroy({where:{id: id}, raw: true});

module.exports = { 
  Veterinario,
  getTodosvets,
  getProntuarioVet,
  getVetsId,
  criarVet,
  mudarVet,
  deleteVet
};
