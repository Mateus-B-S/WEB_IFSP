const  DataTypes = require('sequelize');
const sequelize = require('../Banco_dados/connection');

const responsavel = sequelize.define('responsavel', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nome: {
    type: DataTypes.STRING,
   allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },

  }, {
    timestamp: false
});
responsavel.sync();

//sequelize.

const getTodosResponsaveis = () => responsavel.findAll();
const criarResponsavel = (params) => responsavel.create(params);
const getResponsavelId = (id) => responsaveis.find(r => r.id === id);
const editarResponsavel = (id, params) => {
    return responsavel.update(params, { where: { id: id } });
};
const deleteResponsavel = (id) => {
    return responsavel.destroy({ where: { id: id } });
};

//module.exports = responsavel;

module.exports = {
  responsavel,
  criarResponsavel,
  editarResponsavel,
  getResponsavelId,
  getTodosResponsaveis,
  deleteResponsavel
}