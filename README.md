# Gerenciador de Despesas Compartilhadas

Este é um aplicativo web para gerenciar despesas compartilhadas entre grupos de amigos, desenvolvido com Node.js, Express, Vue.js e MySQL.

## Pré-requisitos

- Node.js (v14 ou superior)
- MySQL

## Configuração

1. Clone o repositório:

git clone https://seu-repositorio.git
cd nome-do-projeto

2. Instale as dependências do backend:

cd backend
npm install

4. Configure o banco de dados:
- Crie um banco de dados MySQL
- Copie o arquivo `.env.example` para `.env` e preencha com suas configurações de banco de dados

5. Execute as migrações do banco de dados:

cd ../backend
npx sequelize-cli db:migrate

## Executando o projeto

1. Inicie o servidor backend:

npm run dev


2. Em outro terminal, inicie o servidor de desenvolvimento do frontend:

cd frontend
npm run serve

3. Acesse o aplicativo em `http://localhost:8080`

## Testando o aplicativo

1. Registre um novo usuário
2. Faça login com as credenciais criadas
3. Crie um novo grupo
4. Adicione despesas ao grupo
5. Convide outros usuários para o grupo (eles precisarão estar registrados no sistema)
6. Visualize os saldos e as despesas do grupo

## Estrutura do Projeto

- `backend/`: Contém o código do servidor Node.js/Express
- `controllers/`: Lógica de negócios
- `models/`: Modelos do Sequelize
- `routes/`: Definições de rotas da API
- `middleware/`: Middlewares do Express
- `frontend/`: Contém o código do cliente Vue.js
- `src/components/`: Componentes Vue reutilizáveis
- `src/views/`: Componentes de página Vue
- `src/store/`: Gerenciamento de estado com Pinia
- `src/router/`: Configuração de rotas do Vue Router

## Tecnologias Utilizadas

- Backend: Node.js, Express, Sequelize (ORM), MySQL
- Frontend: Vue.js 3, Vue Router, Pinia, Tailwind CSS
- Autenticação: JSON Web Tokens (JWT)

## Contribuindo

Instruções para contribuir com o projeto...

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE.md](LICENSE.md) para detalhes.