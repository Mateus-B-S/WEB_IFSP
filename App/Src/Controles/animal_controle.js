const Animal = require('../Modelos/animal_modelo');

// LISTAR TODOS OS ANIMAIS
exports.listarAnimais = async (req, res) => {
    try {
        const animais = await Animal.findAll();
        res.json(animais);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: "Erro ao buscar animais" });
    }
};

// BUSCAR UM ANIMAL POR ID
exports.buscarAnimalPorId = async (req, res) => {
    try {
        const { id } = req.params;

        const animal = await Animal.findByPk(id);

        if (!animal) {
            return res.status(404).json({ erro: "Animal não encontrado" });
        }

        res.json(animal);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: "Erro ao buscar animal" });
    }
};

// CRIAR ANIMAL
exports.criarAnimal = async (req, res) => {
    try {
        const { nome, raça, adotado } = req.body;

        const novoAnimal = await Animal.create({
            nome,
            raça,
            adotado
        });

        res.status(201).json(novoAnimal);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: "Erro ao criar animal" });
    }
};

// ATUALIZAR ANIMAL
exports.atualizarAnimal = async (req, res) => {
    try {
        const { id } = req.params;

        const animal = await Animal.findByPk(id);

        if (!animal) {
            return res.status(404).json({ erro: "Animal não encontrado" });
        }

        const { nome, raça, adotado } = req.body;

        await animal.update({
            nome,
            raça,
            adotado
        });

        res.json(animal);
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: "Erro ao atualizar animal" });
    }
};

// DELETAR ANIMAL
exports.deletarAnimal = async (req, res) => {
    try {
        const { id } = req.params;

        const animal = await Animal.findByPk(id);

        if (!animal) {
            return res.status(404).json({ erro: "Animal não encontrado" });
        }

        await animal.destroy();

        res.json({ mensagem: "Animal deletado com sucesso" });
    } catch (err) {
        console.error(err);
        res.status(500).json({ erro: "Erro ao deletar animal" });
    }
};
