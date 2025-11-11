let vets = [
    { id:1 , prontuario: "JC0001" ,nome: "Dora Aventureira", formacao: "Animais de grande porte", senha: "MAPA"}
];

const getTodosvets = () => vets;
const getProntuarioVet = (prontuario) => vets.find(a => a.prontuario === prontuario);
const getvetsId = (id) => vets.find(a => a.id === id);


const criarvet = (prontuario, nome, formacao, senha) =>  {
 const newvets = {
    id: vets.length > 0 ? Math.max(...vets.map(a => a.id)) + 1 : 1, 
    prontuario: prontuario,
    nome: nome,
    formacao: formacao,
    senha: senha
 };
 vets.push(newvets);
    return newvets;
};

const mudarVet = (id, prontuario, nome, formacao, senha) => {
    const vet = getvetsId(id);
    if (vet) {
        vet.prontuario = prontuario ?? vet.prontuario;
        vet.nome = nome ?? vet.nome;
        vet.formacao = formacao ?? vet.formacao;
        vet.senha = senha ?? vet.senha;
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
 getProntuarioVet,
 getTodosvets,
 getvetsId,
 criarvet,
 mudarVet,
 deleteVet
};