let animais = [
    { id:1 , nome: "Rex", raça: "Cachorro", tipo: "doméstico"}
];

//funções 
const getTodosAnimais = () => animais;
const getAnimalId = (id) => animais.find(a => a.id === id);
const criarAnimal = (nome, raça, tipo) =>  {
 const newAnimal = {
 id: animais.length > 0 ? Math.max(...animais.map(a => a.id)) + 1 : 1,
    nome: nome,
    raça: raça,
    tipo: tipo
 };
 animais.push(newAnimal);
 return newAnimal;
};

const mudarAnimal = (id, nome, raça, tipo) => {
    const animal = getAnimalId(id);
    if (animal) {
        animal.nome = nome || animal.nome;
        animal.raça = raça || animal.raça;
        animal.tipo = tipo || animal.tipo;
        return animal;
    }
    return null;
};

module.exports = {
    animais,
    getTodosAnimais,
    getAnimalId,
    criarAnimal,
    mudarAnimal
};