const modeloVet = require('../Modelos/vet_modelo');
const exameModelo = require('../Modelos/exame_medico');


const loginVet = (req, res) => {
    const { prontuario, senha } = req.body;
    const vet = modeloVet.vets.find(v => v.prontuario === prontuario && v.senha === senha);
    const examesVet = exameModelo.getExamesporVet(prontuario);
    if (vet) {
        req.session.user = { tipo_conta: 'veterinario', id_vet: vet.id }; // grava sessão
        res.render("Perfil/veterinario", { nome: vet.nome, exames: examesVet });
        //mandar para ejs do perfil do veterinario
    }
    else {
        res.status(401).json({ mensagem: "Prontuário ou senha inválidos." });
    }
};


const getTodosVets = (req, res) => {
    const vets = modeloVet.getTodosvets();
    res.json(vets);
}

const getVetPorId = (req, res) => {
    const id = parseInt(req.query.id);
    const vet = modeloVet.getvetsId(id);
    if (vet) {
        res.json(vet);
    }
    else {
        res.status(404).json({ mensagem: "Veterinário não encontrado." });
    }
};

//funções só para admins

const criarVet = (req, res) => {
    const { nome, prontuario, formacao, senha} = req.body;
        const novoVet = modeloVet.criarvet(prontuario, nome, formacao, senha);
        res.render('Avisos/veterinarios', { veterinario: novoVet , adminSenha: req.session.user.adminSenha});
};

const editarVet = (req, res) => {
    const { id, prontuario, nome, formacao, senha } = req.body;
    const vetAtualizado = modeloVet.mudarVet(id, prontuario, nome, formacao, senha);
    if (vetAtualizado) {
        res.json(vetAtualizado);
    }
    else {
        res.status(404).json({ mensagem: "Veterinário não encontrado." });
    }
    
};

const deletarVet = (req, res) => {
    const id = parseInt(req.query.id);

    const sucesso = modeloVet.deleteVet(id);
    if (sucesso) {
        res.json({ mensagem: "Veterinário deletado com sucesso." });
    } else {
        res.status(404).json({ mensagem: "Veterinário não encontrado." });
    }
};

const logoutVet = (req, res) => {
    req.session.destroy (err => {
        res.redirect('/inicial.html')
    }   );
};

module.exports = {
    loginVet,
    getTodosVets,
    getVetPorId,
    criarVet,
    editarVet,
    deletarVet,
    logoutVet
}