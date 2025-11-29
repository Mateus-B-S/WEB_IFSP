const Veterinario = require('../Modelos/vet_modelo');

// Renderiza tela de login
const loginVet = (req, res) => {
    res.render('Logins/vet', { messages: req.flash() });
};

// Processa login do veterinário
const perfilVet = async (req, res) => {
    try {
        const { prontuario } = req.body;

        const vet = await Veterinario.findOne({ where: { prontuario } });

        if (!vet) {
            req.flash('error', 'Prontuário inválido.');
            return res.redirect('/login/vet');
        }

        req.session.user = {
            tipo_conta: 'veterinario',
            vetId: vet.id
        };

        return res.render('Perfil/vet', { vet });

    } catch (error) {
        console.error("Erro em perfilVet:", error);
        return res.status(500).send("Erro interno.");
    }
};

// Buscar todos os veterinários
const getTodosVets = async (req, res) => {
    try {
        const vets = await Veterinario.findAll();
        return res.json(vets);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ erro: 'Erro ao listar veterinários' });
    }
};

// Buscar veterinário por ID
const getVetPorId = async (req, res) => {
    try {
        const { id } = req.query;
        const vet = await Veterinario.findByPk(id);

        if (!vet) {
            return res.status(404).json({ erro: 'Veterinário não encontrado' });
        }

        return res.json(vet);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ erro: 'Erro ao buscar veterinário' });
    }
};

// Criar veterinário
const criarVet = async (req, res) => {
    try {
        const { nome, formacao, prontuario } = req.body;

        const novo = await Veterinario.create({
            nome,
            formacao,
            prontuario
        });

        return res.status(201).json(novo);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ erro: 'Erro ao criar veterinário' });
    }
};

// Editar veterinário
const editarVet = async (req, res) => {
    try {
        const { id, nome, formacao, prontuario } = req.body;

        const vet = await Veterinario.findByPk(id);

        if (!vet) {
            return res.status(404).json({ erro: 'Veterinário não encontrado' });
        }

        await vet.update({ nome, formacao, prontuario });

        return res.json(vet);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ erro: 'Erro ao editar veterinário' });
    }
};

// Deletar veterinário
const deletarVet = async (req, res) => {
    try {
        const { id } = req.body;

        const vet = await Veterinario.findByPk(id);

        if (!vet) {
            return res.status(404).json({ erro: 'Veterinário não encontrado' });
        }

        await vet.destroy();

        return res.json({ mensagem: 'Veterinário deletado' });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ erro: 'Erro ao deletar veterinário' });
    }
};

// Logout
const logoutVet = (req, res) => {
    req.session.destroy(err => {
        res.redirect('/inicial.html');
    });
};

module.exports = {
    loginVet,
    perfilVet,
    getTodosVets,
    getVetPorId,
    criarVet,
    editarVet,
    deletarVet,
    logoutVet
};
