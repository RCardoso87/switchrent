const { Usuario } = require('../models');

exports.meuPerfil = async (req, res) => {
  const usuario = await Usuario.findByPk(req.usuario.id, {
    attributes: ['id', 'nome', 'email', 'perfil'],
  });
  res.json(usuario);
};
