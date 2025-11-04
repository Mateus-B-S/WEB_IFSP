const respModelo = require('../Modelos/responsavel_modelo');
const path = require('path');

const loginResponsavel = (req, res) => {
    const { email, senha } = req.body;
    const responsavel = respModelo.responsaveis.find(r => r.email === email && r.senha === senha);
    if (responsavel) {
        req.session.user = { tipo_conta: 'responsavel', id_responsavel: responsavel.id }; // grava sessão
        res.render("Perfil/responsavel", { nome: responsavel.nome });
        //mandar para ejs do perfil do responsavel
    } else {
        res.status(401).json({ mensagem: "email ou senha inválidos." });
    }
};

const criarResponsavel = (req, res) => {
    const { nome, email, senha } = req.body;
    respModelo.criarResponsavel(nome, email, senha);
    return res.redirect('/Logins/responsavel.html?created=1');
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
        res.json(responsavel);
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
    logoutResp
}