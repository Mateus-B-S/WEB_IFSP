// controllers/responsavelController.js
const Responsavel = require('../Modelos/responsavel_modelo');

// lista todos
exports.listarResponsaveis = async (req, res) => {
    try {
        const responsaveis = await Responsavel.findAll();
        res.json(responsaveis);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: "Erro ao buscar responsáveis" });
    }
};

// busca os ngc por id
exports.buscarResponsavelPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const responsavel = await Responsavel.findByPk(id);

        if (!responsavel) {
            return res.status(404).json({ erro: "Responsável não encontrado" });
        }

        res.json(responsavel);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: "Erro ao buscar responsável" });
    }
};

const loginResponsavel = (req, res) => {
    res.render('Logins/responsavel', { messages: req.flash() });
};

// cria conta de responsaveis
exports.criarResponsavel = async (req, res) => {
    try {
        const { nome, email } = req.body;

        const novo = await Responsavel.create({
            nome,
            email
        });

        res.status(201).json(novo);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: "Erro ao criar responsável" });
    }
};

// atualiza a conta deles
exports.atualizarResponsavel = async (req, res) => {
    try {
        const { id } = req.params;

        const responsavel = await Responsavel.findByPk(id);

        if (!responsavel) {
            return res.status(404).json({ erro: "Responsável não encontrado" });
        }

        const { nome, email } = req.body;

        await responsavel.update({
            nome,
            email
        });

        res.json(responsavel);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: "Erro ao atualizar responsável" });
    }
};

// deleta um responsavel
exports.deletarResponsavel = async (req, res) => {
    try {
        const { id } = req.params;

        const responsavel = await Responsavel.findByPk(id);

        if (!responsavel) {
            return res.status(404).json({ erro: "Responsável não encontrado" });
        }

        await responsavel.destroy();

        res.json({ mensagem: "Responsável deletado com sucesso" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: "Erro ao deletar responsável" });
    }
};

exports.loginResponsavel = (req, res) => {
    res.render('Logins/responsavel', { messages: req.flash() });
};

