const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('projetolegal', 'root', 'aluno123', {
  host: 'localhost',
  dialect: 'mysql',
  port: 3306,
  logging: console.log
});

sequelize.authenticate()
  .then(() => {
    console.log('✅ Conectado ao MySQL com sucesso!');
    return sequelize.sync({ alter: true });
  })
  .then(() => console.log('✅ Banco de dados sincronizado!'))
  .catch(err => console.error('❌ Erro:', err));

module.exports = sequelize;
