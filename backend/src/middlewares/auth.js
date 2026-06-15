const jwt = require('jsonwebtoken');

function autenticar(req, res, next) {
  const header = req.headers.authorization;
  if (!header) return res.status(401).json({ erro: 'Token não fornecido' });

  const token = header.split(' ')[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.usuario = decoded;
    next();
  } catch (err) {
    return res.status(401).json({ erro: 'Token inválido' });
  }
}

function apenasAdmin(req, res, next) {
  if (req.usuario.perfil !== 'administrador') {
    return res.status(403).json({ erro: 'Acesso restrito a administradores' });
  }
  next();
}

module.exports = { autenticar, apenasAdmin };
