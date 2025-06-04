// Sidebar.tsx
import { useNavigate } from "react-router-dom";
import FolderIcon from "@mui/icons-material/Folder";
import {
  AttachMoney,
  FormatListNumbered,
  Info,
  Description,
  BarChart,
} from "@mui/icons-material";
import { FormControl, Box } from "@mui/material";
import SettingsIcon from "@mui/icons-material/Settings";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import styles from "./sidebar.module.css";
import React, { useEffect, useState } from "react";
import { ItemMenu } from "../ItemMenu"; 

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
  const [tela, setTela] = useState("");

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
        <ItemMenu
          icone={<AttachMoney />}
          rotulo="Créditos"
          para="/creditos"
          estaAberta={estaAberta}
          onClick={isMobile ? aoFechar : undefined}
        />
        <ItemMenu
          icone={<FormatListNumbered />}
          rotulo="Lista de Siglas"
          para="/lista-de-siglas"
          estaAberta={estaAberta}
          onClick={isMobile ? aoFechar : undefined}
        />
        <ItemMenu
          icone={<Info />}
          rotulo="Identificação"
          para="/identificacao"
          estaAberta={estaAberta}
          onClick={isMobile ? aoFechar : undefined}
        />
        <ItemMenu
          icone={<Description />}
          rotulo="Apresentação e Introdução"
          para="/Introducao"
          estaAberta={estaAberta}
          onClick={isMobile ? aoFechar : undefined}
        />
        <ItemMenu
          icone={<BarChart />}
          rotulo="Análise Situacional"
          para="/analise"
          estaAberta={estaAberta}
          onClick={isMobile ? aoFechar : undefined}
        />

        <hr className={styles.divider} />

       
        <hr className={styles.divider} />
        <FormControl
          fullWidth
          size="small"
          style={{ marginTop: 16, marginBottom: 5 }}
        >
          <Select
            id="configuracoes-select"
            value={tela}
            onChange={handleChange}
            displayEmpty
            sx={{ fontSize: "2vh" }}
            renderValue={(selected) => {
              if (!selected) {
                return (
                  <Box
                    display="flex"
                    alignItems="center"
                    sx={{ fontSize: "2.2vh" }}
                  >
                    <SettingsIcon sx={{ marginRight: 1, height: "24px" }} />
                    Configurações
                  </Box>
                );
              }

              // Exibir o label normal do MenuItem selecionado
              const selectedOption = {
                "/planos": "Tela de Planos",
                "/galeria": "Galeria de Imagens",
                "/admin/opcoes": "Opções Administrador",
                "/autorizacao": "Tela de Autorização",
                "/admin/cadastro": "Cadastro de Admin",
              };

              return selectedOption[selected] || "Configurações";
            }}
          >
            <MenuItem value="/planos" sx={{ fontSize: "2.2vh" }}>
              Tela de Planos
            </MenuItem>
            <MenuItem value="/galeria" sx={{ fontSize: "2.2vh" }}>
              Galeria de Imagens
            </MenuItem>
            <MenuItem value="/admin/opcoes" sx={{ fontSize: "2.2vh" }}>
              Opções Administrador
            </MenuItem>
            <MenuItem value="/autorizacao" sx={{ fontSize: "2.2vh" }}>
              Tela de Autorização
            </MenuItem>
            <MenuItem value="/admin/cadastro" sx={{ fontSize: "2.2vh" }}>
              Cadastro de Admin
            </MenuItem>
          </Select>
        </FormControl>
      </ul>
    </nav>
  );
}
