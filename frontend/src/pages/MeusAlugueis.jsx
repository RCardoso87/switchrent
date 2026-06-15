import { useEffect, useState } from 'react';
import api from '../services/api';

const STATUS_LABEL = {
  aguardando_retirada: { texto: 'Aguardando retirada', cor: 'bg-yellow-100 text-yellow-800' },
  alugado: { texto: 'Alugado', cor: 'bg-blue-100 text-blue-800' },
  devolvido: { texto: 'Devolvido', cor: 'bg-green-100 text-green-800' },
  atrasado: { texto: 'Atrasado', cor: 'bg-red-100 text-red-800' },
};

export default function MeusAlugueis() {
  const [locacoes, setLocacoes] = useState([]);

  useEffect(() => {
    api.get('/locacoes/minhas').then(({ data }) => setLocacoes(data));
  }, []);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-switch-dark mb-6">Meus Aluguéis</h1>
      {locacoes.length === 0 ? (
        <p className="text-gray-500">Você ainda não alugou nenhum jogo.</p>
      ) : (
        <div className="space-y-3">
          {locacoes.map((l) => {
            const s = STATUS_LABEL[l.status] || { texto: l.status, cor: 'bg-gray-100' };
            return (
              <div key={l.id} className="bg-white rounded-lg shadow p-4 flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                <div>
                  <h3 className="font-bold text-lg">{l.jogo?.titulo}</h3>
                  <p className="text-sm text-gray-600">
                    Aluguel: {new Date(l.dataLocacao).toLocaleDateString('pt-BR')} •
                    Devolução: {new Date(l.dataDevolucao).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <span className={`px-3 py-1 rounded-full text-xs font-semibold ${s.cor}`}>{s.texto}</span>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}