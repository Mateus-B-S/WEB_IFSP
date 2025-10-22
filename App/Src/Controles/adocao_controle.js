const adocaoModelo = require('../Modelos/adocao');

const listarAdocoes = (req, res) => {
    const adocoes = adocaoModelo.getTodasAdocoes();
    res.status(200).json(adocoes);
};

const criarAdocao = (req, res) => {
    const { animal_id, responsavel_nome, data_adocao } = req.body;
    const novaAdocao = adocaoModelo.criarAdocao(animal_id, responsavel_nome, data_adocao);
    if (novaAdocao !== null) {
        res.status(201).json(novaAdocao);
    }
    else {
        res.status(400).json({ mensagem: "Erro ao criar adoção. Verifique os dados fornecidos." });
    }
};

//função só para admins

const listarAdocoesPorResponsavel = (req, res) => {
    const { responsavel_nome, tipo_conta } = req.body;
    if (tipo_conta && tipo_conta === "Admin") {
        const adocoes = adocaoModelo.todasAdocoesdeumResponsavel(responsavel_nome);
        res.status(200).json(adocoes);
    }
    else {
        res.status(403).json({ mensagem: "Acesso negado. Apenas administradores podem acessar esta rota." });
    }
};

module.exports = {
    listarAdocoes,
    criarAdocao,
    listarAdocoesPorResponsavel
};