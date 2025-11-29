// Modelos/exame_modelo.js
const { DataTypes } = require('sequelize');
const sequelize = require('../Banco_dados/connection');

const Animal = require('./animal_modelo');
const Veterinario = require('./vet_modelo');

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
Exame.belongsTo(Animal, { foreignKey: 'id_animal' });
Animal.hasMany(Exame, { foreignKey: 'id_animal' });

Exame.belongsTo(Veterinario, { foreignKey: 'prontuario_vet' });
Veterinario.hasMany(Exame, { foreignKey: 'prontuario_vet' });

module.exports = Exame;

//const { DataTypes } = require('sequelize');
//const sequelize = require('../config/db');
//const prontuario_vet = require('./vet');
//const id_animal  = require('./animal')


//const exames = sequelize.define('Exames', {
  //id: {
    //type: DataTypes.INTEGER,
    //primaryKey: true,
    //autoIncrement: true
 // },
  //data_exame: {
    //type: DataTypes.DATEONLY,
    //allowNull: false
 // }

  //observacoes: {
    //type: DataTypes.STRING,
    //allowNull: false
 // }

//}, {
  //tableName: 'exame',
  //timestamps: false
//});

//module.exports = exame;

//Animal.hasOne(Adocao, { foreignKey: 'id_animal' });
//Adocao.belongsTo(Animal, { foreignKey: 'id_animal' });

//Veterinario.hasMany(Exames, { foreignKey: 'prontuario_vet' });
//Exames.belongsTo(Veterinario, { foreignKey: 'prontuario_vet' });
