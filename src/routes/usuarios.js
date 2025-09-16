const express = require('express');
const router = express.Router();
const userController = require('../controller/userController');
const { authenticateToken } = require('../middleware/authMiddleware');


router.get('/', authenticateToken, userController.listarUsuarios);
router.post('/', authenticateToken, userController.criarUsuario);
router.delete('/:id', authenticateToken, userController.deletarUsuario);

module.exports = router;
