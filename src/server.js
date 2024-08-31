const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const authRoutes = require('./routes/authRoutes');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;

sequelize.sync().then(() => {
  console.log('Banco de dados conectado');
  app.listen(PORT, () => {
    console.log(`O servidor está rodando na porta ${PORT}`);
  });
});