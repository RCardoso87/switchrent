import { useEffect, useState } from 'react';
import api from '../services/api';
import JogoCard from '../components/JogoCard';

export default function Catalogo() {
  const [jogos, setJogos] = useState([]);
  const [busca, setBusca] = useState('');
  const [genero, setGenero] = useState('');

  const carregar = async () => {
    const params = {};
    if (busca) params.busca = busca;
    if (genero) params.genero = genero;
    const { data } = await api.get('/jogos', { params });
    setJogos(data);
  };

  useEffect(() => { carregar(); }, [genero]);

  const generos = ['Aventura', 'Plataforma', 'Luta', 'RPG', 'Corrida', 'Simulação', 'Ação'];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-switch-dark mb-2">Catálogo de Jogos</h1>
      <p className="text-gray-600 mb-6">Alugue cartuchos de Nintendo Switch sem sair de casa.</p>
      <div className="flex flex-col md:flex-row gap-3 mb-6">
        <input type="text" placeholder="🔍 Buscar por nome..." value={busca}
          onChange={(e) => setBusca(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && carregar()}
          className="flex-1 border rounded px-3 py-2" />
        <select value={genero} onChange={(e) => setGenero(e.target.value)} className="border rounded px-3 py-2">
          <option value="">Todos os gêneros</option>
          {generos.map((g) => <option key={g} value={g}>{g}</option>)}
        </select>
        <button onClick={carregar} className="bg-switch-red text-white px-6 py-2 rounded font-semibold hover:bg-red-700">
          Buscar
        </button>
      </div>
      {jogos.length === 0 ? (
        <p className="text-center text-gray-500 py-12">Nenhum jogo encontrado.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {jogos.map((j) => <JogoCard key={j.id} jogo={j} onAlugar={carregar} />)}
        </div>
      )}
    </div>
  );
}