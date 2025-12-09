const admin = require('../Modelos/admin_modelo');
const animalModelo = require('../Modelos/animal_modelo');
const respModelo = require('../Modelos/responsavel_modelo');
const exameModelo = require('../Modelos/exame_medico');
const vetModelo = require('../Modelos/vet_modelo');
const adocaoModelo = require('../Modelos/adocao_modelo');
const bcrypt = require('bcrypt');

const perfilAdmin =  async (req, res) => {
    const { senha } = req.body || {};

    // Buscar a senha armazenada do admin
    const adminRow = await admin.findOne({ attributes: ['senha'], raw: true });

    if (!adminRow) {
        req.flash('error', 'Admin não encontrado');
        return loginAdmin(req, res);
    }

    const adminSenha = adminRow.senha;

    // Verificação usando bcrypt
    const senhaValida = await bcrypt.compare(senha, adminSenha);
    if (!senhaValida) {
        req.flash('error', 'Senha incorreta. Acesso negado.');
        return loginAdmin(req, res);
    }

    // Listas para o EJS
    const [listaAnimais, listaResponsaveis, listaVeterinarios, listaExames, listaAdocoes] = await Promise.all([
        Promise.resolve(animalModelo.getTodosAnimais()),
        Promise.resolve(respModelo.getTodosResponsaveis()),
        Promise.resolve(vetModelo.getTodosvets()),
        Promise.resolve(exameModelo.getTodosExames()), 
        Promise.resolve(adocaoModelo.getTodasAdocoes())
    ]);

    req.session.user = { tipo_conta: 'admin' }; // grava sessão
    res.render("Perfil/admin", { 
        animais: listaAnimais, 
        responsaveis: listaResponsaveis, 
        veterinarios: listaVeterinarios, 
        exames: listaExames, 
        adocoes: listaAdocoes 
    });
};

const loginAdmin = (req, res) => {
    res.render('Logins/admin', { messages: req.flash() });
};

const logoutAdmin = (req, res) => {
    req.session.destroy(err => {
        res.redirect('/inicial.html')
    });
};

module.exports = {
    logoutAdmin,
    loginAdmin,
    perfilAdmin
};
