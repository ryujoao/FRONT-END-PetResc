const express = require('express');
const authenticateToken = require('../middlewares/authMiddleware');
const authorizeRole = require('../middlewares/roleMiddleware');

const router = express.Router();

router.get('/relatorios',
  authenticateToken,
  authorizeRole('ADMIN'),
  (req, res) => {
    res.send('Relatórios completos para Admin');
  }
);

router.get('/doacoes',
  authenticateToken,
  authorizeRole('ONG', 'ADMIN'),
  (req, res) => {
    res.send('Gestão de doações');
  }
);

router.get('/feed',
  authenticateToken,
  authorizeRole('PUBLICO', 'ONG', 'ADMIN'),
  (req, res) => {
    res.send('Conteúdo aberto a todos os cadastrados');
  }
);

module.exports = router;
