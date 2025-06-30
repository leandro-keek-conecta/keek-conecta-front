import { Layout } from "@/components/Layout";
import styles from "./projectAcess.module.css";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { CircularProgress, Box } from "@mui/material";
import { fetchProjects, ProjectDTO } from "@/services/projetos/projetoService";

export default function ProjectAcess() {
  const { id } = useParams();
  const [project, setProject] = useState<ProjectDTO | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadProject() {
      if (!id) return;

      try {
        const allProjects = await fetchProjects();
        const selected = allProjects.find((p) => String(p.id) === id);

        if (selected) {
          setProject(selected);
        }
      } catch (error) {
        console.error("Erro ao buscar projeto:", error);
      } finally {
        setLoading(false);
      }
    }

    loadProject();
  }, [id]);

  return (
    <Layout titulo="Visualização de Projeto">
      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="400px">
          <CircularProgress />
        </Box>
      ) : project && project.dashUrl ? (
        <iframe
          className={styles.iframe}
          src={project.dashUrl}
          allowFullScreen
          title={`Projeto ${project.name}`}
          style={{ width: "100%", height: "500px", border: "none", borderRadius: "8px" }}
        />
      ) : (
        <p>Projeto não encontrado ou sem URL de visualização.</p>
      )}
    </Layout>
  );
}
