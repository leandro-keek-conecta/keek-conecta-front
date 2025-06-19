import styles from "./register.module.css";
import Forms from "@/components/Forms";
import { Layout } from "@/components/Layout";
import { Box, Button, Card, CircularProgress, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { userInputs } from "./inputs/userInput";
import { projectInputs } from "./inputs/projectInput";
import { createUser } from "@/services/user/userService";
import CustomAlert from "@/components/Alert";
import { logout } from "@/services/auth/authService";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const [alert, setAlert] = useState<{
    show: boolean;
    category?: "success" | "error" | "info" | "warning";
    title?: string;
  }>({
    show: false,
    category: undefined,
    title: undefined,
  });
    async function onSubmit(data: any) {
    const userData = {
      email: data.email,
      password: data.password,
      name: data.name,
      role: data.role,
      profession: data.profession,
      projeto: { id: data.projectName },
    };

    try {
      setLoading(true);
      await createUser(userData);

      setAlert({
        show: true,
        category: "success",
        title: "Usuário cadastrado com sucesso!",
      });

      reset(); // limpa o formulário após sucesso
    } catch (error: any) {
      const errorMsg = error.message || "Erro desconhecido";

      setAlert({
        show: true,
        category: "error",
        title: `Erro: ${errorMsg}`,
      });

      if (errorMsg.includes("não autorizado") || errorMsg.includes("não tem permissão")) {
        // Ação automática se não autorizado
        logout();
        // Talvez redirecionar para login:
        // router.push('/login');
      }
    } finally {
      setLoading(false);
    }
  }


  return (
    <Layout titulo="Tela de cadastro">
      {alert.show && alert.title && (
        <CustomAlert category={alert.category} title={alert.title} />
      )}
      <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
        <Card sx={{ p: 3,}}>
          {/* Título: Dados do Usuário */}
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ mb: 2, textAlign: "center" }}
          >
            Dados do Usuário
          </Typography>
          <Forms inputsList={userInputs} control={control} errors={errors} />

          {/* Título: Dados do Projeto */}
          <Typography
            variant="h6"
            fontWeight="bold"
            sx={{ mt: 4, mb: 2, textAlign: "center" }}
          >
            Dados do Projeto
          </Typography>
          <Forms inputsList={projectInputs} control={control} errors={errors} />

          {/* Botão de submit (você pode estilizar melhor com MUI/Button) */}
          <Box sx={{ mt: 4 }} className={styles.bottomContainer}>
            <button type="submit" disabled={loading} className={styles.buttom}>
              {loading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : (
                "Cadastrar"
              )}
            </button>
          </Box>
        </Card>
      </form>
    </Layout>
  );
}
