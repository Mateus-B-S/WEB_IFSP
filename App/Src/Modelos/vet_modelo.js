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

const mudarVet = (id, prontuario, nome, formacao) => {
    const vet = getvetsId(id);
    if (vet) {
        vet.prontuario = prontuario ?? vet.prontuario;
        vet.nome = nome ?? vet.nome;
        vet.formacao = formacao ?? vet.formacao;
        return vet;
    }
    return null;
};

const deleteVet = (id) => {
    const index = vets.findIndex(v => v.id === id);
    if (index !== -1) {
        vets.splice(index, 1);
        return true;
    }
    return false;
};

module.exports = {
 vets,
 getTodosvets,
 getvetsId,
 criarvet,
 mudarVet,
 deleteVet
};