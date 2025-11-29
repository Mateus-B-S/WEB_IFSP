// Src/Controles/adocao_controle.js
const Adocao = require('../Modelos/adocao_modelo');
const Animal = require('../Modelos/animal_modelo');
const Responsavel = require('../Modelos/responsavel_modelo');

module.exports = {

  // LISTAR TODAS AS ADOÇÕES
  async listar(req, res) {
    try {
      const adocoes = await Adocao.findAll({
        include: [
          { model: Animal, attributes: ['id', 'nome', 'especie', 'adotado'] },
          { model: Responsavel, attributes: ['id', 'nome', 'email'] }
        ]
      });

      return res.json(adocoes);
    } catch (error) {
      console.error('listar adocoes erro:', error);
      return res.status(500).json({ erro: 'Erro ao listar adoções.' });
    }
  },

  // LISTAR ADOÇÕES POR RESPONSÁVEL (nova funcionalidade)
  async listarAdocoesPorResponsavel(req, res) {
    try {
      const { responsavel_id } = req.body;

      if (!responsavel_id) {
        return res.status(400).json({ erro: "Você deve informar o 'responsavel_id' no body." });
      }

      const adocoes = await Adocao.findAll({
        where: { responsavel_id },
        include: [
          { model: Animal, attributes: ['id', 'nome', 'especie', 'adotado'] },
          { model: Responsavel, attributes: ['id', 'nome', 'email'] }
        ]
      });

      if (!adocoes || adocoes.length === 0) {
        return res.status(404).json({ mensagem: 'Nenhuma adoção encontrada para esse responsável.' });
      }

      return res.json(adocoes);
    } catch (error) {
      console.error('listarAdocoesPorResponsavel erro:', error);
      return res.status(500).json({ erro: 'Erro ao listar adoções do responsável.' });
    }
  },

  // BUSCAR UMA ADOÇÃO POR ID
  async buscarPorId(req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ erro: 'ID obrigatório na rota.' });

      const adocao = await Adocao.findByPk(id, {
        include: [
          { model: Animal, attributes: ['id', 'nome', 'especie', 'adotado'] },
          { model: Responsavel, attributes: ['id', 'nome', 'email'] }
        ]
      });

      if (!adocao) return res.status(404).json({ erro: 'Adoção não encontrada.' });

      return res.json(adocao);
    } catch (error) {
      console.error('buscarPorId erro:', error);
      return res.status(500).json({ erro: 'Erro ao buscar adoção.' });
    }
  },

  // CRIAR UMA NOVA ADOÇÃO
  async criar(req, res) {
    try {
      const { data_adocao, animal_id, responsavel_id } = req.body;

      if (!data_adocao || !animal_id || !responsavel_id) {
        return res.status(400).json({ erro: 'Campos obrigatórios: data_adocao, animal_id, responsavel_id.' });
      }

      // (opcional) checar existência do animal e do responsavel
      // const animalExists = await Animal.findByPk(animal_id);
      // const respExists = await Responsavel.findByPk(responsavel_id);
      // if (!animalExists || !respExists) return res.status(400).json({ erro: 'Animal ou responsável inválido.' });

      const novaAdocao = await Adocao.create({
        data_adocao,
        animal_id,
        responsavel_id
      });

      return res.status(201).json(novaAdocao);
    } catch (error) {
      console.error('criar erro:', error);
      return res.status(500).json({ erro: 'Erro ao criar adoção.' });
    }
  },

  // ATUALIZAR UMA ADOÇÃO
  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { data_adocao, animal_id, responsavel_id } = req.body;

      if (!id) return res.status(400).json({ erro: 'ID obrigatório na rota.' });

      const adocao = await Adocao.findByPk(id);
      if (!adocao) return res.status(404).json({ erro: 'Adoção não encontrada.' });

      await adocao.update({ data_adocao, animal_id, responsavel_id });

      return res.json(adocao);
    } catch (error) {
      console.error('atualizar erro:', error);
      return res.status(500).json({ erro: 'Erro ao atualizar adoção.' });
    }
  },

  // EXCLUIR UMA ADOÇÃO
  async deletar(req, res) {
    try {
      const { id } = req.params;
      if (!id) return res.status(400).json({ erro: 'ID obrigatório na rota.' });

      const adocao = await Adocao.findByPk(id);
      if (!adocao) return res.status(404).json({ erro: 'Adoção não encontrada.' });

      await adocao.destroy();
      return res.json({ mensagem: 'Adoção removida com sucesso.' });
    } catch (error) {
      console.error('deletar erro:', error);
      return res.status(500).json({ erro: 'Erro ao excluir adoção.' });
    }
  }

};
