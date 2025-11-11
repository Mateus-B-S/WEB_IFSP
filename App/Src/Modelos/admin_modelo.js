//const Admin = {senha: "123456789"};



const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Admin = sequelize.define('admin', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  senha: {
    type: DataTypes.INTEGER,
    allowNull: false
  }

}, {
  tableName: 'admins',
  timestamps: false
});

module.exports = admin;
