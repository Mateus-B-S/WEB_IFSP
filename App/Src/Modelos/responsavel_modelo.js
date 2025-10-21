let responsaveis = [
    { id:1 , nome: "Aninha", email: "aninha@gmail.com", senha: "ANINHA123" }
];


const getResponsavelId = (id) => responsaveis.find(r => r.id === id);

const getTodosResponsaveis = () => responsaveis;

const criarResponsavel = (nome, email) =>  {
    const newResponsavel = {
        id: responsaveis.length > 0 ? Math.max(...responsaveis.map(r => r.id)) + 1 : 1,
        nome: nome,
        email: email
    };
    responsaveis.push(newResponsavel);
    return newResponsavel;
};
const editarResponsavel = (id, nome, email, senha) => {
    const resp = getResponsavelId(id);
    if (resp) {
        resp.nome = nome ?? resp.nome;
        resp.email = email ?? resp.email;
        resp.senha = senha ?? resp.senha;
        return resp;
    }
    return null;
};


module.exports = {
    responsaveis,
    criarResponsavel,
    editarResponsavel,
    getResponsavelId,
    getTodosResponsaveis
}