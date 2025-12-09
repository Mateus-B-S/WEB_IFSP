
const respModelo = require('../Modelos/responsavel_modelo');
const animalModelo = require('../Modelos/animal_modelo');
const adocaoModelo = require('../Modelos/adocao_modelo');
const path = require('path');

const perfilResponsavel = async (req, res) => {
    const {nome, email, senha } = req.body;
    const responsavel = await Promise.resolve(respModelo.Responsavel.findOne({ where: { email: email, senha: senha , nome: nome}, raw: true }));
    const animaisDisponiveis = await Promise.resolve(animalModelo.animaisdisponiveis()); 
    if (responsavel) {
        const adocoesResponsavel = await adocaoModelo.todasAdocoesdeumResponsavel(responsavel.nome);
        req.session.user = { tipo_conta: 'responsavel', id_responsavel: responsavel.id, nome: nome ,email: email, senha: senha}; // grava sessão
        res.render('Perfil/responsavel', { nome: req.session.user.nome, 
            animaisAdocao: animaisDisponiveis,
            animaisResponsavel: adocoesResponsavel,
            responsavel_id: req.session.user.id_responsavel
        }) ;
        //mandar para ejs do perfil do responsavel
    } else {
        req.flash('error', 'Email, nome ou senha inválidos. Acesso negado.');
        return loginResponsavel(req, res);
    }
};

const loginResponsavel = (req, res) => {
    res.render('Logins/responsavel', { messages: req.flash() });
};

const criarResponsavel = async (req, res) => {
    const { nome } = req.body;
    await Promise.resolve(respModelo.criarResponsavel(req.body));
    return res.render('Avisos/criarResponsavel', { nome: nome });
};


const editarResponsavel = async (req, res) => {
    const { id } = req.body;
    const responsavelAtualizado = await Promise.resolve(respModelo.editarResponsavel(id, req.body));
    if (responsavelAtualizado) {
        res.json(responsavelAtualizado);
    }
    else {
        res.status(404).json({ mensagem: "Responsável não encontrado." });
    }
};


const getResponsavelPorId = async (req, res) => {
    const { id_responsavel } = req.body;

    const responsavel = await respModelo.getResponsavelId(parseInt(id_responsavel));
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

const deletarResponsavel = async (req, res) => {
    const { id } = req.body;
    await Promise.resolve(respModelo.deleteResponsavel(id));
    res.json({ mensagem: "Responsável deletado com sucesso." });
};

module.exports = {
    loginResponsavel,
    criarResponsavel,
    editarResponsavel,
    getResponsavelPorId,
    logoutResp,
    perfilResponsavel,
    deletarResponsavel
}
