import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();

  const sair = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-switch-dark text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between flex-wrap gap-2">
        <Link to="/" className="flex items-center gap-2">
          <div className="flex">
            <div className="w-3 h-8 bg-switch-blue rounded-l"></div>
            <div className="w-3 h-8 bg-switch-red rounded-r"></div>
          </div>
          <span className="text-2xl font-bold">Switch<span className="text-switch-red">Rent</span></span>
        </Link>
        <nav className="flex items-center gap-4 text-sm">
          {usuario ? (
            <>
              <Link to="/" className="hover:text-switch-blue">Catálogo</Link>
              <Link to="/meus-alugueis" className="hover:text-switch-blue">Meus Aluguéis</Link>
              {usuario.perfil === 'administrador' && (
                <>
                  <Link to="/admin/jogos" className="hover:text-switch-blue">Gerenciar Jogos</Link>
                  <Link to="/admin/locacoes" className="hover:text-switch-blue">Locações</Link>
                </>
              )}
              <span className="text-gray-300">Olá, {usuario.nome.split(' ')[0]}</span>
              <button onClick={sair} className="bg-switch-red hover:bg-red-700 px-3 py-1 rounded">Sair</button>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-switch-blue">Entrar</Link>
              <Link to="/cadastro" className="bg-switch-red hover:bg-red-700 px-3 py-1 rounded">Cadastrar</Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}