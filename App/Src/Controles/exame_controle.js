const exameModelo = require('../Modelos/exame_medico');
const vetModelo = require('../Modelos/vet_modelo');

const criarExame = (req, res) => {
    const { id_animal, vet_prontuario, observacoes} = req.body;
    const novoExame = exameModelo.criarExameMedico(id_animal, vet_prontuario, observacoes);
    if (novoExame) {
        res.status(201).json(novoExame);
    }
    else {
        res.status(400).json({ mensagem: "Erro ao criar exame. Verifique os dados fornecidos." });
    }       
};

const listarExames = (req, res) => { 
   const exames = exameModelo.getTodosExames();
   res.status(200).json(exames);
};

const listarExamesPorVet = (req, res) => {
    const { vet_prontuario } = req.body;
    const exames = exameModelo.getExamesporVet(vet_prontuario);
    const nomeVet = vetModelo.getProntuarioVet(vet_prontuario).nome;
    res.render('Avisos/examesPorVet', { exames: exames, prontuarioVet: vet_prontuario, nomeVet: nomeVet, adminSenha: req.session.user.adminSenha });
};

module.exports = {
    criarExame,
    listarExames,
    listarExamesPorVet
};

