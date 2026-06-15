const { Jogo } = require('../models');
const { Op } = require('sequelize');

exports.listar = async (req, res) => {
  try {
    const { busca, genero } = req.query;
    const where = { ativo: true };
    if (busca) where.titulo = { [Op.like]: `%${busca}%` };
    if (genero) where.genero = genero;
    const jogos = await Jogo.findAll({ where, order: [['titulo', 'ASC']] });
    res.json(jogos);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.listarTodos = async (req, res) => {
  const jogos = await Jogo.findAll({ order: [['titulo', 'ASC']] });
  res.json(jogos);
};

exports.criar = async (req, res) => {
  try {
    const jogo = await Jogo.create(req.body);
    res.status(201).json(jogo);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.atualizar = async (req, res) => {
  try {
    const jogo = await Jogo.findByPk(req.params.id);
    if (!jogo) return res.status(404).json({ erro: 'Jogo não encontrado' });
    await jogo.update(req.body);
    res.json(jogo);
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.inativar = async (req, res) => {
  try {
    const jogo = await Jogo.findByPk(req.params.id);
    if (!jogo) return res.status(404).json({ erro: 'Jogo não encontrado' });
    jogo.ativo = false;
    await jogo.save();
    res.json({ mensagem: 'Jogo inativado' });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
