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



const criarAnimal = (req, res) => {
    const { nome, raca, tipo } = req.body;

    const novoAnimal = animalModelo.criarAnimal(nome, raca, tipo);
    res.status(201).json(novoAnimal)

};

const editarAnimal = (req, res) => {
    const { id, nome, raça, tipo, adotado } = req.body;
    
        const animalAtualizado = animalModelo.mudarAnimal(id, nome, raça, tipo, adotado);
        if (animalAtualizado) {
            res.json(animalAtualizado);
        }
        else {
            res.status(404).json({ mensagem: "Animal não encontrado." });
        }
};

module.exports = {
    getTodosAnimais,
    getAnimalPorId,
    criarAnimal,
    editarAnimal,
    animaisdisponiveis
}