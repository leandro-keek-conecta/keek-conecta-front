import styles from "./Login.module.css";
import {
  Box,
  Button,
  Checkbox,
  FormControlLabel,
  TextField,
  Typography,
  Link,
} from "@mui/material";

export default function Login() {
  return (
    <Box className={styles.loginContainer}>
      {/* Lado esquerdo - Apresentação */}
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
          <form>
            <TextField
              fullWidth
              label="Seu e-mail"
              margin="normal"
              variant="outlined"
              size="medium"
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
              type="password"
              margin="normal"
              variant="outlined"
              size="medium"
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
              Enviar
            </Button>
          </form>
        </Box>
      </Box>
    </Box>
  );
}
