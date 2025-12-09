const modeloVet = require('../Modelos/vet_modelo');
const exameModelo = require('../Modelos/exame_medico');
const bcrypt = require('bcrypt');

const perfilVet = async (req, res) => {
    const {nome, prontuario, senha } = req.body;

    // Busca o veterinário pelo nome e prontuário
    const vet = await modeloVet.Veterinario.findOne({ where: { nome, prontuario }, raw: true });

    if (!vet) {
        req.flash('error', 'Prontuário ou senha inválidos. Acesso negado.');
        return loginVet(req, res);
    }

    // Verifica a senha com bcrypt
    const senhaValida = await bcrypt.compare(senha, vet.senha);
    if (!senhaValida) {
        req.flash('error', 'Prontuário ou senha inválidos. Acesso negado.');
        return loginVet(req, res);
    }

    // Busca exames do veterinário
    const examesVet = await exameModelo.getExamesPorVet(prontuario);

    // Grava sessão
    req.session.user = { tipo_conta: 'veterinario', id_vet: vet.id, nome: vet.nome, prontuario: vet.prontuario };

    res.render("Perfil/veterinario", { nome: vet.nome, exames: examesVet, prontuario: vet.prontuario });
};

const loginVet = (req, res) => {
    res.render('Logins/veterinario', { messages: req.flash() });
};

const getVetPorId = async (req, res) => {
    const id = parseInt(req.query.id);
    const vet = await modeloVet.getVetsId(id);
    if (vet) {
        res.json(vet);
    } else {
        res.status(404).json({ mensagem: "Veterinário não encontrado." });
    }
};

// Funções só para admins

const criarVet = async (req, res) => {
    const dadosVet = { ...req.body };
    // Hash da senha antes de salvar
    dadosVet.senha = await bcrypt.hash(dadosVet.senha, 10);

    const novoVet = await modeloVet.criarVet(dadosVet);
    res.render('Avisos/veterinarios', { veterinario: novoVet, adminSenha: req.session.user.adminSenha });
};

const deletarVet = async (req, res) => {
    const { id } = req.body;

    const sucesso = await modeloVet.deleteVet(id);
    if (sucesso) {
        res.json({ mensagem: "Veterinário deletado com sucesso." });
    } else {
        res.status(404).json({ mensagem: "Veterinário não encontrado." });
    }
};

const logoutVet = (req, res) => {
    req.session.destroy(err => {
        res.redirect('/inicial.html');
    });
};

module.exports = {
    loginVet,
    getVetPorId,
    criarVet,
    deletarVet,
    logoutVet,
    perfilVet
};
