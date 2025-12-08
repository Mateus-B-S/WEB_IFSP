const exameModelo = require('../Modelos/exame_medico');
const vetModelo = require('../Modelos/vet_modelo');

const criarExame = async (req, res) => {
    const novoExame = await Promise.resolve(exameModelo.criarExameMedico(req.body));
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

const editarAnimal = async (req, res) => {
    const { id } = req.body;
        const animalAtualizado = await animalModelo.mudarAnimal(id, req.body);
        if (animalAtualizado) {
            res.json(animalAtualizado);
        }
        else {
            res.status(404).json({ mensagem: "Animal não encontrado." });
        }
};

const deletarAnimal = async (req, res) => {
    const { id } = req.body;
    await Promise.resolve(animalModelo.deleteAnimal(id));
    res.json({ mensagem: "Animal deletado com sucesso." });
};

module.exports = {
    criarExame,
    listarExamesPorVet,
    editarAnimal,
    deletarAnimal
};