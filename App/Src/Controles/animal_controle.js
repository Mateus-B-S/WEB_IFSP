const animalModelo = require('../Modelos/animal_modelo');


//depois mudar para busca por tipo do animal
const getAnimalPorId = async (req, res) => {
    const  id  = req.query.id;
    const adminSenha = req.session.user ? req.session.user.adminSenha : null;
    const animal = await Promise.resolve(animalModelo.getAnimalId(parseInt(id)));
    if (animal) {
        res.render('Avisos/animalId', { animal: animal, adminSenha: adminSenha});
    } else {
        res.status(404).json({ mensagem: "Animal não encontrado." });
    }
};



const criarAnimal = async (req, res) => {
    const novoAnimal = await Promise.resolve(animalModelo.criarAnimal(req.body));
    res.render('Avisos/criarAnimal', { animal: novoAnimal, adminSenha: req.session.user.adminSenha } );

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

const animaisdisponiveis = async (req, res) => {
    const animais = await animalModelo.animaisdisponiveis();
    res.status(200).json(animais);
};  

const deletarAnimal = async (req, res) => {
    const { id } = req.body;
    await Promise.resolve(animalModelo.deleteAnimal(id));
    res.json({ mensagem: "Animal deletado com sucesso." });
};


module.exports = { 
    getAnimalPorId,
    criarAnimal,
    editarAnimal,
    animaisdisponiveis,
    deletarAnimal
}