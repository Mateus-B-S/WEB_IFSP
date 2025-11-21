const admin = require('../Modelos/admin_modelo');
const animalModelo = require('../Modelos/animal_modelo');
const respModelo = require('../Modelos/responsavel_modelo');
const exameModelo = require('../Modelos/exame_medico');
const vetModelo = require('../Modelos/vet_modelo');
const adocaoModelo = require('../Modelos/adocao_modelo');
//const path = require('path');

const loginAdmin =  async (req, res) => {
    // debug pra ver se a senha chega
    console.log('DEBUG loginAdmin - req.body:', req.body);
    console.log('DEBUG loginAdmin - admin.senha:', admin && admin.senha);
    const { senha } = req.body || {};
    const listaAnimais = animalModelo.getTodosAnimais();
    const listaResponsaveis = respModelo.getTodosResponsaveis();
    const listaVeterinarios = vetModelo.getTodosvets();
    const listaExames = exameModelo.getTodosExames();
    const listaAdocoes = adocaoModelo.getTodasAdocoes();
    if (senha && senha === admin.senha) {
        req.session.user = { tipo_conta: 'admin' }; 
        // grava sessão
        res.render("Perfil/admin", { animais: listaAnimais, 
            responsaveis: listaResponsaveis, 
            veterinarios: listaVeterinarios, 
            exames: listaExames, 
            adocoes: listaAdocoes }); 
        // Renderiza a página de perfil do administrador
    }
    else {
        res.status(401).json({ mensagem: "Senha incorreta. Acesso negado." });
    }
};

const logoutAdmin = (req, res) => {
    req.session.destroy (err => {
        res.redirect('/inicial.html')
    }   );
};

module.exports = {
    logoutAdmin,
    loginAdmin
};