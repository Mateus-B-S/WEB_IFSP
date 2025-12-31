const animalModelo = require('../Modelos/animal_modelo');
const adocaoModelo = require('../Modelos/adocao_modelo');
const exameModelo = require('../Modelos/exame_medico');


//depois mudar para busca por tipo do animal
const getAnimalPorId = async (req, res) => {
    const  id  = req.query.id;
    const adminSenha = req.session.user ? req.session.user.adminSenha : null;
    const animal = await Promise.resolve(animalModelo.getAnimalId(parseInt(id)));
    if (animal) {
        res.render('Avisos/Animal/animalId', { animal: animal, adminSenha: adminSenha});
    } else {
        res.status(404).json({ mensagem: "Animal não encontrado." });
    }
};

const mostrarDetalhesAnimal = async (req, res) => {
    const id = req.params.id;
    
    const animal = await Promise.resolve(animalModelo.getAnimalId(parseInt(id)));

    const exames = await exameModelo.getExamesPorAnimal(animal.nome);

    if (animal) {
        res.render('Avisos/Animal/detalhes', { animal: animal, exames: exames, respSenha: req.session.user.senha, 
            respNome: req.session.user.nome, respEmail: req.session.user.email, respId: req.session.user.id_responsavel
        });
    } else {
        res.status(404).json({ mensagem: "Animal não encontrado." });
    }
};

const criarAnimal = async (req, res) => {
    if (req.file) {
       req.body.imagem = '/img/animais/' + req.file.filename; //faz a img que o adm colocar ficar salva na pasta de animais, pra incluir o autor é mto trampo
    } 

       if (!req.body.descricao) {
           delete req.body.descricao;//remove o campo vazio pra aparecer "sem descrição" no sequelize
       }

       if (!req.body.imagem) {
           delete req.body.imagem;//remove o campo vazio pra aparecer "sem imagem" no sequelize
       } 
    const novoAnimal = await Promise.resolve(animalModelo.criarAnimal(req.body));
       if (novoAnimal) {
           res.render('Avisos/Animal/criarAnimal', { animal: novoAnimal, adminSenha: req.session.user.adminSenha } );
       } else {
           req.flash('error','erro ao adicionar animal');
           return res.redirect('Perfil/admin', { messages: req.flash() });
       }
   
    

};

const devolverAnimal = async (req, res) => {
    const { id } = req.body;
    
    await adocaoModelo.deleteAdocao(id); // remover adoção associada
        const animalAtualizado = await Promise.resolve(animalModelo.devolverAnimal(id));
        if (animalAtualizado) {
            res.render('Avisos/Animal/devolverAnimal', { animal: animalAtualizado, adminSenha: req.session.user.adminSenha } );
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
    try {
        await exameModelo.deleteExameporAnimal(id); // remover exames associados
        const deleted = await animalModelo.deleteAnimal(id);
        if (!deleted) {
            // nenhum registro removido
            return res.status(404).render('Avisos/deletarAnimal', { adminSenha: req.session.user.adminSenha, mensagem: 'Animal não encontrado.' });
        }
        res.render('Avisos/Animal/deletarAnimal', { adminSenha: req.session.user.adminSenha } );
    } catch (err) {
        console.error('Erro ao deletar animal:', err);
        // Mensagem mais amigável para a view; pode ser erro de FK (registro referenciado)
        const mensagem = err && err.original && err.original.sqlMessage
            ? `Erro do banco: ${err.original.sqlMessage}`
            : 'Erro ao deletar animal.';
        res.status(500).render('Avisos/deletarAnimal', { adminSenha: req.session.user.adminSenha, erro: mensagem });
    }
};


module.exports = { 
    getAnimalPorId,
    criarAnimal,
    devolverAnimal,
    animaisdisponiveis,
    deletarAnimal,
    editarAnimal,
    mostrarDetalhesAnimal
}