import { Routes, Route } from "react-router-dom";

// Páginas
import Index from "../pages/Index";
import NotFound from "../pages/NotFound";
import Apresentacao from "../pages/Apresentacao";
import Login from "@/pages/login/Login";

const RoutesConfig = () => (
  <Routes>
    {/* Rotas sem sidebar */}

    {/* Rotas com sidebar */}
    <Route path="/" element={<Login />} />
    
    {/* Rota para Apresentação */}
    <Route path="/apresentacao" element={<Apresentacao />} />

    {/* Rota para NotFound */}
    <Route path="*" element={<NotFound />} />
  </Routes>
);

export default RoutesConfig;
