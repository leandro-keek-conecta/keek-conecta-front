// Sidebar.tsx
import { useNavigate } from "react-router-dom";
import FolderIcon from "@mui/icons-material/Folder";
import {
  FormatListNumbered,
  Info,
  Description,
  BarChart,
} from "@mui/icons-material";
import { FormControl, Box } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import ArticleIcon from '@mui/icons-material/Article';
import MenuItem from "@mui/material/MenuItem";
import styles from "./sidebar.module.css";
import React, { useEffect, useState } from "react";
import { ItemMenu } from "../ItemMenu";
import { logout } from "@/services/auth/authService";

interface PropriedadesSidebar {
  estaAberta: boolean;
  isMobile?: boolean;
  aoFechar?: () => void;
}

export function Sidebar({
  estaAberta,
  isMobile = false,
  aoFechar,
}: PropriedadesSidebar) {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const [tela, setTela] = useState("");
  const isAdminOrMore = user?.role === "ADMIN"? true: false;

  useEffect(() => {
    const root = document.getElementById("main-container");

    if (root) {
      root.style.display = "none";
      void root.offsetHeight; // força reflow
      root.style.display = "";
    }
  }, [estaAberta]);

  const handleChange = (event) => {
    const valor = event.target.value;
    setTela(valor);

    // Se estiver usando rotas:
    navigate(valor); // valor precisa ser o path correspondente
  };

  return (
    <nav className={styles.sidebarNav}>
      <ul className={styles.ulStyle}>
        {isAdminOrMore ? (
          <>
          <ItemMenu
            icone={<ArticleIcon />}
            rotulo="Projetos"
            para="/projetos"
            estaAberta={estaAberta}
            onClick={isMobile ? aoFechar : undefined}
          />
          <ItemMenu
          icone={<Description  />}
          rotulo="Cadastro de usuários"
          para="/cadastro"
          estaAberta={estaAberta}
          onClick={isMobile ? aoFechar : undefined}
        />
        </>
        ) : (
          <ItemMenu
            icone={<ArticleIcon />}
            rotulo="Home"
            para="/home"
            estaAberta={estaAberta}
            onClick={isMobile ? aoFechar : undefined}
          />
        )}

        <ItemMenu
          icone={<FormatListNumbered />}
          rotulo="Metricas"
          para="/metricas"
          estaAberta={estaAberta}
          onClick={isMobile ? aoFechar : undefined}
        />

        <ItemMenu
          icone={<Info />}
          rotulo="Estatísticas"
          para="/estatisticas"
          estaAberta={estaAberta}
          onClick={isMobile ? aoFechar : undefined}
        />

        <hr className={styles.divider} />

        <li style={{ marginTop: "auto" }} className={styles.bottomItem}>
          <hr className={styles.divider} />
          <FormControl fullWidth size="small" style={{ marginTop: 16 }}>
            <Select
              id="configuracoes-select"
              value={tela}
              onChange={handleChange}
              displayEmpty
              sx={{ fontSize: "1rem" }}
              renderValue={(selected) => {
                if (!selected) {
                  return (
                    <Box
                      display="flex"
                      alignItems="center"
                      sx={{ fontSize: "1rem" }}
                    >
                      <SettingsIcon sx={{ marginRight: 1, height: "24px" }} />
                      Configurações
                    </Box>
                  );
                }

                // Exibir o label normal do MenuItem selecionado
                const selectedOption = {
                  /*"/admin/opcoes": "Opções Administrador", "/cadastro": "Tela de cadatro",*/

                  "/": "Sair",
                };

                return selectedOption[selected] || "Configurações";
              }}
            >
              {/*               <MenuItem value="/admin/opcoes" sx={{ fontSize: "1rem" }}>
                Opções Administrador
              </MenuItem> 
                         {isAdminOrMore?(
                <MenuItem value="/cadastro" sx={{ fontSize: "1rem" }}>
                Tela de Cadastro
              </MenuItem>
              ):(
                <></>
              )}
              
              */}
   
              <MenuItem value="/" sx={{ fontSize: "1rem" }} onClick={logout}>
                Sair
              </MenuItem>
            </Select>
          </FormControl>
        </li>
      </ul>
    </nav>
  );
}
