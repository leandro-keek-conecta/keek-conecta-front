import { Layout } from "@/components/Layout";
import styles from "./home.module.css";
import { useLocation } from "react-router-dom";
import { localStorageService } from "@/services/localStorage/localStorageService";

export default function Home() {
  const user = JSON.parse(localStorage.getItem("user"))
  const url = user.projeto.dashUrl


  return (
    <Layout titulo="Apresentação e Introdução">
      <iframe
        className={styles.iframe}
        src={url}
        allowFullScreen
        title="Apresentação YouTube"
      />
    </Layout>
  );
}
