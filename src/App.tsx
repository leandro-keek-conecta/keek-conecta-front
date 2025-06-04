import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { temaPlansan } from "./theme";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import RoutesConfig from "./routes/routes"; // Importa as rotas
import { register } from "swiper/element/bundle";


const clienteQuery = new QueryClient();
register(); // Registra os elementos do Swiper

const App = () => (
  <QueryClientProvider client={clienteQuery}>
    <ThemeProvider theme={temaPlansan}>
      <CssBaseline />
      <BrowserRouter>
          <RoutesConfig /> {/* Usa o componente de rotas */}
      </BrowserRouter>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
