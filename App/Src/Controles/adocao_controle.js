const adocaoModelo = require('../Modelos/adocao_modelo');

const listarAdocoes = (req, res) => {
    const adocoes = adocaoModelo.getTodasAdocoes();
    res.status(200).json(adocoes);
};

const criarAdocao = (req, res) => {
    const { animal_id, responsavel_nome, data_adocao } = req.body;
    const novaAdocao = adocaoModelo.criarAdocao(animal_id, responsavel_nome, data_adocao);
    if (!novaAdocao) {
        res.status(400).json({ mensagem: "Erro ao criar adoção. Responsável ou animal não registrados" });
    }
    res.status(201).json(novaAdocao);   
};


const listarAdocoesPorResponsavel = (req, res) => {
    const { responsavel_nome } = req.body;
    const adocoes = adocaoModelo.todasAdocoesdeumResponsavel(responsavel_nome);
    if (!adocoes || adocoes.length === 0) {
        return res.status(404).json({ mensagem: "Nenhuma adoção encontrada para o responsável fornecido." });
    }
    res.status(200).json(adocoes);
};

module.exports = {
    listarAdocoes,
    criarAdocao,
    listarAdocoesPorResponsavel
};