# Gerenciador de Despesas Compartilhadas

Este é um aplicativo web para gerenciar despesas compartilhadas entre grupos de amigos, desenvolvido com Node.js, Express, Vue.js e MySQL.

## Pré-requisitos

- Node.js (v20 ou superior)
- MySQL
- npm ou yarn

## Estrutura do Projeto

- `src/`: Contém o código do servidor Node.js/Express
- `frontend/`: Contém o código do cliente Vue.js

## Configuração

1. Clone o repositório:

git clone https://github.com/lucassr-dev/despesas-app.git
cd despesas-app

2. Configure o backend:

npm install

3. Configure o banco de dados:
- Crie um banco de dados MySQL
- Copie o arquivo `.env.example` para `.env` (se não existir, crie-o) e preencha com suas configurações:
  ```
  DB_NAME=seu_banco_de_dados
  DB_USER=seu_usuario
  DB_PASS=sua_senha
  DB_HOST=localhost
  JWT_SECRET=seu_segredo_jwt
  ```

4. Configure o frontend:
cd frontend
npm install

## Executando o projeto

1. Inicie o servidor backend:
npm run dev
O servidor backend estará rodando em `http://localhost:3000` (ou na porta definida no .env)

2. Em outro terminal, inicie o servidor de desenvolvimento do frontend:
cd frontend
npm run dev

O aplicativo frontend estará disponível em `http://localhost:5173`

## Scripts Disponíveis

### Backend
- `npm start`: Inicia o servidor em modo de produção
- `npm run dev`: Inicia o servidor com nodemon para desenvolvimento

### Frontend
- `npm run dev`: Inicia o servidor de desenvolvimento
- `npm run build`: Compila o projeto para produção
- `npm run preview`: Visualiza a versão de produção localmente
- `npm run lint`: Executa o linter
- `npm run format`: Formata os arquivos com Prettier

## Tecnologias Utilizadas

### Backend:
- Node.js com Express
- Sequelize ORM
- MySQL
- JSON Web Tokens (JWT) para autenticação
- Cors para gerenciamento de CORS
- Bcryptjs para hash de senhas

### Frontend:
- Vue.js 3
- Vue Router
- Pinia para gerenciamento de estado
- Axios para requisições HTTP
- Tailwind CSS para estilização
- Vite como build tool

## Testando o aplicativo

1. Acesse `http://localhost:5173` no seu navegador
2. Registre um novo usuário
3. Faça login com as credenciais criadas
4. Crie um novo grupo
5. Adicione despesas ao grupo
6. Convide outros usuários para o grupo (eles precisarão estar registrados no sistema)
7. Visualize os saldos e as despesas do grupo

## Contribuindo

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/AmazingFeature`)
3. Faça commit das suas mudanças (`git commit -m 'Add some AmazingFeature'`)
4. Faça push para a branch (`git push origin feature/AmazingFeature`)
5. Abra um Pull Request

## Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE.md](LICENSE.md) para detalhes.

## Contato

Lucas Souza Rosa - lucassrjob@hotmail.com

Link do projeto: [https://github.com/lucassr-dev/despesas-app](https://github.com/lucassr-dev/despesas-app)