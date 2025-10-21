const animal = require('./animal_modelo');
const vet = require('./vet_modelo');

let exame_medico = [
    {  animal_id: 1, vet_prontuario: "JC0001", data_exame: "2023-10-15", observacoes: "Tudo ok" }
];

const getTodosExames = () => exame_medico;

const criarExameMedico = (animal_id, vet_prontuario, data_exame, observacoes) =>  {
    const ver1 = animal_id == animal.animais.find(a => a.id === animal_id);
    const ver2 = vet_prontuario == vet.vets.find(v => v.prontuario === vet_prontuario);
    if (ver1 && ver2) { 
        const newExame = {
            animal_id: animal_id,
            vet_prontuario: vet_prontuario,
            data_exame: data_exame,
            observacoes: observacoes
        };
        exame_medico.push(newExame);
        return newExame;
    }
    return null;
};

const getExamesporVet = (vet_prontuario) => {
    return exame_medico.filter(e => e.vet_prontuario === vet_prontuario);
};

module.exports = {
    exame_medico,
    criarExameMedico,
    getTodosExames,
    getExamesporVet
}

