import React from "react";
import styles from "./itemMenu.module.css";
import { NavLink } from "react-router-dom";

interface PropriedadesItemMenu {
  icone: React.ReactNode;
  rotulo: string;
  para: string;
  estaAberta: boolean;
  onClick?: () => void;
}

export function ItemMenu({ icone, rotulo, para, estaAberta, onClick }: PropriedadesItemMenu) {
  return (
    <li>
      <NavLink
        to={para}
        className={({ isActive }) => `${styles.menuItem} ${isActive ? styles.ativo : ""}`}
        onClick={onClick}
      >
        <div className={styles.icon}>
          {React.cloneElement(icone as React.ReactElement, { style: { fontSize: "2vh" } })} {/* Define o tamanho do ícone */}
        </div>
        {estaAberta && <span className={styles.label}>{rotulo}</span>}
      </NavLink>
    </li>
  );
}