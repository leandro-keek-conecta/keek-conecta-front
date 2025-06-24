import style from "./alert.module.css";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";

interface AlertProps {
  category?: "error" | "info" | "warning" | "success";
  title: string;
  onClose?: () => void; // novo
}
export default function CustomAlert({category = "info", title, onClose}: AlertProps) {

  return (
    <Stack className={style.alertContainer}>
      <Alert
        variant="filled"
        severity={category}
        className={style.alert}
        onClick={onClose} 
      >
        {title}
      </Alert>
    </Stack>
  );
}
