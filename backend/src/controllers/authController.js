const jwt = require('jsonwebtoken');
const { Usuario } = require('../models');

exports.cadastrar = async (req, res) => {
  try {
    const { nome, email, senha } = req.body;
    const existe = await Usuario.findOne({ where: { email } });
    if (existe) return res.status(400).json({ erro: 'E-mail já cadastrado' });

    const usuario = await Usuario.create({ nome, email, senha, perfil: 'cliente' });
    res.status(201).json({ id: usuario.id, nome: usuario.nome, email: usuario.email });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, senha } = req.body;
    const usuario = await Usuario.findOne({ where: { email } });
    if (!usuario) return res.status(401).json({ erro: 'Credenciais inválidas' });

    const senhaOk = await usuario.verificarSenha(senha);
    if (!senhaOk) return res.status(401).json({ erro: 'Credenciais inválidas' });

    const token = jwt.sign(
      { id: usuario.id, perfil: usuario.perfil, nome: usuario.nome },
      process.env.JWT_SECRET,
      { expiresIn: '7d' }
    );

    res.json({
      token,
      usuario: { id: usuario.id, nome: usuario.nome, email: usuario.email, perfil: usuario.perfil },
    });
  } catch (err) {
    res.status(500).json({ erro: err.message });
  }
};
