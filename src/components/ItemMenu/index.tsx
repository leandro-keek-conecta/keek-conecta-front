import React from "react";
import styles from "./itemMenu.module.css";
import { NavLink } from "react-router-dom";
import { useTheme } from "@mui/material/styles";

export function ItemMenu({ icone, rotulo, para, estaAberta, onClick }) {
  const theme = useTheme();
  const user = JSON.parse(localStorage.getItem("user"));
  const color = user.projeto.corHex
  return (
    <li>
      <NavLink
        to={para}
        className={({ isActive }) =>
          `${styles.menuItem} ${isActive ? styles.ativo : ""}`
        }
        onClick={onClick}
        style={({ isActive }) =>
          isActive
            ? {
                backgroundColor: `${color}`,
                color: theme.palette.primary.contrastText,
              }
            : undefined
        }
      >
        <div className={styles.icon}>
          {React.cloneElement(icone, { style: { fontSize: "2vh" } })}
        </div>
        {estaAberta && <span className={styles.label}>{rotulo}</span>}
      </NavLink>
    </li>
  );
}
