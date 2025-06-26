import { Layout } from "@/components/Layout";
import styles from "./projectAcess.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CircularProgress, Box } from "@mui/material";

export default function ProjectAcess() {
  const { id } = useParams(); // ← Captura o ID da URL
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(true); // novo estado

  // Mapeamento de URLs
  const urlMap: Record<string, string> = {
    "1": "https://app.powerbi.com/view?r=eyJrIjoiMjI4YjIwOGQtOTE2Zi00ZjU2LTg1OTAtNDM0YjcxZTQ1OGVjIiwidCI6ImZkNGQ4Y2U1LWQ2ZDQtNGQzNy04ZWZhLWNkMzQ1YWUzNzVhOCJ9",
    "2": "https://www.youtube.com/embed//B43dX4ZUXUU?si=hCB-SdbEAKieNJVj",
    "3": "https://app.powerbi.com/view?r=eyJrIjoiNjViZWRiODAtOGQ5Mi00ZTM0LTg5MmUtODQxNTQxM2I2YmY5IiwidCI6ImZkNGQ4Y2U1LWQ2ZDQtNGQzNy04ZWZhLWNkMzQ1YWUzNzVhOCJ9",
    "4": "https://app.powerbi.com/view?r=eyJrIjoiMjI4YjIwOGQtOTE2Zi00ZjU2LTg1OTAtNDM0YjcxZTQ1OGVjIiwidCI6ImZkNGQ4Y2U1LWQ2ZDQtNGQzNy04ZWZhLWNkMzQ1YWUzNzVhOCJ9",
    "5": "https://www.youtube.com/embed/e4Ez99gCOiY",
  };

  useEffect(() => {
    if (id && urlMap[id]) {
      setUrl(urlMap[id]);
      setLoading(true); // volta a mostrar spinner ao mudar URL
    } else {
      setUrl("");
      setLoading(false); // nada para carregar
    }
  }, [id]);

  return (
    <Layout titulo="Visualização de Projeto">
      {url ? (
        <>
          {loading && (
            <Box display="flex" justifyContent="center" alignItems="center" height="400px">
              <CircularProgress />
            </Box>
          )}
          <iframe
            className={styles.iframe}
            src={url}
            allowFullScreen
            title="Visualização do Projeto"
            style={{ display: loading ? "none" : "block" }}
            onLoad={() => setLoading(false)}
          />
        </>
      ) : (
        <p>Projeto não encontrado ou inválido.</p>
      )}
    </Layout>
  );
}
