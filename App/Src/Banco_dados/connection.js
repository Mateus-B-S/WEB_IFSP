CREATE DATABASE projetolegal;
USE projetolegal;
CREATE TABLE veterinarios (
	id INT auto_increment primary key,
    nome varchar(100) not null,
    prontuario char(6) not null unique,
    formacao ENUM("Animais de grande porte", "Animais domésticos", "Animais aquáticos", "Aves", "Caminhoneiro") not null
);

CREATE TABLE responsaveis (
	id INT auto_increment primary key,
    nome varchar(100) not null,
    email varchar(50) not null unique
);

CREATE TABLE animais (
	id INT auto_increment primary key,
    nome varchar(100) not null,
    tipo ENUM( "Grande porte", "Doméstico", "Aquático", "Ave", "Caminhão") not null,
    especie ENUM( "Cachorro", "Gato", "Peixe", "Bovino", "Calopsita", "Outro") not null,
    adotado BOOL
);

CREATE TABLE exame (
	id INT auto_increment primary key,
	prontuario_vet char(6) NOT NULL unique,
    id_animal INT not null,
    data_exame date not null,
    observacoes varchar(100),
    FOREIGN KEY (prontuario_vet) REFERENCES prontuario(veterinarios),
    FOREIGN KEY (id_animal) REFERENCES id(animais)
);

CREATE TABLE adocoes (
	id INT auto_increment primary key,
    animal_id INT not null,
    responsavel_nome varchar(100) not null,
    data_adocao date not null,
    FOREIGN KEY (animal_id) REFERENCES id(animais),
    FOREIGN KEY (responsavel_nome) REFERENCES nome(responsaveis)
);
