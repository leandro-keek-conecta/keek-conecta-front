import CardProject from "@/components/CardProjetct";
import { Layout } from "@/components/Layout";
import { fetchProjects } from "@/services/projetos/projetoService";
import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

export default function Projects() {
  const [projetos, setProjetos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects()
      .then(setProjetos)
      .finally(() => setLoading(false));
  }, []);

  return (
    <Layout titulo="Tela de Projetos">
      <Box padding={2}>
        {loading ? (
          <Box display="flex" justifyContent="center" alignItems="center" height="300px">
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {projetos.map((project) => (
              <Grid item xs={12} md={6} key={project.id}>
                <CardProject userName={project.users} {...project || []} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Layout>
  );
}
