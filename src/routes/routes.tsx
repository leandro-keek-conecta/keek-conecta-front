import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { AuthProvider } from "@/context/AuthContext";
// Páginas
import NotFound from "../pages/NotFound";
import Home from "../pages/home/Home";
import Login from "@/pages/login/Login";
import { SuperAdmin } from '@/pages/superAdmin';
import Register from '@/pages/register';
import Projects from '@/pages/projects';
import ProjectAcess from '@/pages/projectAcess';
import Metricas from '@/pages/metricas';
import Estatisticas from '@/pages/estatistica';
import ProjectRegister from '@/pages/projectRegister';


const RoutesConfig = () => (
  <AuthProvider>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/bayeux" element={<Login />} />
      <Route path="/guga-pet" element={<Login />} />
      <Route path="/conecta-cmjp" element={<Login />} />

      {/* User */}
      <Route path="/home" element={<ProtectedRoute allowedRoles={["USER", "ADMIN"]}><Home /></ProtectedRoute>} />
      <Route path="/metricas" element={<ProtectedRoute allowedRoles={["USER", "ADMIN"]}><Metricas /></ProtectedRoute>} />
      <Route path="/estatisticas" element={<ProtectedRoute allowedRoles={["USER", "ADMIN"]}><Estatisticas /></ProtectedRoute>} />

      {/* Admin, superAdmin */}
      <Route path="/superAdmin" element={<ProtectedRoute allowedRoles={["ADMIN"]}><SuperAdmin /></ProtectedRoute>} />
      <Route path="/cadastro" element={<ProtectedRoute allowedRoles={["ADMIN"]}><Register /></ProtectedRoute>} />
      <Route path="/projetos" element={<ProtectedRoute allowedRoles={["ADMIN"]}><Projects /></ProtectedRoute>} />
      <Route path="/projeto/:id" element={<ProtectedRoute allowedRoles={["ADMIN"]}><ProjectAcess /></ProtectedRoute>} />
      <Route path="/cadastro-projeto" element={<ProtectedRoute allowedRoles={["ADMIN"]}><ProjectRegister /></ProtectedRoute>} />

      {/* Rota para NotFound */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </AuthProvider>
);

export default RoutesConfig;
