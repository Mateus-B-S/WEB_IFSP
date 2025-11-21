const adocaoModelo = require('../Modelos/adocao_modelo');

const listarAdocoes = (req, res) => {
    const adocoes = adocaoModelo.getTodasAdocoes();
    res.status(200).json(adocoes);
};

const criarAdocao = (req, res) => {
    const { animal_id, responsavel_nome } = req.body;
    const novaAdocao = adocaoModelo.criarAdocao(Number(animal_id), String(responsavel_nome));
    if (novaAdocao === null) {
        res.status(400).json({ mensagem: "Erro ao criar adoção. Responsável ou animal não registrados" });
    }
    else {
        return res.render('Avisos/adocao', { adocao: novaAdocao, emailResponsavel: req.session.user.email , senhaResponsavel: req.session.user.senha } );
    }    
};


const listarAdocoesPorResponsavel = (req, res) => {
    const { responsavel_nome } = req.body;
    const adocoes = adocaoModelo.todasAdocoesdeumResponsavel(responsavel_nome);
    if (!adocoes || adocoes.length === 0) {
        return res.status(404).json({ mensagem: "Nenhuma adoção encontrada para o responsável fornecido." });
    }
    res.render('Avisos/adocaoPorResp', { adocoes: adocoes, nomeResponsavel: responsavel_nome, adminSenha: req.session.user.adminSenha });
};

module.exports = {
    listarAdocoes,
    criarAdocao,
    listarAdocoesPorResponsavel
};