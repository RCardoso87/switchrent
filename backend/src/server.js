require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { sequelize } = require('./models');

const authRoutes = require('./routes/authRoutes');
const jogoRoutes = require('./routes/jogoRoutes');
const locacaoRoutes = require('./routes/locacaoRoutes');
const usuarioRoutes = require('./routes/usuarioRoutes');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => res.json({ mensagem: 'SwitchRent API rodando 🎮' }));
app.use('/api/auth', authRoutes);
app.use('/api/jogos', jogoRoutes);
app.use('/api/locacoes', locacaoRoutes);
app.use('/api/usuarios', usuarioRoutes);

const PORT = process.env.PORT || 3001;

sequelize.sync({ alter: true }).then(() => {
  console.log('✅ Banco de dados sincronizado');
  app.listen(PORT, () => console.log(`🚀 Servidor rodando na porta ${PORT}`));
}).catch((err) => console.error('❌ Erro ao conectar no banco:', err));
