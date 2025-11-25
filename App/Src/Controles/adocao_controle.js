const adocaoModelo = require('../Modelos/adocao_modelo');

const listarAdocoes = (req, res) => {
    const adocoes = adocaoModelo.getTodasAdocoes();
    res.status(200).json(adocoes);
};

const criarAdocao = (req, res) => {
    // tem alguns logs aqui para testar o erro
    const { animal_id, responsavel_nome } = req.body;
    console.log('Dados recebidos:', { animal_id, responsavel_nome, tipo_animal_id: typeof animal_id });
    
    const numId = Number(animal_id);
    console.log('ID convertido:', numId, 'tipo:', typeof numId);
    
    const novaAdocao = adocaoModelo.criarAdocao(numId, String(responsavel_nome));
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