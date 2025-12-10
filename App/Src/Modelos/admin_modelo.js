
const { DataTypes } = require('sequelize');
const sequelize = require('../Banco_dados/connection');

const Admin = sequelize.define('admin', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false
  }

}, {
  tableName: 'admins',
  timestamps: false,
});


// exportar para uso em controllers
module.exports = Admin;


