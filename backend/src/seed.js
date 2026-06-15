require('dotenv').config();
const { sequelize, Usuario, Jogo } = require('./models');

async function seed() {
  await sequelize.sync({ force: true });
  console.log('🧹 Banco resetado');

  await Usuario.create({
    nome: 'Administrador',
    email: 'admin@switchrent.com',
    senha: 'admin123',
    perfil: 'administrador',
  });

  await Usuario.create({
    nome: 'Cliente Teste',
    email: 'cliente@teste.com',
    senha: 'cliente123',
    perfil: 'cliente',
  });

const jogos = [
    { titulo: 'The Legend of Zelda: Tears of the Kingdom', genero: 'Aventura', quantidadeEstoque: 3, imagemUrl: 'https://m.media-amazon.com/images/I/81Ge3v6ro8L._SY425_.jpg' },
    { titulo: 'Super Mario Odyssey', genero: 'Plataforma', quantidadeEstoque: 5, imagemUrl: 'https://m.media-amazon.com/images/I/81nHzMe0lrL._AC_SL1500_.jpg' },
    { titulo: 'Super Smash Bros. Ultimate', genero: 'Luta', quantidadeEstoque: 2, imagemUrl: 'https://m.media-amazon.com/images/I/81hxAPWEziL._AC_SL1500_.jpg' },
    { titulo: 'Pokémon Scarlet', genero: 'RPG', quantidadeEstoque: 4, imagemUrl: 'https://m.media-amazon.com/images/I/81Nqi9GxAjL._AC_SL1500_.jpg' },
    { titulo: 'Mario Kart 8 Deluxe', genero: 'Corrida', quantidadeEstoque: 6, imagemUrl: 'https://m.media-amazon.com/images/I/71jZAGKRAQL._AC_SY741_.jpg' },
    { titulo: 'Animal Crossing: New Horizons', genero: 'Simulação', quantidadeEstoque: 3, imagemUrl: 'https://m.media-amazon.com/images/I/81KtQcxwLSL._AC_SY741_.jpg' },
    { titulo: 'Splatoon 3', genero: 'Ação', quantidadeEstoque: 2, imagemUrl: 'https://m.media-amazon.com/images/I/81OSkSH-qgL._AC_SL1500_.jpg' },
    { titulo: 'Metroid Dread', genero: 'Aventura', quantidadeEstoque: 1, imagemUrl: 'https://m.media-amazon.com/images/I/6197INpxQaL._AC_SL1000_.jpg' },
  ];

  await Jogo.bulkCreate(jogos);
  console.log('✅ Seed concluído!');
  console.log('👤 Admin: admin@switchrent.com / admin123');
  console.log('👤 Cliente: cliente@teste.com / cliente123');
  process.exit(0);
}

seed().catch((err) => { console.error(err); process.exit(1); });
