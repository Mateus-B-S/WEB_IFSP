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

const devolverAnimal = async (req, res) => {
    const { id } = req.body;
    
        const animalAtualizado = await Promise.resolve(animalModelo.devolverAnimal(id));
        if (animalAtualizado) {
            res.render('Avisos/devolverAnimal', { animal: animalAtualizado, adminSenha: req.session.user.adminSenha } );
        }
        else {
            res.status(404).json({ mensagem: "Animal não encontrado." });
        }
};

const editarAnimal = async (req, res) => {
    const { id } = req.body;
    const animalAtualizado = await Promise.resolve(animalModelo.editarAnimal(id, req.body));
    if (animalAtualizado) {
        res.send('Animal atualizado com sucesso.');
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
    res.render('Avisos/deletarAnimal', { adminSenha: req.session.user.adminSenha} );
};


module.exports = { 
    getAnimalPorId,
    criarAnimal,
    devolverAnimal,
    animaisdisponiveis,
    deletarAnimal,
    editarAnimal
}