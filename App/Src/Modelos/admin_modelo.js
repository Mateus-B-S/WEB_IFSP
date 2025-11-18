const Admin = {senha: "123456789"};

const { DataTypes } = require('sequelize');
const sequelize = require('../Banco_dados/connection');

/*
const Sequelize = require("sequelize")
const db = require("../config/bd_SEQUELIZE")
const cripto = require("bcrypt")

const Admin = Sequelize.define('admin', {
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
});*/

module.exports = Admin;
