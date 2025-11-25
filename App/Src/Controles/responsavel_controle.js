const respModelo = require('../Modelos/responsavel_modelo');
const animalModelo = require('../Modelos/animal_modelo');
const adocaoModelo = require('../Modelos/adocao_modelo');
const path = require('path');

const perfilResponsavel = (req, res) => {
    const { email, senha } = req.body;
    const responsavel = respModelo.responsaveis.find(r => r.email === email && r.senha === senha);
    const animaisDisponiveis = animalModelo.animaisdisponiveis(); 
    if (responsavel) {
        const adocoesResponsavel = adocaoModelo.todasAdocoesdeumResponsavel(responsavel.nome);
        req.session.user = { tipo_conta: 'responsavel', id_responsavel: responsavel.id, email: email, senha: senha}; // grava sessão
        res.render('Perfil/responsavel', { nome: responsavel.nome ,
            animaisAdocao: animaisDisponiveis,
            animaisResponsavel: adocoesResponsavel
        }) ;
        //mandar para ejs do perfil do responsavel
    } else {
        req.flash('error', 'Email ou senha inválidos. Acesso negado.');
        return loginResponsavel(req, res);
    }
};

const loginResponsavel = (req, res) => {
    res.render('Logins/responsavel', { messages: req.flash() });
};

const criarResponsavel = (req, res) => {
    const { nome, email, senha } = req.body;
    respModelo.criarResponsavel(nome, email, senha);
    return res.render('Avisos/criarResponsavel', { nome: nome });
};


const editarResponsavel = (req, res) => {
    const { nome, email, id, senha} = req.body;
    const responsavelAtualizado = respModelo.editarResponsavel(id, nome, email, senha);
    if (responsavelAtualizado) {
        res.json(responsavelAtualizado);
    }
    else {
        res.status(404).json({ mensagem: "Responsável não encontrado." });
    }
};



const getTodosResponsaveis = (req, res) => {
    const responsaveis = respModelo.getTodosResponsaveis();
    res.json(responsaveis);
    
};

const getResponsavelPorId = (req, res) => {
    const { id_responsavel } = req.body;

    const responsavel = respModelo.getResponsavelId(parseInt(id_responsavel));
    if (responsavel) {
        res.render('Avisos/responsavelId', { responsavel: responsavel, adminSenha: req.session.user.adminSenha });
    } else {
        res.status(404).json({ mensagem: "Responsável não encontrado." });
    }  

};

const logoutResp = (req, res) => {
    req.session.destroy (err => {
        res.redirect('/inicial.html')
    }   );
};


module.exports = {
    loginResponsavel,
    criarResponsavel,
    editarResponsavel,
    getTodosResponsaveis,
    getResponsavelPorId,
    logoutResp,
    perfilResponsavel
}