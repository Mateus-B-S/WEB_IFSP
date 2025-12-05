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

const listarExamesPorVet = async (req, res) => {
    const { vet_prontuario } = req.body;

    const [exames , nomeVet] = await Promise.all([
        Promise.resolve(exameModelo.getExamesPorVet(vet_prontuario)),
        Promise.resolve(vetModelo.getProntuarioVet(vet_prontuario).nome)
    ]); 
    res.render('Avisos/examesPorVet', { exames: exames, prontuarioVet: vet_prontuario, nomeVet: nomeVet, adminSenha: req.session.user.adminSenha });
};

module.exports = {
    criarExame,
    listarExamesPorVet
};