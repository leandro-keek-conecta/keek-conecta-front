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


const RoutesConfig = () => (
  <AuthProvider>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/bayeux" element={<Login />} />
      <Route path="/guga-pet" element={<Login />} />
      <Route path="/conecta-cmjp" element={<Login />} />

      {/* User */}
      <Route path="/home" element={<ProtectedRoute allowedRoles={["USER", "ADMIN", "SUPERADMIN"]}><Home /></ProtectedRoute>} />
      <Route path="/metricas" element={<ProtectedRoute allowedRoles={["USER", "ADMIN", "SUPERADMIN"]}><Metricas /></ProtectedRoute>} />
      <Route path="/estatisticas" element={<ProtectedRoute allowedRoles={["USER", "ADMIN", "SUPERADMIN"]}><Estatisticas /></ProtectedRoute>} />

      {/* Admin, superAdmin */}
      <Route path="/superAdmin" element={<ProtectedRoute allowedRoles={["SUPERADMIN"]}><SuperAdmin /></ProtectedRoute>} />
      <Route path="/cadastro" element={<ProtectedRoute allowedRoles={["SUPERADMIN", "ADMIN"]}><Register /></ProtectedRoute>} />
      <Route path="/projetos" element={<ProtectedRoute allowedRoles={["SUPERADMIN"]}><Projects /></ProtectedRoute>} />
      <Route path="/projeto/:id" element={<ProtectedRoute allowedRoles={["SUPERADMIN"]}><ProjectAcess /></ProtectedRoute>} />

      {/* Rota para NotFound */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </AuthProvider>
);

export default RoutesConfig;
