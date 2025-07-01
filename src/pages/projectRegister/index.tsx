import styles from "./projectRegister.module.css";
import Forms from "@/components/Forms";
import { Layout } from "@/components/Layout";
import { useForm } from "react-hook-form";
import { projectInputs } from "./inputProject/projectInputList";
import { Box, Card, Typography, CircularProgress, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { createProject } from "@/services/projetos/projetoService";
import { logout } from "@/services/auth/authService";
import CustomAlert from "@/components/Alert";

export default function ProjectRegister() {
  const { control,handleSubmit,watch,setValue,reset,formState: { errors }} = useForm();
  const [loading, setLoading] = useState(false);
  const [alert, setAlert] = useState<{
    show: boolean;
    category?: "success" | "error" | "info" | "warning";
    title?: string;
  }>({
    show: false,
    category: undefined,
    title: undefined,
  });

  useEffect(() => {
    if (alert.show) {
      const timeout = setTimeout(() => setAlert({ show: false }), 5000);
      return () => clearTimeout(timeout);
    }
  }, [alert.show]);
  async function onSubmit(data: any) {
    const projectData = {
      name: data.name,
      logoUrl: data.logoUrl,
      dashUrl: data.dashUrl,
      corHex: data.corHex,
    };

    try {
      setLoading(true);
      await createProject(projectData);

      setAlert({
        show: true,
        category: "success",
        title: "Projeto cadastrado com sucesso!",
      });

      reset(); // limpa o formulário após sucesso
    } catch (error: any) {
      const errorMsg = error.message || "Erro desconhecido";

      setAlert({
        show: true,
        category: "error",
        title: `Erro: ${errorMsg}`,
      });

      if (
        errorMsg.includes("não autorizado") ||
        errorMsg.includes("não tem permissão")
      ) {
        // Ação automática se não autorizado
        logout();
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout titulo="Cadastro de Projetos">
      {alert.show && alert.title && (
        <CustomAlert
          category={alert.category}
          title={alert.title}
          onClose={() => setAlert({ show: false })}
        />
      )}
      <Card sx={{ p: 3, m: 2 }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ mb: 2, textAlign: "center", pb: "1rem" }}
        >
          Dados do Projeto
        </Typography>
        <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
          <Forms inputsList={projectInputs} control={control} errors={errors} />
             <Box sx={{ mt: 4, mb: 2 }} className={styles.bottomContainer}>
          <button type="submit" disabled={loading} className={styles.buttom}>
            {loading ? (
              <CircularProgress size={24} sx={{ color: "white" }} />
            ) : (
              "Cadastrar"
            )}
          </button>
        </Box>
        </form>
   
      </Card>
    </Layout>
  );
}
