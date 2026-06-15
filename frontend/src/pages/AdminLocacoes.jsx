import { useEffect, useState } from 'react';
import api from '../services/api';

const STATUS_OPTS = ['aguardando_retirada', 'alugado', 'devolvido', 'atrasado'];

export default function AdminLocacoes() {
  const [locacoes, setLocacoes] = useState([]);

  const carregar = async () => {
    const { data } = await api.get('/locacoes');
    setLocacoes(data);
  };

  useEffect(() => { carregar(); }, []);

  const mudarStatus = async (id, status) => {
    await api.patch(`/locacoes/${id}/status`, { status });
    carregar();
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-switch-dark mb-6">Locações</h1>
      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-switch-dark text-white">
            <tr>
              <th className="p-3 text-left">Cliente</th>
              <th className="p-3 text-left">Jogo</th>
              <th className="p-3 text-left">Aluguel</th>
              <th className="p-3 text-left">Devolução</th>
              <th className="p-3 text-left">Status</th>
            </tr>
          </thead>
          <tbody>
            {locacoes.map((l) => (
              <tr key={l.id} className="border-t">
                <td className="p-3">{l.usuario?.nome}</td>
                <td className="p-3">{l.jogo?.titulo}</td>
                <td className="p-3">{new Date(l.dataLocacao).toLocaleDateString('pt-BR')}</td>
                <td className="p-3">{new Date(l.dataDevolucao).toLocaleDateString('pt-BR')}</td>
                <td className="p-3">
                  <select value={l.status} onChange={(e) => mudarStatus(l.id, e.target.value)}
                    className="border rounded px-2 py-1">
                    {STATUS_OPTS.map((s) => <option key={s} value={s}>{s.replace('_', ' ')}</option>)}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}