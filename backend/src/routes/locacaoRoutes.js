const express = require('express');
const router = express.Router();
const locacaoController = require('../controllers/locacaoController');
const { autenticar, apenasAdmin } = require('../middlewares/auth');

router.post('/', autenticar, locacaoController.alugar);
router.get('/minhas', autenticar, locacaoController.meuHistorico);
router.get('/', autenticar, apenasAdmin, locacaoController.listarTodas);
router.patch('/:id/status', autenticar, apenasAdmin, locacaoController.atualizarStatus);

module.exports = router;
