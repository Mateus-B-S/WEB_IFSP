const { DataTypes } = require('sequelize');
const sequelize = require('../Banco_dados/connection');

// import dos outros models
const Animal = require('./animal_modelo');
const Responsavel = require('./responsavel_modelo');

const Adocao = sequelize.define('adocao', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  data_adocao: {
    type: DataTypes.DATEONLY,
    allowNull: false
  }
}, {
  tableName: 'adocoes',
  timestamps: false
});

// exporta o model primeiro
module.exports = Adocao;


Animal.hasOne(Adocao, { foreignKey: 'animal_id' });
Adocao.belongsTo(Animal, { foreignKey: 'animal_id' });


Responsavel.hasMany(Adocao, { foreignKey: 'responsavel_id' });
Adocao.belongsTo(Responsavel, { foreignKey: 'responsavel_id' });


//a função é essa, mas não sei bem o que fazer com o resto vei