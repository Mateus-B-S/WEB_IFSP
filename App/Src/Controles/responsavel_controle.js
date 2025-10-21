const respModelo = require('../Modelos/responsavel_modelo');

const loginResponsavel = (req, res) => {
    const { email, senha } = req.body;
    const responsavel = respModelo.responsaveis.find(r => r.email === email && r.senha === senha);
    if (responsavel) {
        res.json({ mensagem: "Login bem-sucedido.", responsavel: responsavel });
        //mandar para ejs do perfil do responsavel
    } else {
        res.status(401).json({ mensagem: "email ou senha inválidos." });
    }
};

const criarResponsavel = (req, res) => {
    const { nome, email } = req.body;
    const novoResponsavel = respModelo.criarResponsavel(nome, email);
    res.status(201).json(novoResponsavel);
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

//funções que só o admin pode acessar

const getTodosResponsaveis = (req, res) => {
    const { tipo_conta } = req.body;
    if (tipo_conta && tipo_conta === "Admin"){
        const responsaveis = respModelo.getTodosResponsaveis();
        res.json(responsaveis);
    }
    else {
        res.status(403).json({ mensagem: "Acesso negado. Apenas administradores podem acessar esta rota." });
    }
};

const getResponsavelPorId = (req, res) => {
    const { tipo_conta } = req.body;
    const id = parseInt(req.params.id);
    if (tipo_conta && tipo_conta === "Admin"){
        const responsavel = respModelo.getResponsavelId(id);
        if (responsavel) {
            res.json(responsavel);
        } else {
            res.status(404).json({ mensagem: "Responsável não encontrado." });
        }
    }
    else {
        res.status(403).json({ mensagem: "Acesso negado. Apenas administradores podem acessar esta rota." });
    }
};


module.exports = {
    loginResponsavel,
    criarResponsavel,
    editarResponsavel,
    getTodosResponsaveis,
    getResponsavelPorId
}