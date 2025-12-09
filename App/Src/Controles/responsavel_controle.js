const respModelo = require('../Modelos/responsavel_modelo');
const animalModelo = require('../Modelos/animal_modelo');
const adocaoModelo = require('../Modelos/adocao_modelo');
const path = require('path');
const bcrypt = require('bcrypt');

const perfilResponsavel = async (req, res) => {
    const {nome, email, senha} = req.body;

    // Buscar o usuário pelo email e nome
    const responsavel = await respModelo.Responsavel.findOne({ where: { email: email, nome: nome}, raw: true });

    if (!responsavel) {
        req.flash('error', 'Email ou nome inválidos');
        return loginResponsavel(req, res);
    }

    // Verificar a senha com bcrypt
    const senhaValida = await bcrypt.compare(senha, responsavel.senha);
    if (!senhaValida) {
        req.flash('error', 'Senha incorreta');
        return loginResponsavel(req, res);
    }

    const animaisDisponiveis = await animalModelo.animaisdisponiveis(); 
    const adocoesResponsavel = await adocaoModelo.todasAdocoesdeumResponsavel(responsavel.nome);

    req.session.user = { tipo_conta: 'responsavel', id_responsavel: responsavel.id, nome: nome ,email: email }; // grava sessão

    res.render('Perfil/responsavel', { 
        nome: req.session.user.nome, 
        animaisAdocao: animaisDisponiveis,
        animaisResponsavel: adocoesResponsavel,
        responsavel_id: req.session.user.id_responsavel
    });
};

const loginResponsavel = (req, res) => {
    res.render('Logins/responsavel', { messages: req.flash() });
};

const criarResponsavel = async (req, res) => {
    const { nome, senha } = req.body;

    // Hash da senha antes de criar
    const senhaHashed = await bcrypt.hash(senha, 10);
    req.body.senha = senhaHashed;

    await respModelo.criarResponsavel(req.body);
    return res.render('Avisos/criarResponsavel', { nome: nome });
};

const editarResponsavel = async (req, res) => {
    const { id } = req.body;
    const responsavelAtualizado = await respModelo.editarResponsavel(id, req.body);
    if (responsavelAtualizado) {
        res.json(responsavelAtualizado);
    } else {
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
    req.session.destroy(err => {
        res.redirect('/inicial.html');
    });
};

const deletarResponsavel = async (req, res) => {
    const { id } = req.body;
    await respModelo.deleteResponsavel(id);
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
};
