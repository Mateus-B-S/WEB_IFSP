const animal = require('./animal_modelo');
const vet = require('./vet_modelo');

let exame_medico = [
    {  animal_id: 1, vet_prontuario: "JC0001", data_exame: "2023-10-15", observacoes: "Tudo ok" }
];

const getTodosExames = () => exame_medico;

const criarExameMedico = (animal_id, vet_prontuario, observacoes) =>  {
    const ver1 = animal_id == animal.getAnimalId(Number(animal_id)).id;
    const ver2 = vet_prontuario == vet.getProntuarioVet(String(vet_prontuario)).prontuario;
    if (ver1 && ver2) { 
        const newExame = {
            animal_id: animal_id,
            vet_prontuario: vet_prontuario,
            data_exame: new Date().toISOString().split('T')[0],
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


//const { DataTypes } = require('sequelize');
//const sequelize = require('../config/db');
//const prontuario_vet = require('./vet');
//const id_animal  = require('./animal')


//const exames = sequelize.define('Exames', {
  //id: {
    //type: DataTypes.INTEGER,
    //primaryKey: true,
    //autoIncrement: true
 // },
  //data_exame: {
    //type: DataTypes.DATEONLY,
    //allowNull: false
 // }

  //observacoes: {
    //type: DataTypes.STRING,
    //allowNull: false
 // }

//}, {
  //tableName: 'exame',
  //timestamps: false
//});

//module.exports = exame;

//Animal.hasOne(Adocao, { foreignKey: 'id_animal' });
//Adocao.belongsTo(Animal, { foreignKey: 'id_animal' });

//Veterinario.hasMany(Exames, { foreignKey: 'prontuario_vet' });
//Exames.belongsTo(Veterinario, { foreignKey: 'prontuario_vet' });
