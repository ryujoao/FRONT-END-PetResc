const express = require('express');
const router = express.Router();
const ongController = require('../controllers/ongController');

router.post('/register', ongController.registerOng);
router.post('/login', ongController.loginOng);
router.get('/', ongController.getAllOngs);
router.get('/:id', ongController.getOngById);
router.get('/:id/animais', ongController.getAnimaisByOng);

module.exports = router;
