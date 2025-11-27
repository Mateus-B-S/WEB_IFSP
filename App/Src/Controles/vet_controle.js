const Veterinario = require('../models/veterinario');

module.exports = {
  
  // Criar veterinário
  async criar(req, res) {
    try {
      const { nome, formacao, prontuario } = req.body;

      const novoVet = await Veterinario.create({
        nome,
        formacao,
        prontuario
      });

      return res.status(201).json(novoVet);

    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: 'Erro ao criar veterinário' });
    }
  },


  // Listar todos
  async listar(req, res) {
    try {
      const vets = await Veterinario.findAll();
      return res.status(200).json(vets);

    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: 'Erro ao listar veterinários' });
    }
  },


  // Buscar por ID
  async buscarPorId(req, res) {
    try {
      const { id } = req.params;

      const vet = await Veterinario.findByPk(id);

      if (!vet)
        return res.status(404).json({ erro: 'Veterinário não encontrado' });

      return res.status(200).json(vet);

    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: 'Erro ao buscar veterinário' });
    }
  },


  // Atualizar
  async atualizar(req, res) {
    try {
      const { id } = req.params;
      const { nome, formacao, prontuario } = req.body;

      const vet = await Veterinario.findByPk(id);

      if (!vet)
        return res.status(404).json({ erro: 'Veterinário não encontrado' });

      await vet.update({ nome, formacao, prontuario });

      return res.status(200).json(vet);

    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: 'Erro ao atualizar veterinário' });
    }
  },


  // Deletar
  async deletar(req, res) {
    try {
      const { id } = req.params;

      const vet = await Veterinario.findByPk(id);

      if (!vet)
        return res.status(404).json({ erro: 'Veterinário não encontrado' });

      await vet.destroy();

      return res.status(200).json({ mensagem: 'Veterinário deletado com sucesso' });

    } catch (error) {
      console.error(error);
      return res.status(500).json({ erro: 'Erro ao deletar veterinário' });
    }
  }

};
