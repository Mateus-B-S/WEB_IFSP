const  DataTypes  = require('sequelize');
const sequelize = require('../Banco_dados/connection');
const animais = require('./animal_modelo');
const responsaveis = require('./responsavel_modelo')
const adocao = sequelize.define('adocoes', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
     },
    data_adocao: {
        type: DataTypes.DATE,
        allowNull: false
    },
    animal_id: {
        type: DataTypes.INTEGER,
        references: { 
            model: animais,
            key: 'id'
        }
    },
    animal_nome: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: animais,
            key: 'nome'
        }
    },
    animal_raça: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: animais,
            key: 'raça'
        }
    },
    responsavel_id: {
        type: DataTypes.INTEGER,
        references: {
            model: responsaveis,
            key: 'id'
        }
    }, 
    
});

/*
animal.hasOne(adocao, { foreignKey: 'animal_id' });
adocao.belongsTo(animal, { foreignKey: 'animal_id' });

responsavel.hasMany(adocao, { foreignKey: 'responsavel_id' });
adocao.belongsTo(responsavel, { foreignKey: 'responsavel_id' });
*/

//sequelize.
adocao.sync();
const getTodasAdocoes = () => adocao.findAll();

const criarAdocao = (dados) => adocao.create(dados);

const todasAdocoesdeumResponsavel = (responsavel_nome) => {
    return adocao.findAll({ where: { responsavel_nome: responsavel_nome } });
};

const atualizarAdocao = async(id, dados) => {
    await adocao.update(dados, { where: { id: id } });
};
const deleteAdocao = async(id) => {
  await adocao.destroy({ where: { id: id } });
};
module.exports = {
    adocao,
    getTodasAdocoes,
    criarAdocao,
    todasAdocoesdeumResponsavel,
    atualizarAdocao,
    deleteAdocao
};