const Adocao = require('../models/adocao');
const Animal = require('../models/animal');
const Responsavel = require('../models/responsavel');

module.exports = {
  
  // -----------------------------
  // LISTAR TODAS AS ADOÇÕES
  // -----------------------------
  async listar(req, res) {
    try {
      const adocoes = await Adocao.findAll({
        include: [
          { model: Animal, attributes: ['id', 'nome', 'especie'] },
          { model: Responsavel, attributes: ['id', 'nome', 'telefone'] }
        ]
      });

      res.json(adocoes);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao listar adoções.' });
    }
  },

  // -----------------------------
  // BUSCAR UMA ADOÇÃO POR ID
  // -----------------------------
  async buscarPorId(req, res) {
    try {
      const { id } = req.params;

      const adocao = await Adocao.findByPk(id, {
        include: [
          { model: Animal },
          { model: Responsavel }
        ]
      });

      if (!adocao) {
        return res.status(404).json({ erro: 'Adoção não encontrada.' });
      }

      res.json(adocao);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao buscar adoção.' });
    }
  },

  // -----------------------------
  // CRIAR UMA NOVA ADOÇÃO
  // -----------------------------
  async criar(req, res) {
    try {
      const { data_adocao, animal_id, responsavel_id } = req.body;

      const novaAdocao = await Adocao.create({
        data_adocao,
        animal_id,
        responsavel_id
      });

      res.status(201).json(novaAdocao);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao criar adoção.' });
    }
  },

  // -----------------------------
  // ATUALIZAR UMA ADOÇÃO
  // -----------------------------
  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { data_adocao, animal_id, responsavel_id } = req.body;

      const adocao = await Adocao.findByPk(id);
      if (!adocao) {
        return res.status(404).json({ erro: 'Adoção não encontrada.' });
      }

      await adocao.update({
        data_adocao,
        animal_id,
        responsavel_id
      });

      res.json(adocao);
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao atualizar adoção.' });
    }
  },

  // -----------------------------
  // EXCLUIR UMA ADOÇÃO
  // -----------------------------
  async deletar(req, res) {
    try {
      const { id } = req.params;

      const adocao = await Adocao.findByPk(id);
      if (!adocao) {
        return res.status(404).json({ erro: 'Adoção não encontrada.' });
      }

      await adocao.destroy();
      res.json({ mensagem: 'Adoção removida com sucesso.' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ erro: 'Erro ao excluir adoção.' });
    }
  }

};
