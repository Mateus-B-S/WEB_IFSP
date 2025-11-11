const animal = require('./animal_modelo');
const responsavel = require('./responsavel_modelo');

let adocao = [
    { animal_id: 1, animal_nome: animal.getAnimalId(1).nome, animal_raça: animal.getAnimalId(1).raça , responsavel_nome: "Aninha", data_adocao: "2023-10-01", adotado: 1}
];

const getTodasAdocoes = () => adocao;


const criarAdocao = (animal_id, responsavel_nome) => {

    // verifica se o animal e o responsavel existem e se o animal ainda está disponível
    const id = Number(animal_id);
    const nomeResp = String(responsavel_nome);

    const animalObj = animal.animais.find(a => a.id === id && a.adotado === 0);
    const responsavelObj = responsavel.responsaveis.find(r => r.nome === nomeResp);

    if (animalObj && responsavelObj) {
        const newAdocao = {
            animal_id: id,
            animal_nome: animal.getAnimalId(id).nome,
            animal_raça: animal.getAnimalId(id).raça,
            responsavel_nome: nomeResp,
            data_adocao: new Date().toISOString().split('T')[0],
            adotado: 1 // sempre que uma adoção é criada, o animal é marcado como adotado
        };

        adocao.push(newAdocao);
        // atualizar o animal no modelo para refletir que foi adotado
        if (typeof animal.mudarAnimal === 'function') {
            animal.mudarAnimal(id, undefined, undefined, undefined, 1);
        } else {
            // fallback: alterar diretamente
            const a = animal.getAnimalId(id);
            if (a) a.adotado = 1;
        }

        return newAdocao;
    }

    return null;
};

const todasAdocoesdeumResponsavel = (responsavel_nome) => {
    return adocao.filter(a => a.responsavel_nome === responsavel_nome);
};

module.exports = {
    animal,
    adocao,
    getTodasAdocoes,
    criarAdocao,
    todasAdocoesdeumResponsavel
};



//const { DataTypes } = require('sequelize');
//const sequelize = require('../config/db');
//const animal = require('./animal');
//const responsavel = require('./responsavel')


//const adocao = sequelize.define('adocoes', {
  //id: {
    //type: DataTypes.INTEGER,
    //primaryKey: true,
    //autoIncrement: true
 // },
  //data_adocao: {
    //type: DataTypes.DATEONLY,
    //allowNull: false
 // }


//}, {
  //tableName: 'adocoes',
  //timestamps: false
//});

//module.exports = adocao;

//Animal.hasOne(Adocao, { foreignKey: 'animal_id' });
//Adocao.belongsTo(Animal, { foreignKey: 'animal_id' });

//Responsavel.hasMany(Adocao, { foreignKey: 'responsavel_id' });
//Adocao.belongsTo(Responsavel, { foreignKey: 'responsavel_id' });

//a função é essa, mas não sei bem o que fazer com o resto vei