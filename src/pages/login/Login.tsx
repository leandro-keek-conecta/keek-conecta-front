import { login } from "@/services/auth/authService";
import styles from "./Login.module.css";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  Link,
  InputAdornment,
  IconButton,
  CircularProgress,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { useState } from "react";
import UserLogin from "@/@types/userLogin";
import { useNavigate } from "react-router-dom";
import CustomAlert from "@/components/Alert";

export default function Login() {
  const [mostraSenha, setMostraSenha] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [alert, setAlert] = useState<{
    show: boolean;
    category?: "success" | "error" | "info" | "warning";
    title?: string;
  }>({
    show: false,
    category: undefined,
    title: undefined,
  });

  async function onSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);

    const data: UserLogin = {
      email: formData.email,
      password: formData.password,
    };
    try {
      const response = await login(data);
      console.log("Resposta completa do login:", response);
      setTimeout(() => {
        console.log("um minuito");
      }, 8000);
      if (response.status === 200) {
        setAlert({
          show: true,
          category: "success",
          title: "Login Feito Com Sucesso!",
        });
        setTimeout(() => {
          navigate("/home");
        }, 3000);
      } 
    } catch (error) {
      setAlert({
        show: true,
        category: "error",
        title: "Login ou Senha Incorretos!",
      });
      setTimeout(() => {
        setAlert({
          show: false,
        });
      }, 3000);
    }
    setLoading(false);
  }

  const toggleMostraSenha = () => setMostraSenha(!mostraSenha);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <Box className={styles.loginContainer}>
      {alert.show && alert.title && (
        <CustomAlert category={alert.category} title={alert.title} />
      )}
      <Box className={styles.containerLeft}>
        <Box className={styles.logo}>
          <Typography variant="h4" fontWeight="bold" color="white">
            Logo
          </Typography>
        </Box>
        <Box className={styles.titleSubtitle}>
          <Typography variant="h3" fontWeight="bold" color="white">
            Plataforma de Apoio
            <br />à Tomada de Decisão
          </Typography>
          <Typography variant="body1" color="white" mt={2}>
            Um ecossistema de soluções inteligentes e integradas que garantem
            resultados eficientes
          </Typography>
        </Box>
        <Box className={styles.aboutButtom}>
          <Button variant="contained" sx={{ bgcolor: "#f57c00" }}>
            Saiba Mais
          </Button>
        </Box>
      </Box>

      {/* Lado direito - Formulário */}
      <Box className={styles.containerRight}>
        <Box className={styles.loginForm}>
          <Box className={styles.titleForm}>
            <Typography fontWeight="bold" mb={2} className={styles.title}>
              Tela de acesso
            </Typography>
            <Typography variant="body2" mb={3} className={styles.subtitle}>
              Faça seu login para acessar todas as funcionalidades
            </Typography>
          </Box>
          <form className={styles.form} onSubmit={onSubmit}>
            <TextField
              fullWidth
              label="Seu e-mail"
              type="email"
              margin="normal"
              name="email"
              variant="outlined"
              size="medium"
              value={formData.email}
              onChange={handleChange}
              sx={{ backgroundColor: "white", borderRadius: "4px" }}
              InputProps={{
                style: {
                  color: "#333", // cor do texto digitado
                },
              }}
              InputLabelProps={{
                style: {
                  color: "#555", // cor do label (placeholder flutuante)
                },
              }}
            />

            <TextField
              fullWidth
              label="Sua senha"
              type={mostraSenha ? "text" : "password"}
              name="password"
              margin="normal"
              variant="outlined"
              size="medium"
              value={formData.password}
              onChange={handleChange}
              sx={{ backgroundColor: "white", borderRadius: "4px" }}
              InputProps={{
                style: {
                  color: "#333", // cor do texto digitado
                },
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton onClick={toggleMostraSenha} edge="end">
                      {mostraSenha ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              InputLabelProps={{
                style: {
                  color: "#555", // cor do label (placeholder flutuante)
                },
              }}
            />

            <Box
              display="flex"
              justifyContent="space-between"
              alignItems="center"
              mt={1}
              mb={2}
            >
              <FormControlLabel
                control={<Checkbox size="medium" />}
                label="lembre de mim"
              />
              <Link href="#" fontSize="0.8rem" color="#FFFFF">
                Esqueceu a senha?
              </Link>
            </Box>

            <Button
              variant="contained"
              fullWidth
              sx={{ bgcolor: "#f57c00", py: 1.2 }}
              type="submit"
            >
              {loading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                <p>Enviar</p>
              )}
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
