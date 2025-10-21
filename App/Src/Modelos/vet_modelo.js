let vets = [
    { id:1 , prontuario: "JC0001" ,nome: "Mateus BUchalla Santos", formacao: "Animais de grande porte" }
];

const getTodosvets = () => vets;


const getvetsId = (id) => vets.find(a => a.id === id);


const criarvet = (nome, prontuario, nome, formacao) =>  {
 const newvets = {
    id: vets.length > 0 ? Math.max(...vets.map(a => a.id)) + 1 : 1, 
    prontuario: prontuario,
    nome: nome,
    formacao: formacao
 };
 vets.push(newvets);
 return null;
};

module.exports = {
 vets,
 getTodosvets,
 getvetsId,
 criarvet
};