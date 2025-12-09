const admin = require('../Modelos/admin_modelo');
const animalModelo = require('../Modelos/animal_modelo');
const respModelo = require('../Modelos/responsavel_modelo');
const exameModelo = require('../Modelos/exame_medico');
const vetModelo = require('../Modelos/vet_modelo');
const adocaoModelo = require('../Modelos/adocao_modelo');
//const path = require('path');

const perfilAdmin =  async (req, res) => {
    const { senha } = req.body || {};
    // Buscar a senha armazenada (pegar o único admin) e comparar como string
    const adminRow = await admin.findOne({ attributes: ['senha'], raw: true });
    const adminSenha = adminRow ? String(adminRow.senha) : null;
        
    // Os .resolve faz com que primeiro ele faz a função e só depois mande para o EJS  
    const [listaAnimais, listaResponsaveis, listaVeterinarios, listaExames, listaAdocoes] = await Promise.all([
        await Promise.resolve(animalModelo.getTodosAnimais()),
        await Promise.resolve(respModelo.getTodosResponsaveis()),
        await Promise.resolve(vetModelo.getTodosvets()),
        Promise.resolve(exameModelo.getTodosExames()), 
        Promise.resolve(adocaoModelo.getTodasAdocoes())
    ]);
    if (senha && String(senha) === adminSenha) {

        req.session.user = { tipo_conta: 'admin', adminSenha: adminSenha }; 
        // grava sessão
    
        res.render("Perfil/admin", { animais: listaAnimais, 
            responsaveis: listaResponsaveis, 
            veterinarios: listaVeterinarios, 
            exames: listaExames, 
            adocoes: listaAdocoes }); 
        // Renderiza a página de perfil do administrador
        }    
    else {
        req.flash('error', 'Senha incorreta. Acesso negado.');
        return loginAdmin(req, res);
    }
};

const loginAdmin = (req, res) => {
    res.render('Logins/admin', { messages: req.flash() });
};

const logoutAdmin = (req, res) => {
    req.session.destroy (err => {
        res.redirect('/inicial.html')
    }   );
};

module.exports = {
    logoutAdmin,
    loginAdmin,
    perfilAdmin
};