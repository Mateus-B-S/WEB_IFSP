const adocaoModelo = require('../Modelos/adocao_modelo');
const responsavelModelo = require('../Modelos/responsavel_modelo');

const listarAdocoes = (req, res) => {
    const adocoes = adocaoModelo.getTodasAdocoes();
    res.status(200).json(adocoes);
};

const criarAdocao = (req, res) => {
    
    const novaAdocao = adocaoModelo.criarAdocao(req.body);
    console.log('Resultado adoção:', novaAdocao);
    
    if (novaAdocao === null) {
        console.log('Erro: animal não encontrado ou já adotado, ou responsável não existe');
        res.status(400).json({ mensagem: "Erro ao criar adoção. Responsável ou animal não registrados" });
    }
    else {
        console.log('Adoção criada com sucesso');
        return res.render('Avisos/adocao', { adocao: novaAdocao, emailResponsavel: req.session.user.email , senhaResponsavel: req.session.user.senha } );
    }    
};


const listarAdocoesPorResponsavel = (req, res) => {
    const { responsavel_nome } = req.body;
    const responsavel = responsavelModelo.Responsavel.findOne({ where: { nome: responsavel_nome } });
    const adocoes = adocaoModelo.todasAdocoesdeumResponsavel(responsavel.id);
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