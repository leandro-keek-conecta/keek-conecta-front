import { useNavigate } from "react-router-dom";
import styles from "./cardProject.module.css";
import { Card, Box, Typography, Button } from "@mui/material";
import Avatar from "@mui/material/Avatar";

type CardProjectProps = {
  id: number;
  name: string;
  logoUrl?: string;
  users?: User[];
  mentions: number;
  chartImgUrl?: string; // opcional para um gráfico como imagem
};

type User = {
  id: number;
  name: string;
  email: string;
  role: string;
};

export default function CardProject({
  id,
  name,
  logoUrl,
  users,
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
          {/*           <Typography variant="subtitle2">
            {mentions} menções nos últimos 7 dias
          </Typography> */}
        </Box>
      </Box>

      <Box className={styles.content}>
        {chartImgUrl && (
         <iframe
          src={chartImgUrl}
          title={`Preview do projeto ${name}`}
          className={styles.chart}
          style={{
            border: "none",
            width: "100%",
            height: "200px", // ajuste conforme necessário
            borderRadius: "8px",
          }}
          allowFullScreen
        />
        )}
      </Box>

      <Box className={styles.footer}>
        <Box className={styles.avatars}>
          {users.length > 3 ? (
            <>
              {users.slice(0, 3).map((user) => (
                <Avatar
                  key={user.id}
                  sx={{
                    width: 30,
                    height: 30,
                    ml: users.indexOf(user) > 0 ? -1 : 0,
                    border: "2px solid white",
                  }}
                >
                  {user.name[0]}
                </Avatar>
              ))}
              <Avatar sx={{ width: 30, height: 30, ml: -1, bgcolor: "#ccc" }}>
                +{users.length - 3}
              </Avatar>
            </>
          ) : (
            users.map((user) => (
              <Avatar
                key={user.id}
                sx={{
                  width: 30,
                  height: 30,
                  ml: users.indexOf(user) > 0 ? -1 : 0,
                  border: "2px solid white",
                }}
              >
                {user.name[0]}
              </Avatar>
            ))
          )}
        </Box>
        <Button variant="contained" color="success" onClick={handleSelect}>
          Selecionar
        </Button>
      </Box>
    </Card>
  );
}
