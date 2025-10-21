const modeloAutor = require('../Modelos/autor_modelo');


const getTodosAutores = (req, res) => {
    const autores = modeloAutor.getTodosAutores();
    res.json(autores);
};

const getAutorId = (req, res) => {
    const id = Number(req.params.id);
    const autor = modeloAutor.getAutorId(id);
    if (autor) {
        res.json(autor);
    }
    else {
        res.status(404).json({ mensagem: 'Autor não encontrado' });
    }
};

module.exports = {
    getTodosAutores,
    getAutorId
}