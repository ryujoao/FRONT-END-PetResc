const express = require('express');
const router = express.Router();
const animaisController = require('../controllers/animaisController');


router.get('/', animaisController.listarTodos);
router.get('/search', animaisController.search);
router.get('/ong/:ongId', animaisController.listarPorOng);
router.get('/:id', animaisController.listarPorId);
router.post('/', animaisController.criar);
router.put('/:id', animaisController.atualizar);
router.delete('/:id', animaisController.deletar);

module.exports = router;
