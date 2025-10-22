const exameModelo = require('../Modelos/exame_medico');

//funções que só admins e veterinarios podem acessar 

const criarExame = (req, res) => {
    const { id_animal, tipo_exame, data_exame, resultados, tipo_conta } = req.body;
    if (tipo_conta && (tipo_conta === "Admin" || tipo_conta === "Veterinario")) {
        const novoExame = exameModelo.criarExameMedico(id_animal, tipo_exame, data_exame, resultados);
        if (novoExame !== null) {
            res.status(201).json(novoExame);
        }
        else {
            res.status(400).json({ mensagem: "Erro ao criar exame. Verifique os dados fornecidos." });
        }       
    }
    else {
        res.status(403).json({ mensagem: "Acesso negado. Apenas administradores e veterinários podem acessar esta rota." });
    }
};

const listarExames = (req, res) => {
    const { tipo_conta } = req.body;
    if (tipo_conta && (tipo_conta === "Admin" || tipo_conta === "Veterinario")) {
        const exames = exameModelo.getTodosExames();
        res.status(200).json(exames);
    }
    else {
        res.status(403).json({ mensagem: "Acesso negado. Apenas administradores e veterinários podem acessar esta rota." });
    }
};

const listarExamesPorVet = (req, res) => {
    const { vet_prontuario, tipo_conta } = req.body;
    if (tipo_conta && (tipo_conta === "Admin" || tipo_conta === "Veterinario")) {
        const exames = exameModelo.getExamesporVet(vet_prontuario);
        res.status(200).json(exames);
    }
    else {
        res.status(403).json({ mensagem: "Acesso negado. Apenas administradores e veterinários podem acessar esta rota." });
    }
};

module.exports = {
    criarExame,
    listarExames,
    listarExamesPorVet
};

