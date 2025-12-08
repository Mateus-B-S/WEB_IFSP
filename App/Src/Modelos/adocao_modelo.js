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

const criarAdocao = async (animal_id, params) => {
  await Adocao.create(params, {raw: true});
  animal.update({ adotado: true }, { where: { id: animal_id } });
  const novaAdocao = await Adocao.findOne({ where: { animal_id: animal_id }, raw: true });
  return novaAdocao;
};


//pesquisar por nome depois
const todasAdocoesdeumResponsavel = async (responsavel_nome) => {
  const responsavel_id = await  Promise.resolve(responsavel.findOne({ where: { nome: responsavel_nome }, attributes:['id'], raw: true}));
    return Adocao.findAll({ where: { responsavel_id: responsavel_id.id }, raw: true});
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
