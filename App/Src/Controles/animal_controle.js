const animalModelo = require('../Modelos/animal_modelo');

const getTodosAnimais = (req, res) => {
    const animais = animalModelo.getTodosAnimais();
    res.json(animais);
};

const animaisdisponiveis = (req, res) => {
    const animais = animalModelo.animaisdisponiveis();
    res.json(animais);
}


//depois mudar para busca por tipo do animal
const getAnimalPorId = (req, res) => {
    const  id  = req.query.id;
    const animal = animalModelo.getAnimalId(parseInt(id));
    if (animal) {
        res.json(animal);
    } else {
        res.status(404).json({ mensagem: "Animal não encontrado." });
    }
};

//funções só para admins ou veterinarios

const criarAnimal = (req, res) => {
    const { nome, raca, tipo, tipo_conta } = req.body;
    if (tipo_conta && tipo_conta === "Admin" || tipo_conta === "Veterinario") {
        const novoAnimal = animalModelo.criarAnimal(nome, raca, tipo);
        res.status(201).json(novoAnimal)
    }
    else {
        res.status(403).json({ mensagem: "Acesso negado. Apenas administradores podem acessar esta rota." });
    }
};

const editarAnimal = (req, res) => {
    const { id, nome, raça, tipo, adotado, tipo_conta } = req.body;
    if (tipo_conta && tipo_conta === "Admin" || tipo_conta === "Veterinario") {
        const animalAtualizado = animalModelo.mudarAnimal(id, nome, raça, tipo, adotado);
        if (animalAtualizado) {
            res.json(animalAtualizado);
        }
        else {
            res.status(404).json({ mensagem: "Animal não encontrado." });
        }
    }
    else {
        res.status(403).json({ mensagem: "Acesso negado. Apenas administradores podem acessar esta rota." });
    }
};

module.exports = {
    getTodosAnimais,
    getAnimalPorId,
    criarAnimal,
    editarAnimal,
    animaisdisponiveis
}