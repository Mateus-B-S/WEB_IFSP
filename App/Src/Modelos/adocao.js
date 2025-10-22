const animal = require('./animal_modelo');
const responsavel = require('./responsavel_modelo');

let adocao = [
    { animal_id: 1, responsavel_nome: "Mateus Buchalla Santos", data_adocao: "2023-10-01", adotado: 1}
];

const getTodasAdocoes = () => adocao;


const criarAdocao = (animal_id, responsavel_nome, data_adocao) => {

    //verifica se o animal e o responsavel existem e se o animal ja foi adotado
    const ver1 = animal_id == animal.animais.find(a => a.id === animal_id && a.adotado === 0);
    const ver2 = responsavel_nome == responsavel.responsaveis.find(r => r.nome === responsavel_nome);
    
    
    if(ver1 && ver2){
        const newAdocao = {
        animal_id: animal_id,
        responsavel_nome: responsavel_nome,
        data_adocao: data_adocao,
        adotado: 1 //sempre que uma adoção é criada, o animal é marcado como adotado
        };
        adocao.push(newAdocao);
        return newAdocao;
    } 
    else {
        return null;
    };   
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
