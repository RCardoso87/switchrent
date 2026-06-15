const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Locacao = sequelize.define('Locacao', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  dataLocacao: { type: DataTypes.DATEONLY, allowNull: false },
  dataDevolucao: { type: DataTypes.DATEONLY, allowNull: false },
  diasAluguel: { type: DataTypes.INTEGER, allowNull: false },
  status: {
    type: DataTypes.ENUM('aguardando_retirada', 'alugado', 'devolvido', 'atrasado'),
    defaultValue: 'aguardando_retirada',
  },
}, {
  tableName: 'locacoes',
});

module.exports = Locacao;
