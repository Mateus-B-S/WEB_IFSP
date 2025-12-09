-- Seleciona o banco
CREATE DATABASE IF NOT EXISTS projetolegal;
USE projetolegal;

-- ===============================
--        DROP DAS TABELAS
-- ===============================

SET FOREIGN_KEY_CHECKS = 0;

DROP TABLE IF EXISTS exame;
DROP TABLE IF EXISTS adocoes;
DROP TABLE IF EXISTS admins;
DROP TABLE IF EXISTS veterinarios;
DROP TABLE IF EXISTS responsaveis;
DROP TABLE IF EXISTS animais;

SET FOREIGN_KEY_CHECKS = 1;

-- ===============================
--        RECRIAÇÃO DAS TABELAS
--        (versão alinhada ao MODEL)
-- ===============================

-- Tabela de animais
CREATE TABLE IF NOT EXISTS animais (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  raca VARCHAR(100) NOT NULL,
  adotado BOOLEAN DEFAULT FALSE
);

-- Tabela de responsáveis (com senha)
CREATE TABLE IF NOT EXISTS responsaveis (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  email VARCHAR(100) NOT NULL UNIQUE,
  senha VARCHAR(255) NOT NULL
);

-- Tabela de veterinários (com senha)
CREATE TABLE IF NOT EXISTS veterinarios (
  id INT,
  nome VARCHAR(100) NOT NULL,
  formacao VARCHAR(255) NOT NULL,
  prontuario CHAR(6) NOT NULL UNIQUE PRIMARY KEY,
  senha VARCHAR(255) NOT NULL
);

-- Tabela de admins
CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  senha VARCHAR(255) NOT NULL
);

-- Tabela de adoções
CREATE TABLE IF NOT EXISTS adocoes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  animal_id INT NOT NULL UNIQUE,
  responsavel_id INT NOT NULL,
  data_adocao DATE NOT NULL,

  FOREIGN KEY (animal_id) REFERENCES animais(id)
    ON DELETE CASCADE,
  FOREIGN KEY (responsavel_id) REFERENCES responsaveis(id)
    ON DELETE CASCADE
);

-- Tabela de exames
CREATE TABLE IF NOT EXISTS exame (
  id INT AUTO_INCREMENT PRIMARY KEY,
  prontuario_vet CHAR(6) NOT NULL,
  id_animal INT NOT NULL,
  data_exame DATE NOT NULL,
  observacoes VARCHAR(255),

  FOREIGN KEY (prontuario_vet) REFERENCES veterinarios(prontuario)
    ON DELETE CASCADE,
  FOREIGN KEY (id_animal) REFERENCES animais(id)
    ON DELETE CASCADE
);

-- admin senha
INSERT INTO admins (senha) VALUES ('1234');