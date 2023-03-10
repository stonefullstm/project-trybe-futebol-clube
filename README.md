# Trybe Futebol Clube

O objetivo do projeto é desenvolver uma API consumindo um banco de dados, utilizando principios SOLID e arquitetura MSC com TypeScript, POO e dockerização(dockerfile, docker-compose), utilizando modelagem de dados através do Sequelize. Essa API tem a finalidade de ser consumida por um front-end, já construído pelo time da Trybe.

## Para instalar e executar a aplicação

- Clone o repositório
- Na raiz do projeto execute o seguinte comando para instalar as dependências:

~~~sh
  npm install
~~~

- Na pasta app execute o comando abaixo para criar os conteineres:

~~~sh
  docker-compose up -d
~~~

- Finalmente, no navegador digite a url http://localhost:3000

## Funcionalidades

- Criar e manipular dados com MySQL por meio do Sequelize, armazenando os dados;
- Autenticação de usuário;
  ![Tela Login](images/tela-login.png)
- Listar times cadastrados;
- Listar partidas em andamento e finalizados;
  ![Tela Partidas](images/tela-partidas.png)
- Criar novas partidas;
- Atualizar placar de partidas em andamento;
- Finalizar partidas em andamento;
- Gerar um leaderboard de times em casa e visitantes, e de modo geral;
  ![Tela Classificação](images/tela-classificacao.png)
- Dockerização do back-end e front-end, utilizando docker-compose.

## Tecnologias utilizadas
 
<div display="inline-block">
<img width="" src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E">
<img width="" src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white">
<img width="" src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white">
<img width="" src="https://img.shields.io/badge/Sequelize-52B0E7?style=for-the-badge&logo=Sequelize&logoColor=white">
<img width="" src="https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white">
</div>