const exameModelo = require('../Modelos/exame_medico');

//funções que só admins e veterinarios podem acessar 

const criarExame = (req, res) => {
    const { id_animal, vet_prontuario, data_exame, resultados, tipo_conta } = req.body;
    
        const novoExame = exameModelo.criarExameMedico(id_animal, vet_prontuario, data_exame, resultados);
        if (novoExame) {
            res.status(201).json(novoExame);
        }
        else {
            res.status(400).json({ mensagem: "Erro ao criar exame. Verifique os dados fornecidos." });
        }       
   
};

const listarExames = (req, res) => {
    const { tipo_conta } = req.body;
    
        const exames = exameModelo.getTodosExames();
        res.status(200).json(exames);
   
};

const listarExamesPorVet = (req, res) => {
    const { vet_prontuario, tipo_conta } = req.body;
    
        const exames = exameModelo.getExamesporVet(vet_prontuario);
        res.status(200).json(exames);
   
};

module.exports = {
    criarExame,
    listarExames,
    listarExamesPorVet
};

