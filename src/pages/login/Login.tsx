import { login } from "@/services/auth/authService";

import styles from "./Login.module.css";
import logoBayeux from "@/assets/bayeux-white.png";
import logoDefault from "@/assets/logo-padrao.png";
import gugaPet from "@/assets/guga-pet.png";
import cmjp from "@/assets/CMJP-PB.png";
import { ThemeProvider } from "@mui/material/styles";
import { themeMap, tema } from "../../theme.tsx"; // Nome correto

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
import { useEffect, useState } from "react";
import UserLogin from "@/@types/userLogin";
import { useLocation, useNavigate } from "react-router-dom";
import CustomAlert from "@/components/Alert";
import { useAuth } from "@/context/AuthContext";
import { useDynamicTheme } from "@/context/ThemeContext.tsx";

export default function Login() {
  const [mostraSenha, setMostraSenha] = useState(false);
  const { setUser } = useAuth();
  const [loading, setLoading] = useState(false);
  const { pathname } = useLocation();
    const { updateThemeColor } = useDynamicTheme();

  const logoMap: Record<string, string> = {
    "/bayeux": logoBayeux,
    "/guga-pet": gugaPet,
    "/conecta-cmjp": cmjp,
  };

  const logoSrc = logoMap[pathname.toLowerCase()] || logoDefault;
  const temaAtual = themeMap[pathname.toLowerCase()] || tema;

  useEffect(() => {
    localStorage.clear();
    setFormData({ email: "", password: "" });
  }, []);

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
      const response = await login(data, updateThemeColor);

      if (response.status === 200) {
        const userRole = response.data.response.user;
        setUser(userRole);

        setAlert({
          show: true,
          category: "success",
          title: "Login Feito Com Sucesso!",
        });

        if (userRole.role === "USER") {
          setTimeout(() => {
            navigate("/home");
          }, 1000);
        } else if (userRole.role === "ADMIN") {
          setTimeout(() => {
            navigate("/projetos");
          }, 1000);
        } else if (userRole.role === "SUPERADMIN") {
          setTimeout(() => {
            navigate("/projetos");
          }, 1000);
        }
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
    <ThemeProvider theme={temaAtual}>
      <Box className={styles.loginContainer}>
        {alert.show && alert.title && (
          <CustomAlert category={alert.category} title={alert.title} />
        )}

        <Box className={styles.loginForm}>
          <Box className={styles.titleForm}>
            <Box
              className={styles.logo}
              style={{ backgroundColor: temaAtual.palette.primary.main }}
            >
              <img
                src={logoSrc}
                alt="Logo"
                style={{ width: "auto", height: "7rem" }}
              />
            </Box>
            <Typography fontWeight="bold" mb={2} className={styles.title}>
              Tela de acesso
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
              onFocus={(e) => e.target.setAttribute("autocomplete", "email")}
              autoComplete="off"
              sx={{ backgroundColor: "white", borderRadius: "4px" }}
              InputProps={{
                style: {
                  color: "#333",
                },
              }}
              InputLabelProps={{
                shrink: true,
                style: {
                  color: "#333",
                  fontSize: "1.1rem", // tamanho equilibrado
                  fontWeight: 500,
                  borderRadius: "8px",
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
                shrink: true, // <-- mantém o label sempre acima
                style: {
                  color: "#333",
                  fontSize: "1.1rem", // tamanho equilibrado
                  fontWeight: 500,
                  borderRadius: "8px",
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
              style={{ backgroundColor: temaAtual.palette.primary.main }}
              sx={{ py: 1.2 }}
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
    </ThemeProvider>
  );
}
