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



// Definir associações corretamente: usar as chaves estrangeiras que existem
animal.hasOne(Adocao, { foreignKey: 'animal_id' });
Adocao.belongsTo(animal, { foreignKey: 'animal_id' });

responsavel.hasMany(Adocao, { foreignKey: 'responsavel_id' });
Adocao.belongsTo(responsavel, { foreignKey: 'responsavel_id' });

// Buscar adocoes incluindo dados do animal e do responsavel
const getTodasAdocoes = () => Adocao.findAll({
  include: [
    { model: animal, attributes: ['nome', 'raca'] },
    { model: responsavel, attributes: ['nome'] }
  ],
  raw: true
});

const criarAdocao = async (animal_id, params) => {
  // criar a adoção e marcar o animal como adotado
  await Adocao.create(params);
  await animal.update({ adotado: true }, { where: { id: animal_id } });
  const novaAdocao = await Adocao.findOne({ where: { animal_id: animal_id }, raw: true });
  return novaAdocao;
};


//pesquisar por nome depois
const todasAdocoesdeumResponsavel = async (responsavel_nome) => {
  const resp = await responsavel.findOne({ where: { nome: responsavel_nome }, attributes: ['id'], raw: true });
  if (!resp) return [];
  return Adocao.findAll({ where: { responsavel_id: resp.id }, raw: true });
};

const atualizarAdocao = async (id, params) => {
  await Adocao.update(params, { where: { id: id } });
};
const deleteAdocao = async (id) => {
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