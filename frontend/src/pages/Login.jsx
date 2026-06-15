import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api';
import { useAuth } from '../context/AuthContext';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [erro, setErro] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const enviar = async (e) => {
    e.preventDefault();
    setErro('');
    try {
      const { data } = await api.post('/auth/login', { email, senha });
      login(data.token, data.usuario);
      navigate('/');
    } catch (err) {
      setErro(err.response?.data?.erro || 'Erro ao entrar');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 bg-white rounded-lg shadow-md p-8">
      <h2 className="text-2xl font-bold text-switch-dark mb-6">Entrar</h2>
      {erro && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{erro}</div>}
      <form onSubmit={enviar} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">E-mail</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required
            className="w-full border rounded px-3 py-2" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Senha</label>
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} required
            className="w-full border rounded px-3 py-2" />
        </div>
        <button type="submit" className="w-full bg-switch-red text-white py-2 rounded font-semibold hover:bg-red-700">
          Entrar
        </button>
      </form>
      <p className="text-sm text-center mt-4">
        Não tem conta? <Link to="/cadastro" className="text-switch-blue font-semibold">Cadastre-se</Link>
      </p>
      <div className="mt-6 text-xs text-gray-500 border-t pt-4">
        <p><strong>Teste:</strong></p>
        <p>Admin: admin@switchrent.com / admin123</p>
        <p>Cliente: cliente@teste.com / cliente123</p>
      </div>
    </div>
  );
}