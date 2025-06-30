import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { createDynamicTheme, defaultTheme } from "./theme";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import RoutesConfig from "./routes/routes";
import { register } from "swiper/element/bundle";
import { DynamicThemeProvider } from "./context/ThemeContext";

const clienteQuery = new QueryClient();
register();

const userString = localStorage.getItem("user");
const user = userString ? JSON.parse(userString) : null;
const corHex = user?.projeto?.corHex || defaultTheme.palette.primary.main;

const temaDinamico = createDynamicTheme(corHex);

const App = () => (
  <QueryClientProvider client={clienteQuery}>
    <DynamicThemeProvider>
      <ThemeProvider theme={temaDinamico}>
        <CssBaseline />
        <BrowserRouter>
          <RoutesConfig />
        </BrowserRouter>
      </ThemeProvider>
    </DynamicThemeProvider>
  </QueryClientProvider>
);

export default App;
