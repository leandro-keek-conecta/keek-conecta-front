import CardProject from "@/components/CardProjetct";
import { Layout } from "@/components/Layout";
import { Box, Grid, Typography } from "@mui/material";

export default function Projects() {
  const fakeProjects = [
    {
      id: 1,
      name: "Guga Pet",
      logoUrl:
        "https://keekinteligencia.com.br/wp-content/uploads/sites/1649/2024/11/keek_banner_mobile2-1-1.jpg",
      mentions: 495,
      chartImgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPrGHSpnQgqgPyLc_mKIb7SGHfN7eynQAw0g&s",
    },
    {
      id: 2,
      name: "Bayeux",
      logoUrl:
        "https://keekinteligencia.com.br/wp-content/uploads/sites/1649/2024/11/keek_banner_mobile2-1-1.jpg",
      mentions: 320,
      chartImgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPrGHSpnQgqgPyLc_mKIb7SGHfN7eynQAw0g&s",
    },
    {
      id: 3,
      name: "Projeto 3",
      logoUrl:
        "https://keekinteligencia.com.br/wp-content/uploads/sites/1649/2024/11/keek_banner_mobile2-1-1.jpg",
      mentions: 128,
      chartImgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPrGHSpnQgqgPyLc_mKIb7SGHfN7eynQAw0g&s",
    },
    {
      id: 4,
      name: "Guga Pet",
      logoUrl:
        "https://keekinteligencia.com.br/wp-content/uploads/sites/1649/2024/11/keek_banner_mobile2-1-1.jpg",
      mentions: 495,
      chartImgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPrGHSpnQgqgPyLc_mKIb7SGHfN7eynQAw0g&s",
    },
    {
      id: 5,
      name: "Bayeux",
      logoUrl:
        "https://keekinteligencia.com.br/wp-content/uploads/sites/1649/2024/11/keek_banner_mobile2-1-1.jpg",
      mentions: 320,
      chartImgUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPrGHSpnQgqgPyLc_mKIb7SGHfN7eynQAw0g&s",
    },
  ];

  return (
    <Layout titulo="Tela de Projetos">
      <Box padding={2}>
        <Grid container spacing={3}>
          {fakeProjects.map((project) => (
            <Grid item xs={12} md={6} key={project.id}>
              <CardProject {...project} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </Layout>
  );
}
