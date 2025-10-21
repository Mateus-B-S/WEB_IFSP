let autor = [{ id:1 , nome: "Tim Burtom",  qtd_filmes: 5}
]

const getTodosAutores = () => autor;
const getAutorId = (id) => autor.find(a => a.id === id);
const criarAutor = (nome, qtd_filmes) =>  {
 const newAutor = {
 id: autor.length > 0 ? Math.max(...autor.map(a => a.id)) + 1 : 1, 
 nome: nome,
 qtd_filmes: qtd_filmes
 };
 autor.push(newAutor);
 return newAutor;
};

module.exports = {
 getTodosAutores,
 getAutorId,
 criarAutor
};