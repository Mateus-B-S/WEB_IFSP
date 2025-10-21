const modeloAutor = require('../Modelos/vet_modelo');


const loginVet = (req, res) => {
    const { prontuario, senha } = req.body;
    const vet = modeloAutor.vets.find(v => v.prontuario === prontuario && v.senha === senha);
    if (vet) {
        res.json({ mensagem: "Login bem-sucedido.", vet: vet });
        //mandar para ejs do perfil do vet
    }
    else {
        res.status(401).json({ mensagem: "Prontuário ou senha inválidos." });
    }
};


const getTodosVets = (req, res) => {
    const vets = modeloAutor.getTodosvets();
    res.json(vets);
}

const getVetPorId = (req, res) => {
    const id = parseInt(req.query.id);
    const vet = modeloAutor.getvetsId(id);
    if (vet) {
        res.json(vet);
    }
    else {
        res.status(404).json({ mensagem: "Veterinário não encontrado." });
    }
};

//funções só para admins

const criarVet = (req, res) => {
    const { nome, prontuario, formacao, tipo_conta } = req.body;
    if (tipo_conta && tipo_conta === "Admin") {
        const novoVet = modeloAutor.criarvet(nome, prontuario, formacao);
        res.status(201).json(novoVet)
    }
    else {
        res.status(403).json({ mensagem: "Acesso negado. Apenas administradores podem acessar esta rota." });
    }
};

const editarVet = (req, res) => {
    const { id, prontuario, nome, formacao, tipo_conta } = req.body;
    if (tipo_conta && tipo_conta === "Admin") {
        const vetAtualizado = modeloAutor.mudarVet(id, prontuario, nome, formacao);
        if (vetAtualizado) {
            res.json(vetAtualizado);
        }
        else {
            res.status(404).json({ mensagem: "Veterinário não encontrado." });
        }
    }
    else {
        res.status(403).json({ mensagem: "Acesso negado. Apenas administradores podem acessar esta rota." });
    }
};

const deletarVet = (req, res) => {
    const { tipo_conta } = req.body;
    const id = parseInt(req.query.id);
    if (tipo_conta && tipo_conta === "Admin") {
        const sucesso = modeloAutor.deleteVet(id);
        if (sucesso) {
            res.json({ mensagem: "Veterinário deletado com sucesso." });
        } else {
            res.status(404).json({ mensagem: "Veterinário não encontrado." });
        }
    }
    else {
        res.status(403).json({ mensagem: "Acesso negado. Apenas administradores podem acessar esta rota." });
    }
};

module.exports = {
    loginVet,
    getTodosVets,
    getVetPorId,
    criarVet,
    editarVet,
    deletarVet
}