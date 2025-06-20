import { Layout } from "@/components/Layout";
import styles from "./projectAcess.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

export default function ProjectAcess() {
  const { id } = useParams(); // ← Captura o ID da URL
  const [url, setUrl] = useState("");

  // Mapeamento de URLs
  const urlMap: Record<string, string> = {
    "1": "https://ourworldindata.org/grapher/renewables-share-energy",
    "2": "https://www.youtube.com/embed/QDAHMMMtFBI",
    "3": "https://www.youtube.com/embed/0-Vk65aZk7s",
    "4": "https://www.youtube.com/embed/h5g_8akzW9g",
    "5": "https://www.youtube.com/embed/e4Ez99gCOiY",
  };

  useEffect(() => {
    if (id && urlMap[id]) {
      setUrl(urlMap[id]);
    } else {
      setUrl(""); // caso não encontrado
    }
  }, [id]);

  return (
    <Layout titulo="Apresentação e Introdução">
      {url ? (
        <iframe
          className={styles.iframe}
          src={url}
          allowFullScreen
          title="Visualização do Projeto"
        />
      ) : (
        <p>Projeto não encontrado ou inválido.</p>
      )}
    </Layout>
  );
}
