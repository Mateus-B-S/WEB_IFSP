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

  prontuario_vet: {
    type: DataTypes.STRING(6),
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

Exame.belongsTo(veterinario, { foreignKey: 'prontuario_vet' });
veterinario.hasMany(Exame, { foreignKey: 'prontuario_vet'});

const getTodosExames = () => Exame.findAll({ 
  include:[
    { model: animal, attributes: ['nome', 'raca'] },
    { model: veterinario, attributes: ['nome'] }
  ], raw: true });

const criarExameMedico = (params) => Exame.create(params);

const atualizarExame = async(id, params) => {
  await Exame.update(params, { where: { id: id }});
};

const deleteExame = async(id) => {
  await Exame.destroy({ where: { id: id }, raw: true });
};

const deleteExameporAnimal = async(id_animal) => {
  await Exame.destroy({ where: { id_animal: id_animal }, raw: true });
};

const getExamesPorVet = (prontuario_vet) => {
  return Exame.findAll({ where: { prontuario_vet: prontuario_vet }, raw: true });
};


module.exports = {
  Exame,
  getTodosExames,
  criarExameMedico,
  atualizarExame,
  deleteExame,
  getExamesPorVet,
  deleteExameporAnimal
  }; 

