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
veterinario.hasMany(Exame, { foreignKey: 'prontuario_vet' });

module.exports = Exame;

