const Admin = require('../Modelos/admin_modelo');
const Animal = require('../Modelos/animal_modelo');
const Responsavel = require('../Modelos/responsavel_modelo');
const Veterinario = require('../Modelos/vet_modelo');
const Exame = require('../Modelos/exame_medico');
const Adocao = require('../Modelos/adocao_modelo');

// Renderiza o formulário de login
const loginAdmin = (req, res) => {
  res.render('Logins/admin', { messages: req.flash() });
};

// Processa o login
const perfilAdmin = async (req, res) => {
  try {
    const { senha } = req.body || {};

    // Busca o admin no banco
    const admin = await Admin.findOne();

    if (!admin || senha !== admin.senha.toString()) {
      req.flash('error', 'Senha incorreta. Acesso negado.');
      return res.redirect('/login/admin'); // ajuste conforme sua rota
    }

    // Salva sessão
    req.session.user = {
      tipo_conta: 'admin',
      adminSenha: admin.senha
    };

    // Carrega todos os dados para o dashboard do admin
    const [
      listaAnimais,
      listaResponsaveis,
      listaVeterinarios,
      listaExames,
      listaAdocoes
    ] = await Promise.all([
      Animal.findAll(),
      Responsavel.findAll(),
      Veterinario.findAll(),
      Exame.findAll(),
      Adocao.findAll()
    ]);

    // Renderiza a página de perfil
    return res.render("Perfil/admin", {
      animais: listaAnimais,
      responsaveis: listaResponsaveis,
      veterinarios: listaVeterinarios,
      exames: listaExames,
      adocoes: listaAdocoes
    });

  } catch (err) {
    console.error("Erro no perfilAdmin:", err);
    res.status(500).send("Erro no servidor.");
  }
};

// Logout
const logoutAdmin = (req, res) => {
  req.session.destroy(err => {
    res.redirect('/inicial.html');
  });
};

module.exports = {
  loginAdmin,
  perfilAdmin,
  logoutAdmin
};
