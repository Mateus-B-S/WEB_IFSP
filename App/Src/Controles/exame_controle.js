const exameModelo = require('../Modelos/exame_medico');
const vetModelo = require('../Modelos/vet_modelo');

const criarExame = async (req, res) => {
    const novoExame = await Promise.resolve(exameModelo.criarExameMedico(req.body));
    if (novoExame) {
        res.status(201).render('Avisos/criarExame', { exame: novoExame, senha: req.session.user.senha, nome: req.session.user.nome, prontuario: req.session.user.prontuario } );
    }
    else {
        res.status(400).json({ mensagem: "Erro ao criar exame. Verifique os dados fornecidos." });
    }       
};

const listarExamesPorVet = async (req, res) => {
    const { vet_prontuario } = req.body;

    const [exames , nomeVet] = await Promise.all([  
        Promise.resolve(exameModelo.getExamesPorVet(vet_prontuario)),
        Promise.resolve(vetModelo.getProntuarioVet(vet_prontuario))
    ]); 
    res.render('Avisos/examesPorVet', { exames: exames, prontuarioVet: vet_prontuario, nomeVet: nomeVet.nome , adminSenha: req.session.user.adminSenha, async: true });
};

const editarExame = async (req, res) => {
    const { id } = req.body;
        const exameAtualizado = await Promise.resolve(exameModelo.atualizarExame(id, req.body));
        if (!exameAtualizado) {
            res.status(404).json({ mensagem: "Animal não encontrado." });
        }
        else {
            res.render('Avisos/editarExame', { exame: exameAtualizado, senha: req.session.user.senha, nome: req.session.user.nome, prontuario: req.session.user.prontuario} );
        }
};

const deletarExame = async (req, res) => {
    const { id } = req.body;
    await exameModelo.deleteExame(id);
    res.render('Avisos/deletarExame', { senha: req.session.user.senha, nome: req.session.user.nome, prontuario: req.session.user.prontuario } );
};

module.exports = {
    criarExame,
    listarExamesPorVet,
    editarExame,
    deletarExame,
};