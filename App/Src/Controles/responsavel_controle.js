const respModelo = require('../Modelos/responsavel_modelo');
const path = require('path');

const loginResponsavel = (req, res) => {
    const { email, senha } = req.body;
    const responsavel = respModelo.responsaveis.find(r => r.email === email && r.senha === senha);
    if (responsavel) {
        res.render(path.join(__dirname, "../Front_End/logins/responsavel"));
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



const getTodosResponsaveis = (req, res) => {
    const { tipo_conta } = req.body;
   
        const responsaveis = respModelo.getTodosResponsaveis();
        res.json(responsaveis);
    
};

const getResponsavelPorId = (req, res) => {
    const { tipo_conta, id_responsavel } = req.body;
   
        const responsavel = respModelo.getResponsavelId(parseInt(id_responsavel));
        if (responsavel) {
            res.json(responsavel);
        } else {
            res.status(404).json({ mensagem: "Responsável não encontrado." });
        }  

};


module.exports = {
    loginResponsavel,
    criarResponsavel,
    editarResponsavel,
    getTodosResponsaveis,
    getResponsavelPorId
}