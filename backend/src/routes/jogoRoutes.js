const express = require('express');
const router = express.Router();
const jogoController = require('../controllers/jogoController');
const { autenticar, apenasAdmin } = require('../middlewares/auth');

router.get('/', jogoController.listar);
router.get('/todos', autenticar, apenasAdmin, jogoController.listarTodos);
router.post('/', autenticar, apenasAdmin, jogoController.criar);
router.put('/:id', autenticar, apenasAdmin, jogoController.atualizar);
router.delete('/:id', autenticar, apenasAdmin, jogoController.inativar);

module.exports = router;
