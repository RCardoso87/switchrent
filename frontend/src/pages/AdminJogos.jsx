import { useEffect, useState } from 'react';
import api from '../services/api';

export default function AdminJogos() {
  const [jogos, setJogos] = useState([]);
  const [form, setForm] = useState({ titulo: '', genero: '', quantidadeEstoque: 1, imagemUrl: '' });
  const [editandoId, setEditandoId] = useState(null);

  const carregar = async () => {
    const { data } = await api.get('/jogos/todos');
    setJogos(data);
  };

  useEffect(() => { carregar(); }, []);

  const salvar = async (e) => {
    e.preventDefault();
    try {
      if (editandoId) {
        await api.put(`/jogos/${editandoId}`, form);
      } else {
        await api.post('/jogos', form);
      }
      setForm({ titulo: '', genero: '', quantidadeEstoque: 1, imagemUrl: '' });
      setEditandoId(null);
      carregar();
    } catch (err) { alert(err.response?.data?.erro || 'Erro'); }
  };

  const editar = (j) => {
    setForm({ titulo: j.titulo, genero: j.genero, quantidadeEstoque: j.quantidadeEstoque, imagemUrl: j.imagemUrl || '' });
    setEditandoId(j.id);
  };

  const inativar = async (id) => {
    if (!confirm('Inativar este jogo?')) return;
    await api.delete(`/jogos/${id}`);
    carregar();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-switch-dark mb-6">Gerenciar Jogos</h1>

      <form onSubmit={salvar} className="bg-white rounded-lg shadow p-6 mb-8 space-y-3">
        <h2 className="font-bold text-lg">{editandoId ? 'Editar jogo' : 'Cadastrar novo jogo'}</h2>
        <input type="text" placeholder="Título" value={form.titulo}
          onChange={(e) => setForm({ ...form, titulo: e.target.value })} required
          className="w-full border rounded px-3 py-2" />
        <input type="text" placeholder="Gênero" value={form.genero}
          onChange={(e) => setForm({ ...form, genero: e.target.value })} required
          className="w-full border rounded px-3 py-2" />
        <input type="number" placeholder="Estoque" value={form.quantidadeEstoque} min="0"
          onChange={(e) => setForm({ ...form, quantidadeEstoque: parseInt(e.target.value, 10) })} required
          className="w-full border rounded px-3 py-2" />
        <input type="text" placeholder="URL da imagem (opcional)" value={form.imagemUrl}
          onChange={(e) => setForm({ ...form, imagemUrl: e.target.value })}
          className="w-full border rounded px-3 py-2" />
        <div className="flex gap-2">
          <button type="submit" className="bg-switch-red text-white px-6 py-2 rounded font-semibold hover:bg-red-700">
            {editandoId ? 'Atualizar' : 'Cadastrar'}
          </button>
          {editandoId && (
            <button type="button" onClick={() => { setEditandoId(null); setForm({ titulo: '', genero: '', quantidadeEstoque: 1, imagemUrl: '' }); }}
              className="bg-gray-300 px-6 py-2 rounded">Cancelar</button>
          )}
        </div>
      </form>

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-switch-dark text-white">
            <tr>
              <th className="p-3 text-left">Título</th>
              <th className="p-3 text-left">Gênero</th>
              <th className="p-3 text-left">Estoque</th>
              <th className="p-3 text-left">Status</th>
              <th className="p-3 text-left">Ações</th>
            </tr>
          </thead>
          <tbody>
            {jogos.map((j) => (
              <tr key={j.id} className="border-t">
                <td className="p-3">{j.titulo}</td>
                <td className="p-3">{j.genero}</td>
                <td className="p-3">{j.quantidadeEstoque}</td>
                <td className="p-3">{j.ativo ? '✅ Ativo' : '❌ Inativo'}</td>
                <td className="p-3 space-x-2">
                  <button onClick={() => editar(j)} className="bg-switch-blue text-white px-3 py-1 rounded">Editar</button>
                  {j.ativo && <button onClick={() => inativar(j.id)} className="bg-red-600 text-white px-3 py-1 rounded">Inativar</button>}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}