import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function Cadastro() {
  const [form, setForm] = useState({ nome: '', email: '', senha: '' });
  const [erro, setErro] = useState('');
  const navigate = useNavigate();

  const enviar = async (e) => {
    e.preventDefault();
    setErro('');
    try {
      await api.post('/auth/cadastrar', form);
      alert('✅ Cadastro realizado! Faça login.');
      navigate('/login');
    } catch (err) {
      setErro(err.response?.data?.erro || 'Erro ao cadastrar');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-switch-dark mb-6">Criar Conta</h2>
      {erro && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{erro}</div>}
      <form onSubmit={enviar} className="space-y-4">
        <input type="text" placeholder="Nome completo" value={form.nome}
          onChange={(e) => setForm({ ...form, nome: e.target.value })} required
          className="w-full border rounded px-3 py-2" />
        <input type="email" placeholder="E-mail" value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })} required
          className="w-full border rounded px-3 py-2" />
        <input type="password" placeholder="Senha" value={form.senha}
          onChange={(e) => setForm({ ...form, senha: e.target.value })} required minLength={6}
          className="w-full border rounded px-3 py-2" />
        <button type="submit" className="w-full bg-switch-red text-white py-2 rounded font-semibold hover:bg-red-700">
          Cadastrar
        </button>
      </form>
      <p className="text-sm text-center mt-4">
        Já tem conta? <Link to="/login" className="text-switch-blue font-semibold">Entrar</Link>
      </p>
    </div>
  );
}