import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function ProtectedRoute({ children, adminOnly = false }) {
  const { usuario, carregando } = useAuth();

  if (carregando) return <div className="p-8 text-center">Carregando...</div>;
  if (!usuario) return <Navigate to="/login" />;
  if (adminOnly && usuario.perfil !== 'administrador') return <Navigate to="/" />;

  return children;
}