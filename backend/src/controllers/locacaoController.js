const { Locacao, Jogo, Usuario, sequelize } = require('../models');

exports.alugar = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { jogoId, diasAluguel } = req.body;
    const usuarioId = req.usuario.id;

    const jogo = await Jogo.findByPk(jogoId, { transaction: t });
    if (!jogo || !jogo.ativo) {
      await t.rollback();
      return res.status(404).json({ erro: 'Jogo não disponível' });
    }
    if (jogo.quantidadeEstoque < 1) {
      await t.rollback();
      return res.status(400).json({ erro: 'Sem estoque disponível' });
    }

    const hoje = new Date();
    const devolucao = new Date();
    devolucao.setDate(hoje.getDate() + parseInt(diasAluguel, 10));

    const locacao = await Locacao.create({
      usuarioId,
      jogoId,
      dataLocacao: hoje.toISOString().slice(0, 10),
      dataDevolucao: devolucao.toISOString().slice(0, 10),
      diasAluguel,
      status: 'aguardando_retirada',
    }, { transaction: t });

    jogo.quantidadeEstoque -= 1;
    await jogo.save({ transaction: t });

    await t.commit();
    res.status(201).json(locacao);
  } catch (err) {
    await t.rollback();
    res.status(500).json({ erro: err.message });
  }
};

exports.meuHistorico = async (req, res) => {
  const locacoes = await Locacao.findAll({
    where: { usuarioId: req.usuario.id },
    include: [{ model: Jogo, as: 'jogo' }],
    order: [['createdAt', 'DESC']],
  });
  res.json(locacoes);
};

exports.listarTodas = async (req, res) => {
  const locacoes = await Locacao.findAll({
    include: [
      { model: Jogo, as: 'jogo' },
      { model: Usuario, as: 'usuario', attributes: ['id', 'nome', 'email'] },
    ],
    order: [['createdAt', 'DESC']],
  });
  res.json(locacoes);
};

exports.atualizarStatus = async (req, res) => {
  const t = await sequelize.transaction();
  try {
    const { status } = req.body;
    const locacao = await Locacao.findByPk(req.params.id, { transaction: t });
    if (!locacao) {
      await t.rollback();
      return res.status(404).json({ erro: 'Locação não encontrada' });
    }

    const statusAnterior = locacao.status;
    locacao.status = status;
    await locacao.save({ transaction: t });

    // Se mudou para "devolvido", devolve 1 ao estoque
    if (status === 'devolvido' && statusAnterior !== 'devolvido') {
      const jogo = await Jogo.findByPk(locacao.jogoId, { transaction: t });
      jogo.quantidadeEstoque += 1;
      await jogo.save({ transaction: t });
    }

    await t.commit();
    res.json(locacao);
  } catch (err) {
    await t.rollback();
    res.status(500).json({ erro: err.message });
  }
};
