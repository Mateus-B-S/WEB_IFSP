const { DataTypes } = require('sequelize');
const sequelize = require('../Banco_dados/connection');

// import dos outros models
const animal = require('./animal_modelo').Animal;
const responsavel = require('./responsavel_modelo').Responsavel;

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

animal.hasOne(Adocao, { foreignKey: 'animal_id' });
Adocao.belongsTo(animal, { foreignKey: 'animal_id' });

responsavel.hasMany(Adocao, { foreignKey: 'responsavel_id' });
Adocao.belongsTo(responsavel, { foreignKey: 'responsavel_id' });

const getTodasAdocoes = () => Adocao.findAll();

const criarAdocao = (params) => Adocao.create(params);

const todasAdocoesdeumResponsavel = (responsavel_nome) => {
    return Adocao.findAll({ where: { responsavel_nome: responsavel_nome } });
};

const atualizarAdocao = async(id, params) => {
    await Adocao.update(params, { where: { id: id } });
};
const deleteAdocao = async(id) => {
  await Adocao.destroy({ where: { id: id } });
};


// exporta o model primeiro
module.exports = {
  Adocao,
  getTodasAdocoes,
  criarAdocao,
  todasAdocoesdeumResponsavel,
  atualizarAdocao,
  deleteAdocao
};
