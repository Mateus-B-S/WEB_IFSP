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
    const adminSenha = req.session.user ? req.session.user.adminSenha : null;
    const animal = Promise.resolve(animalModelo.getAnimalId(parseInt(id)));
    if (animal) {
        res.render('Avisos/animalId', { animal: animal, adminSenha: adminSenha});
    } else {
        res.status(404).json({ mensagem: "Animal não encontrado." });
    }
};



const criarAnimal = (req, res) => {
    const novoAnimal = Promise.resolve(animalModelo.criarAnimal(req.body));
    res.render('Avisos/criarAnimal', { animal: novoAnimal, adminSenha: req.session.user.adminSenha } );

};

const editarAnimal = (req, res) => {
    const { id } = req.body;
    
        const animalAtualizado = animalModelo.mudarAnimal(id, req.body);
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