import style from "./alert.module.css";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

interface AlertProps {
  category?: "error" | "info" | "warning" | "success"; // Tipos de input
  title: string;
}

export default function CustomAlert({ category = "info", title }: AlertProps) {
  return (
    <Stack className={style.alertContainer}>
      <Alert variant="filled" severity={category} className={style.alert}> 
        {title}
      </Alert>
    </Stack>
  );
}
