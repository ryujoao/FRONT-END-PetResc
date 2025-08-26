const express = require('express');
const cors = require('cors');

const app = express();

// Habilita CORS para todas as rotas
app.use(cors());

// Exemplo de rota
app.get('/api', (req, res) => {
  res.json({ message: 'CORS funcionando!' });
});

app.listen(3000, () => {
  console.log('Servidor rodando na porta 3000');
});
