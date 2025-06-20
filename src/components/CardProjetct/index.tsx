import { useNavigate } from "react-router-dom";
import styles from "./cardProject.module.css";
import { Card, Box, Typography, Button } from "@mui/material";

type CardProjectProps = {
  id: number;
  name: string;
  logoUrl?: string;
  mentions: number;
  chartImgUrl?: string; // opcional para um gráfico como imagem
};

export default function CardProject({
  id,
  name,
  logoUrl,
  mentions,
  chartImgUrl,
}: CardProjectProps) {
  const navigate = useNavigate();


  const handleSelect = () => {
    navigate(`/projeto/${id}`);
  };

  return (
    <Card className={styles.card}>
      <Box className={styles.header}>
        <Box className={styles.headerLeft}>
          {logoUrl && (
            <img
              src={logoUrl}
              alt={`${name} logo`}
              width={40}
              height={40}
              className={styles.logo}
            />
          )}
        </Box>
        <Box className={styles.headerRight}>
          <Typography variant="h6">{name}</Typography>
          <Typography variant="subtitle2">
            {mentions} menções nos últimos 7 dias
          </Typography>
        </Box>
      </Box>

      <Box className={styles.content}>
        {chartImgUrl && (
          <img
            src={chartImgUrl}
            alt="Gráfico de menções"
            className={styles.chart}
          />
        )}
      </Box>

      <Box className={styles.footer}>
        <Button variant="contained" color="success" onClick={handleSelect}>
          Selecionar
        </Button>
      </Box>
    </Card>
  );
}
