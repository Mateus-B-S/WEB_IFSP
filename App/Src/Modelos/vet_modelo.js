const { DataTypes } = require('sequelize');
const sequelize = require('../Banco_dados/connection');


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
    primaryKey: true
  },

}, {
  tableName: 'veterinarios',
  timestamps: false
});

const getTodosvets = () => Veterinario.findAll();
const getProntuarioVet = (prontuario) => Veterinario.findAll({ where: { prontuario: prontuario }});
const getVetsId = (id) => Veterinario.findByPk(id);
const criarVet = (params) => Veterinario.create(params);
const mudarVet = (id, params) => Veterinario.update(params, {where: {id: id}});
const deleteVet = (id) =>  Veterinario.destroy({where:{id: id}})

module.exports = { 
  Veterinario,
  getTodosvets,
  getProntuarioVet,
  getVetsId,
  criarVet,
  mudarVet,
  deleteVet
};
