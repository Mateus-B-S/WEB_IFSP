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
  },
  animal_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  responsavel_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
  tableName: 'adocoes',
  timestamps: false
});



animal.hasOne(Adocao, { foreignKey: 'animal_id' });
Adocao.belongsTo(animal, { foreignKey: 'id' });

responsavel.hasMany(Adocao, { foreignKey: 'responsavel_id' });
Adocao.belongsTo(responsavel, { foreignKey: 'id' });

const getTodasAdocoes = () => Adocao.findAll({ raw: true });

const criarAdocao = (params) => Adocao.create(params);


//pesquisar por nome depois
const todasAdocoesdeumResponsavel = (responsavel_id) => {
    return Adocao.findAll({ where: { responsavel_id: responsavel_id }, raw: true});
};

const atualizarAdocao = async(id, params) => {
    await Adocao.update(params, { where: { id: id }, raw: true });
};
const deleteAdocao = async(id) => {
  await Adocao.destroy({ where: { id: id }, raw: true });
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
