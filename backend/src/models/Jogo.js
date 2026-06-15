const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Jogo = sequelize.define('Jogo', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  titulo: { type: DataTypes.STRING, allowNull: false },
  genero: { type: DataTypes.STRING, allowNull: false },
  quantidadeEstoque: { type: DataTypes.INTEGER, defaultValue: 0 },
  imagemUrl: { type: DataTypes.STRING, allowNull: true },
  ativo: { type: DataTypes.BOOLEAN, defaultValue: true },
}, {
  tableName: 'jogos',
});

module.exports = Jogo;
