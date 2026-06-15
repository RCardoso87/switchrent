const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcryptjs');

const Usuario = sequelize.define('Usuario', {
  id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
  nome: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  senha: { type: DataTypes.STRING, allowNull: false },
  perfil: { type: DataTypes.ENUM('cliente', 'administrador'), defaultValue: 'cliente' },
}, {
  tableName: 'usuarios',
  hooks: {
    beforeCreate: async (usuario) => {
      if (usuario.senha) {
        usuario.senha = await bcrypt.hash(usuario.senha, 10);
      }
    },
  },
});

Usuario.prototype.verificarSenha = function (senha) {
  return bcrypt.compare(senha, this.senha);
};

module.exports = Usuario;
