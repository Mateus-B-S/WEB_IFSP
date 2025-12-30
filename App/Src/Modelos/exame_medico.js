// Modelos/exame_modelo.js
const { DataTypes } = require('sequelize');
const sequelize = require('../Banco_dados/connection');

const animal = require('./animal_modelo').Animal;
const veterinario = require('./vet_modelo').Veterinario;

const Exame = sequelize.define('Exame', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  id_vet: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  id_animal: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },

  data_exame: {
    type: DataTypes.DATEONLY,
    allowNull: false
  },

  observacoes: {
    type: DataTypes.STRING,
    allowNull: true
  },
}, {
  tableName: 'exame',
  timestamps: false
});

// relacionamentooooos
Exame.belongsTo(animal, { foreignKey: 'id_animal' });
animal.hasMany(Exame, { foreignKey: 'id_animal' });

Exame.belongsTo(veterinario, { foreignKey: 'id_vet' });
veterinario.hasMany(Exame, { foreignKey: 'id_vet' });

const getTodosExames = () => Exame.findAll({
  include: [
    { model: animal, attributes: ['nome', 'raca'] },
    { model: veterinario, attributes: ['nome', 'prontuario'] }
  ],
  nest: true
});

const criarExameMedico = (params) => Exame.create(params);

const atualizarExame = async(id, params) => {
  await Exame.update(params, { where: { id: id }});
};

const deleteExame = async (id) => {
  return Exame.destroy({ where: { id: id } });
};

const deleteExameporAnimal = async (id_animal) => {
  return Exame.destroy({ where: { id_animal: id_animal } });
};

const getExamesPorVet = async (prontuario_vet) => {
  const vet = await veterinario.findOne({ where: { prontuario: prontuario_vet }, raw: true });
  if (!vet) return [];
  return Exame.findAll({ where: { id_vet: vet.id }, include: [
    { model: animal, attributes: ['nome', 'raca'] },
    { model: veterinario, attributes: ['nome', 'prontuario'] }
  ], nest: true });
};

const getExamesPorAnimal = async (nome_animal) => {
  const animal_exames = await animal.findOne({ where: { nome: nome_animal }, raw: true });
  if (!animal_exames) return [];
  return Exame.findAll({ where: { id_animal: animal_exames.id }, include: [
    { model: animal, attributes: ['nome', 'raca'] },
    { model: veterinario, attributes: ['nome', 'prontuario'] }
  ], nest: true });
};


module.exports = {
  Exame,
  getTodosExames,
  criarExameMedico,
  atualizarExame,
  deleteExame,
  getExamesPorVet,
  getExamesPorAnimal,
  deleteExameporAnimal
  }; 

