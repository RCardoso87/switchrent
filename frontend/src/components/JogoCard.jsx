import { useState } from 'react';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

export default function JogoCard({ jogo, onAlugar }) {
  const { usuario } = useAuth();
  const navigate = useNavigate();
  const [dias, setDias] = useState(7);
  const [aberto, setAberto] = useState(false);
  const [carregando, setCarregando] = useState(false);

  const calcularDevolucao = () => {
    const d = new Date();
    d.setDate(d.getDate() + parseInt(dias, 10));
    return d.toLocaleDateString('pt-BR');
  };

  const alugar = async () => {
    if (!usuario) { navigate('/login'); return; }
    setCarregando(true);
    try {
      await api.post('/locacoes', { jogoId: jogo.id, diasAluguel: dias });
      alert('✅ Aluguel confirmado! Devolução prevista: ' + calcularDevolucao());
      setAberto(false);
      onAlugar && onAlugar();
    } catch (err) {
      alert('❌ ' + (err.response?.data?.erro || 'Erro ao alugar'));
    } finally {
      setCarregando(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition">
      <div className="h-48 bg-gradient-to-br from-switch-blue to-switch-red flex items-center justify-center">
        {jogo.imagemUrl ? (
          <img src={jogo.imagemUrl} alt={jogo.titulo} className="w-full h-full object-cover" onError={(e) => e.target.style.display = 'none'} />
        ) : (
          <span className="text-white text-4xl font-bold">🎮</span>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg text-switch-dark line-clamp-2">{jogo.titulo}</h3>
        <p className="text-sm text-gray-600 mt-1">{jogo.genero}</p>
        <p className={`text-sm mt-2 font-semibold ${jogo.quantidadeEstoque > 0 ? 'text-green-600' : 'text-red-600'}`}>
          {jogo.quantidadeEstoque > 0 ? `${jogo.quantidadeEstoque} em estoque` : 'Indisponível'}
        </p>

        {!aberto ? (
          <button
            onClick={() => setAberto(true)}
            disabled={jogo.quantidadeEstoque < 1}
            className="mt-3 w-full bg-switch-red text-white py-2 rounded font-semibold hover:bg-red-700 disabled:bg-gray-400"
          >
            Alugar
          </button>
        ) : (
          <div className="mt-3 space-y-2">
            <label className="text-sm font-medium">Período (dias):</label>
            <select value={dias} onChange={(e) => setDias(e.target.value)} className="w-full border rounded px-2 py-1">
              <option value="3">3 dias</option>
              <option value="7">7 dias</option>
              <option value="14">14 dias</option>
              <option value="30">30 dias</option>
            </select>
            <p className="text-xs text-gray-600">Devolução prevista: <strong>{calcularDevolucao()}</strong></p>
            <div className="flex gap-2">
              <button onClick={alugar} disabled={carregando} className="flex-1 bg-switch-blue text-white py-1 rounded hover:bg-cyan-600">
                {carregando ? '...' : 'Confirmar'}
              </button>
              <button onClick={() => setAberto(false)} className="flex-1 bg-gray-300 py-1 rounded hover:bg-gray-400">
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}