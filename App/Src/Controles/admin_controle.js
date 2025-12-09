const admin = require('../Modelos/admin_modelo');
const animalModelo = require('../Modelos/animal_modelo');
const respModelo = require('../Modelos/responsavel_modelo');
const exameModelo = require('../Modelos/exame_medico');
const vetModelo = require('../Modelos/vet_modelo');
const adocaoModelo = require('../Modelos/adocao_modelo');
const bcrypt = require('bcrypt');

// Login e perfil do admin
const perfilAdmin = async (req, res) => {
    const { senha } = req.body || {};

    // Buscar a senha armazenada (apenas o primeiro admin)
    const adminRow = await admin.findOne({ attributes: ['senha'], raw: true });
    const adminSenha = adminRow ? String(adminRow.senha) : null;

    // Carregar listas para dashboard
    const [listaAnimais, listaResponsaveis, listaVeterinarios, listaExames, listaAdocoes] = await Promise.all([
        animalModelo.getTodosAnimais(),
        respModelo.getTodosResponsaveis(),
        vetModelo.getTodosvets(),
        exameModelo.getTodosExames(),
        adocaoModelo.getTodasAdocoes()
    ]);

    if (senha && String(senha) === adminSenha) {
        req.session.user = { tipo_conta: 'admin', adminSenha: adminSenha }; 
        res.render("Perfil/admin", { 
            animais: listaAnimais, 
            responsaveis: listaResponsaveis, 
            veterinarios: listaVeterinarios, 
            exames: listaExames, 
            adocoes: listaAdocoes 
        });
    } else {
        req.flash('error', 'Senha incorreta. Acesso negado.');
        return loginAdmin(req, res);
    }
};

// Renderizar login do admin
const loginAdmin = (req, res) => {
    res.render('Logins/admin', { messages: req.flash() });
};

// Logout admin
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
