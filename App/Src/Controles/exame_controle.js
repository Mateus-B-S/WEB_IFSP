// controllers/exameController.js
const Exame = require('../Modelos/exame_medico');
const Animal = require('../Modelos/animal_modelo');
const Veterinario = require('../Modelos/vet_modelo');

// listar os exames com join
exports.listarExames = async (req, res) => {
    try {
        const exames = await Exame.findAll({
            include: [
                { model: Animal, attributes: ['id', 'nome', 'raça', 'adotado'] },
                { model: Veterinario, attributes: ['id', 'nome', 'prontuario', 'formacao'] }
            ]
        });

        res.json(exames);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: "Erro ao buscar exames" });
    }
};

// aqui é busca por id, acho q tinha
exports.buscarExamePorId = async (req, res) => {
    try {
        const { id } = req.params;

        const exame = await Exame.findByPk(id, {
            include: [
                { model: Animal },
                { model: Veterinario }
            ]
        });

        if (!exame) {
            return res.status(404).json({ erro: "Exame não encontrado" });
        }

        res.json(exame);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: "Erro ao buscar exame" });
    }
};

// cria os exames
exports.criarExame = async (req, res) => {
    try {
        const { prontuario_vet, id_animal, data_exame, observacoes } = req.body;

        const novoExame = await Exame.create({
            prontuario_vet,
            id_animal,
            data_exame,
            observacoes
        });

        res.status(201).json(novoExame);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: "Erro ao criar exame" });
    }
};

// atualiza os exames
exports.atualizarExame = async (req, res) => {
    try {
        const { id } = req.params;

        const exame = await Exame.findByPk(id);

        if (!exame) {
            return res.status(404).json({ erro: "Exame não encontrado" });
        }

        const { prontuario_vet, id_animal, data_exame, observacoes } = req.body;

        await exame.update({
            prontuario_vet,
            id_animal,
            data_exame,
            observacoes
        });

        res.json(exame);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: "Erro ao atualizar exame" });
    }
};

// deleta os exames
exports.deletarExame = async (req, res) => {
    try {
        const { id } = req.params;

        const exame = await Exame.findByPk(id);

        if (!exame) {
            return res.status(404).json({ erro: "Exame não encontrado" });
        }

        await exame.destroy();

        res.json({ mensagem: "Exame deletado com sucesso" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: "Erro ao deletar exame" });
    }
};

// aq ele lista exames por veterinário
exports.listarExamesPorVet = async (req, res) => {
    try {
        const { prontuario_vet } = req.body;

        const exames = await Exame.findAll({
            where: { prontuario_vet },
            include: [
                { model: Animal },
                { model: Veterinario }
            ]
        });

        res.json(exames);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: "Erro ao buscar exames do veterinário" });
    }
};


