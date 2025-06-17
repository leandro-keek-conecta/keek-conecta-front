import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './ProtectedRoute';
import { AuthProvider } from "@/context/AuthContext";
// Páginas
import NotFound from "../pages/NotFound";
import Home from "../pages/home/Home";
import Login from "@/pages/login/Login";
import { SuperAdmin } from '@/pages/superAdmin';


const RoutesConfig = () => (
  <AuthProvider>
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/bayeux" element={<Login />} />

      <Route path="/home" element={<ProtectedRoute allowedRoles={["USER", "ADMIN", "SUPERADMIN"]}>
        <Home />
      </ProtectedRoute>} />
      <Route path="/superAdmin" element={<ProtectedRoute allowedRoles={["SUPERADMIN"]}>
        <SuperAdmin />
      </ProtectedRoute>} />

      {/* Rota para NotFound */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  </AuthProvider>
);

export default RoutesConfig;
