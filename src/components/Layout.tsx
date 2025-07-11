import { useState } from "react";
import { styled } from "@mui/material/styles";
import styles from "./layout.module.css"
import Logo from "../assets/logo.png";
import {
  AppBar,
  Box,
  Drawer,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { ChevronLeft, ChevronRight, Menu } from "@mui/icons-material";
import { Sidebar } from "./sidebar/Sidebar";

// Interface para propriedades do componente Layout
interface PropriedadesLayout {
  children: React.ReactNode;
  titulo?: string;
  mostrarSidebar?: boolean; // Nova propriedade para controlar a exibição da sidebar
}

// Estilo para o cabeçalho
const CabecalhoEstilizado = styled(AppBar)(({ theme }) => ({
  backgroundColor: "white",
  color: "#333333",
  boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
  zIndex: theme.zIndex.drawer + 1,
}));

// Estilo para a barra lateral
const BarraLateralEstilizada = styled(Box)(({ theme }) => ({
  backgroundColor: "#ffffff", // Verde similar ao keekInteligencia
  color: "white",
  height: "100%",
}));

export function Layout({
  children,
  titulo,
  mostrarSidebar = true,
}: PropriedadesLayout) {
  const [barraLateralAberta, setBarraLateralAberta] = useState(true);
  const [menuMobileAberto, setMenuMobileAberto] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
  console.log(user.projeto.url)
  const userNameFiltered = user.name
    .split(" ")                    // Divide o nome completo por espaços
    .filter(palavra => palavra.length > 2)  // Remove palavras com 2 caracteres ou menos
    .slice(0, 2)                   // Limita o resultado para até 3 palavras
    .join(" ");                    // Junta as palavras novamente
  const color = user.projeto.corHex
  // Se não deve mostrar a sidebar, renderiza apenas o conteúdo principal
  if (!mostrarSidebar) {
    return (
      <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f5f5f5" }}>
        {children}
      </Box>
    );
  }

  return (
    <Box sx={{ display: "flex", minHeight: "100vh", bgcolor: "#f5f5f5" }}>
      {/* Barra lateral para desktop */}
      <Box
        component="aside"
        sx={{
          position: "fixed",
          left: 0,
          top: 0,
          height: "100vh",
          overflowY: "hidden", // Scroll inicialmente escondido
          overflowX: "hidden",
          width: barraLateralAberta ? "18vw" : "50px",
          bgcolor: "#ffffff",
          transition: "all 0.3s ease-in-out",
          zIndex: 20,
          display: { xs: "none", md: "block" },
          "&:hover": {
            overflowY: "auto", // Mostra scroll ao passar o mouse
          },
          // Estilização personalizada para a barra de rolagem
          "&::-webkit-scrollbar": {
            width: "6px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "3px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            backgroundColor: `${color}`,
            height: "10vh",
            px: 2,
            mb:1
          }}
        >
          {user.id === 1 ? (
            <img
              src={Logo}
              alt="keekInteligencia"
              style={{ height: "48px", width: "48px", borderRadius: "50%", border: "3px solid #FFF"

 }}
            />
          ) : (
            <img
              src={user.projeto.url ? user.projeto.url : Logo}
              alt="keekInteligencia"
              style={{ height: "48px", width: "48px", borderRadius: "50%", border: "3px solid #FFF" }}
            />
          )}

          {barraLateralAberta && (
            <Box className={styles.headerText} >
              <h1
              className={styles.title}
              >
                {user.projeto.nome}
              </h1>
              <h2
              className={styles.subtitle}
              >
                {userNameFiltered}
              </h2>
            </Box>
          )}
        </Box>

        <Sidebar estaAberta={barraLateralAberta} />
      </Box>

      {/* Drawer para mobile */}
      <Drawer
        anchor="left"
        open={menuMobileAberto}
        onClose={() => setMenuMobileAberto(false)}
        sx={{
          "& .MuiDrawer-paper": {
            width: "70vw",
            bgcolor: `${color}`,
          },
          display: { xs: "block", md: "none" },
        }}
      >
        <Box
          sx={{
            display: "flex",
            height: "50px",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center" }}>
            <img
              src={user.projeto.url ? user.projeto.url : Logo}
              alt="keekInteligencia"
              style={{ height: "32px", width: "32px", borderRadius: "50%" }}
            />
            <Typography
              variant="subtitle1"
              sx={{
                ml: 1,
                fontWeight: "bold",
                color: "white",
                fontSize: "1rem",
              }}
            >
              {user.projeto.nome}
            </Typography>
          </Box>
          <IconButton
            onClick={() => setMenuMobileAberto(false)}
            sx={{ color: "white" }}
          >
            <ChevronLeft />
          </IconButton>
        </Box>
        <BarraLateralEstilizada>
          <Sidebar
            estaAberta={true}
            isMobile={true}
            aoFechar={() => setMenuMobileAberto(false)}
          />
        </BarraLateralEstilizada>
      </Drawer>

      {/* Conteúdo principal */}
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          ml: { xs: 0, md: barraLateralAberta ? "18vw" : "50px" },
          transition: "all 0.3s ease-in-out",
        }}
      >
        <CabecalhoEstilizado
          position="relative"
          sx={{ zIndex: 0, height: "4rem" }}
        >
          <Toolbar sx={{ display: "flex", alignItems: "center" }}>
            <IconButton
              edge="start"
              color="inherit"
              onClick={() => setMenuMobileAberto(true)}
              sx={{ display: { xs: "block", md: "none" } }}
            >
              <Menu />
            </IconButton>
            {titulo && (
              <Typography
                variant="h6"
                component="h1"
                sx={{ flexGrow: 1, fontSize: "1.5rem", height: "3rem" }}
              >
                {titulo || "Keek Inteligencia"}
              </Typography>
            )}
          </Toolbar>
        </CabecalhoEstilizado>
        <Box
          sx={{
            /* p: { xs: 2 }, */
            mx: "auto",
            maxWidth: barraLateralAberta ? "100vw" : "100%",
            transition: "all 0.3s ease-in-out",
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
}
