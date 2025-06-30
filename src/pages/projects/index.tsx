import CardProject from "@/components/CardProjetct";
import { Layout } from "@/components/Layout";
import { fetchProjects } from "@/services/projetos/projetoService";
import { Box, Grid, Typography, CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export default function Projects() {
  const [projetos, setProjetos] = useState([]);
  const [loading, setLoading] = useState(true);
  const urlMap: Record<number, string> = {
  1: "https://app.powerbi.com/view?r=eyJrIjoiMjI4YjIwOGQtOTE2Zi00ZjU2LTg1OTAtNDM0YjcxZTQ1OGVjIiwidCI6ImZkNGQ4Y2U1LWQ2ZDQtNGQzNy04ZWZhLWNkMzQ1YWUzNzVhOCJ9", // Bayeux
  2: "https://www.youtube.com/embed//B43dX4ZUXUU?si=hCB-SdbEAKieNJVj", // Guga Pet
  3: "https://app.powerbi.com/view?r=eyJrIjoiNjViZWRiODAtOGQ5Mi00ZTM0LTg5MmUtODQxNTQxM2I2YmY5IiwidCI6ImZkNGQ4Y2U1LWQ2ZDQtNGQzNy04ZWZhLWNkMzQ1YWUzNzVhOCJ9", // Conecta CMJP
  4: "https://app.powerbi.com/view?r=eyJrIjoiMjI4YjIwOGQtOTE2Zi00ZjU2LTg1OTAtNDM0YjcxZTQ1OGVjIiwidCI6ImZkNGQ4Y2U1LWQ2ZDQtNGQzNy04ZWZhLWNkMzQ1YWUzNzVhOCJ9", // Pad Bayeux
};


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
                <CardProject chartImgUrl={project.dashUrl?? "https://app.powerbi.com/view?r=eyJrIjoiMjI4YjIwOGQtOTE2Zi00ZjU2LTg1OTAtNDM0YjcxZTQ1OGVjIiwidCI6ImZkNGQ4Y2U1LWQ2ZDQtNGQzNy04ZWZhLWNkMzQ1YWUzNzVhOCJ9"} userName={project.users} {...project || []} />
              </Grid>
            ))}
          </Grid>
        )}
      </Box>
    </Layout>
  );
}
