const modeloVet = require('../Modelos/vet_modelo');
const exameModelo = require('../Modelos/exame_medico');


const perfilVet = (req, res) => {
    const { prontuario, senha } = req.body;
    const vet = modeloVet.vets.find(v => v.prontuario === prontuario && v.senha === senha);
    const examesVet = exameModelo.getExamesporVet(prontuario);
    if (vet) {
        req.session.user = { tipo_conta: 'veterinario', id_vet: vet.id }; // grava sessão
        res.render("Perfil/veterinario", { nome: vet.nome, exames: examesVet });
        //mandar para ejs do perfil do veterinario
    }
    else {
        req.flash('error', 'Prontuário ou senha inválidos. Acesso negado.');
        return loginVet(req, res);
    }
};

const loginVet = (req, res) => {
    res.render('Logins/veterinario', { messages: req.flash() });
};




const getVetPorId = async (req, res) => {
    const id = parseInt(req.query.id);
    const vet = await Promise.resolve(modeloVet.getVetsId(id));
    if (vet) {
        res.json(vet);
    }
    else {
        res.status(404).json({ mensagem: "Veterinário não encontrado." });
    }
};

//funções só para admins

const criarVet = async (req, res) => {
    const novoVet = await modeloVet.criarVet(req.body);
    res.render('Avisos/veterinarios', { veterinario: novoVet , adminSenha: req.session.user.adminSenha});
};

const editarVet = async (req, res) => {
    const { id } = req.body;
    const vetAtualizado = await modeloVet.mudarVet(id, req.body);
    if (vetAtualizado) {
        res.json(vetAtualizado);
    }
    else {
        res.status(404).json({ mensagem: "Veterinário não encontrado." });
    }
    
};

const deletarVet = async (req, res) => {
    const id = parseInt(req.query.id);

    const sucesso = await modeloVet.deleteVet(id);
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
    getVetPorId,
    criarVet,
    editarVet,
    deletarVet,
    logoutVet,
    perfilVet
}