
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
  hooks: {
        beforeCreate: async (admin) => {
          const salt = await bcrypt.genSalt(10);
          admin.senha = await bcrypt.hash(admin.senha, salt);
        },
        beforeUpdate: async (admin) => {
          if (admin.changed('senha')) {
            const salt = await bcrypt.genSalt(10);
            admin.senha = await bcrypt.hash(admin.senha, salt);
          }
        }
      }
});


// exportar para uso em controllers
module.exports = Admin;


