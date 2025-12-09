const adocaoModelo = require('../Modelos/adocao_modelo');




const criarAdocao = async (req, res) => {
    const { responsavel_id, animal_id, data_adocao } = req.body;
    const novaAdocao = await Promise.resolve(adocaoModelo.criarAdocao(animal_id, { responsavel_id: responsavel_id, animal_id: animal_id, data_adocao: data_adocao }));
    console.log('Resultado adoção:', novaAdocao);
    if (novaAdocao === null) {
        console.log('Erro: animal não encontrado ou já adotado, ou responsável não existe');
        res.status(400).json({ mensagem: "Erro ao criar adoção. Responsável ou animal não registrados" });
    }
    else {
        console.log('Adoção criada com sucesso');
        return res.render('Avisos/adocao', { adocao: novaAdocao, 
            emailResponsavel: req.session.user.email , 
            senhaResponsavel: req.session.user.senha,
            nomeResponsavel: req.session.user.nome,
            nomeAnimal: req.body.nome_animal } );
    }    
};


const listarAdocoesPorResponsavel = async (req, res) => {
    const { responsavel_nome } = req.body;
    //const responsavel = await Promise.resolve(responsavelModelo.Responsavel.findOne({ where: { nome: responsavel_nome } }));
    const adocoes = await Promise.resolve(adocaoModelo.todasAdocoesdeumResponsavel(responsavel_nome));
    if (!adocoes || adocoes.length === 0) {
        return res.status(404).json({ mensagem: "Nenhuma adoção encontrada para o responsável fornecido." });
    }
    res.render('Avisos/adocaoPorResp', { adocoes: adocoes, nomeResponsavel: responsavel_nome, adminSenha: req.session.user.adminSenha });
};

const editarAdocao = async (req, res) => {
    const { id } = req.body;
    const adocaoAtualizada = await Promise.resolve(adocaoModelo.atualizarAdocao(id, req.body));
    if (adocaoAtualizada) {
        res.json(adocaoAtualizada);
        //res.render('Avisos/atualizarAdocao', { adocao: adocaoAtualizada });
    }
    else {
        res.status(404).json({ mensagem: "Adoção não encontrada." });
    }
};

const deleteAdocao = async (req, res) => {
    const { id } = req.body;
    await Promise.resolve(adocaoModelo.deleteAdocao(id));
    res.render('Perfil/admin', { adminSenha: req.session.user.adminSenha});
};

module.exports = {
    
    criarAdocao,
    listarAdocoesPorResponsavel,
    editarAdocao,
    deleteAdocao
};