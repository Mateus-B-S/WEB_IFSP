CREATE DATABASE IF NOT EXISTS projetolegal ;
USE projetolegal;
CREATE TABLE IF NOT EXISTS veterinarios (
	id INT auto_increment primary key,
    nome varchar(100) not null,
    prontuario char(6) not null unique,
    formacao ENUM("Animais de grande porte", "Animais domésticos", "Animais aquáticos", "Aves", "Caminhoneiro") not null
);

CREATE TABLE IF NOT EXISTS admins (
    id INT auto_increment primary key,
    senha INT not null 
);

CREATE TABLE IF NOT EXISTS responsaveis (
	id INT auto_increment primary key,
	nome varchar(100) not null,
    email varchar(50) not null unique
);

CREATE TABLE IF NOT EXISTS animais (
	id INT auto_increment primary key,
    nome varchar(100) not null,
    tipo ENUM( "Grande porte", "Doméstico", "Aquático", "Ave", "Caminhão") not null,
    especie ENUM( "Cachorro", "Gato", "Peixe", "Bovino", "Calopsita", "Outro") not null,
    adotado BOOL
);

CREATE TABLE IF NOT EXISTS exame (
	id INT auto_increment primary key,
	prontuario_vet char(6) NOT NULL unique,
    id_animal INT not null,
    data_exame date not null,
    observacoes varchar(100),
    FOREIGN KEY (prontuario_vet) REFERENCES veterinarios(prontuario),
    FOREIGN KEY (id_animal) REFERENCES animais(id)
);

CREATE TABLE IF NOT EXISTS adocoes (
	id INT auto_increment primary key,
    animal_id INT not null unique,
    responsavel_id INT not null,
    data_adocao date not null,
    FOREIGN KEY (animal_id) REFERENCES animais(id),
    FOREIGN KEY (responsavel_id) REFERENCES responsaveis(id)
);

insert into responsaveis (nome, email)
values ('luis xuxu', 'luisfofinho@gmail.com');

select * from responsaveis;