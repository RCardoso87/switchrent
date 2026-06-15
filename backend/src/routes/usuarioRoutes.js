const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuarioController');
const { autenticar } = require('../middlewares/auth');

router.get('/perfil', autenticar, usuarioController.meuPerfil);

module.exports = router;
