let vets = [{ id:1 , nome: "Tim Burtom",  qtd_filmes: 5}
]

const getTodosvetses = () => vets;


const getvetsId = (id) => vets.find(a => a.id === id);


const criarvet = (nome, qtd_filmes) =>  {
 const newvets = {
 id: vets.length > 0 ? Math.max(...vets.map(a => a.id)) + 1 : 1, 
 nome: nome,
 qtd_filmes: qtd_filmes
 };
 vets.push(newvets);
 return newvets;
};

module.exports = {
 vets,
 getTodosvetses,
 getvetsId,
 criarvet
};