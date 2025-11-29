// ...novo arquivo...
const path = require('path');

console.log('🔍 Iniciando teste de conexão...');
console.log('cwd:', process.cwd());
console.log('__dirname:', __dirname);

const connPath = path.join(__dirname, 'Banco_dados', 'connection.js');
console.log('Carregando:', connPath);

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason && reason.stack ? reason.stack : reason);
  process.exit(1);
});
process.on('uncaughtException', (err) => {
  console.error('Uncaught Exception:', err && err.stack ? err.stack : err);
  process.exit(1);
});

try {
  require(connPath);
  console.log('✅ require() executado. Aguardando logs de conexão (5s)...');
  setTimeout(() => {
    console.log('🔎 Teste finalizado: verifique mensagens acima para "Conectado" ou erros.');
    process.exit(0);
  }, 5000);
} catch (err) {
  console.error('❌ Erro ao carregar connection.js:', err && err.stack ? err.stack : err);
  process.exit(1);
}
