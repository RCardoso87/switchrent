const sequelize = require('../config/database');
const Usuario = require('./Usuario');
const Jogo = require('./Jogo');
const Locacao = require('./Locacao');

Usuario.hasMany(Locacao, { foreignKey: 'usuarioId', as: 'locacoes' });
Locacao.belongsTo(Usuario, { foreignKey: 'usuarioId', as: 'usuario' });

Jogo.hasMany(Locacao, { foreignKey: 'jogoId', as: 'locacoes' });
Locacao.belongsTo(Jogo, { foreignKey: 'jogoId', as: 'jogo' });

module.exports = { sequelize, Usuario, Jogo, Locacao };
