import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import Header from './components/Header';
import ProtectedRoute from './components/ProtectedRoute';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import Catalogo from './pages/Catalogo';
import MeusAlugueis from './pages/MeusAlugueis';
import AdminJogos from './pages/AdminJogos';
import AdminLocacoes from './pages/AdminLocacoes';

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Header />
        <main className="min-h-screen">
          <Routes>
            <Route path="/" element={<Catalogo />} />
            <Route path="/login" element={<Login />} />
            <Route path="/cadastro" element={<Cadastro />} />
            <Route path="/meus-alugueis" element={<ProtectedRoute><MeusAlugueis /></ProtectedRoute>} />
            <Route path="/admin/jogos" element={<ProtectedRoute adminOnly><AdminJogos /></ProtectedRoute>} />
            <Route path="/admin/locacoes" element={<ProtectedRoute adminOnly><AdminLocacoes /></ProtectedRoute>} />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}