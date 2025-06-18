import styles from "./register.module.css";
import Forms from "@/components/Forms";
import { Layout } from "@/components/Layout";
import { Box, Button, Card, CircularProgress, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { userInputs } from "./inputs/userInput";
import { projectInputs } from "./inputs/projectInput";
import { createUser } from "@/services/user/userService";
import CustomAlert from "@/components/Alert";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const { control, handleSubmit, formState: { errors } } = useForm();
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
    console.log("Cadastro do usuário:", data);

    const userData = {
      email: data.email,
      password: data.password,
      name: data.name,
      role: data.role,
      profession: data.profession,
      projeto: {
        id: data.projectName,
      },
    };
    try {
      setLoading(true);
      await createUser(userData);

      setAlert({
        show: true,
        category: "success",
        title: "Usuário cadastrado com sucesso!",
      });

      // Oculta o alerta após 5 segundos
      setTimeout(() => {
        setAlert({ show: false });
      }, 5000);
    } catch (error: any) {
      setAlert({
        show: true,
        category: "error",
        title: error.message || "Erro ao cadastrar usuário",
      });

      setTimeout(() => {
        setAlert({ show: false });
      }, 5000);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout titulo="Tela de cadastro">
      {alert.show && alert.title && (
        <CustomAlert category={alert.category} title={alert.title} />
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ p: 3 }}>
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
