import styles from "./register.module.css";
import Forms, { InputType } from "@/components/Forms";
import { Layout } from "@/components/Layout";
import { Box, Button, Card, CircularProgress, Typography } from "@mui/material";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
} from "@mui/material";
import { createProject } from "@/services/projetos/projetoService";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { userInputs } from "./inputs/userInput";
import { projectInputs } from "./inputs/projectInput";
import { createUser } from "@/services/user/userService";
import CustomAlert from "@/components/Alert";
import { logout } from "@/services/auth/authService";
import { fetchProjects, ProjectDTO } from "@/services/projetos/projetoService";
import { ClassNames } from "@emotion/react";

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [newProjectName, setNewProjectName] = useState("");
  const [newProjectLogo, setNewProjectLogo] = useState("");
  const [newProjectDashUrl, setNewProjectDashUrl] = useState("");
  const [newProjectCorHex, setNewProjectCorHex] = useState("#000000");
  const [projects, setProjects] = useState<ProjectDTO[]>([]);

  const handleCreateProject = async () => {
    if (!newProjectName || !newProjectLogo) {
      setAlert({
        show: true,
        category: "warning",
        title: "Preencha todos os campos do projeto",
      });
      return;
    }

    try {
      await createProject({
        name: newProjectName,
        logoUrl: newProjectLogo,
        dashUrl: newProjectDashUrl,
        corHex: newProjectCorHex
      });

      setAlert({
        show: true,
        category: "success",
        title: "Projeto criado com sucesso!",
      });

      // Atualiza lista de projetos
      const updatedProjects = await fetchProjects();
      setProjects(updatedProjects);

      // Limpa e fecha
      setNewProjectName("");
      setNewProjectLogo("");
      setOpenModal(false);
    } catch (error: any) {
      const msg = error.message || "Erro ao criar projeto";
      setAlert({ show: true, category: "error", title: msg });
    }
  };

  const {
    control,
    handleSubmit,
     watch, 
     setValue,
    reset,
    formState: { errors },
  } = useForm();
  const projectInputList = Array.isArray(projects)
    ? projects.map((project) => ({
        label: project.name,
        value: project.id,
      }))
    : [];
    
  const selectedProjectId = watch("projectName");
  const projectInputs: InputType[] = [
    {
      name: "projectName",
      title: "Nome",
      placeholder: "Digite o nome do projeto",
      type: "Select",
      colSpan: 6,
      selectOptions: [...projectInputList],
      rules: { required: "Nome do projeto é obrigatório" },
    },
    {
      name: "projectLogoUrl",
      title: "Url",
      placeholder: "Digite a URL da logo do projeto",
      type: "text",
      colSpan: 6,
      rules: { required: "URL da logo é obrigatória" },
    },
    {
      name: "dashUrl",
      title: "Url do dash",
      placeholder: "Digite a URL de acesso ao dash",
      type: "text",
      colSpan: 6,
      rules: { required: "URL da logo é obrigatória" },
    },
    {
      name: "corHex",
      title: "Cor Padrão do Projeto",
      placeholder: "Selecione a Cor Padrão do Projeto",
      type: "text",
      colSpan: 6,
      rules: { required: "URL da logo é obrigatória" },
    },
  ];

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

      if (
        errorMsg.includes("não autorizado") ||
        errorMsg.includes("não tem permissão")
      ) {
        // Ação automática se não autorizado
        logout();
        // Talvez redirecionar para login:
        // router.push('/login');
      }
    } finally {
      setLoading(false);
    }
  }

   useEffect(() => {
    async function loadProjects() {
      try {
        const data = await fetchProjects();
        if (Array.isArray(data)) setProjects(data);
      } catch (error) {
        console.error("Erro ao buscar projetos:", error);
      }
    }

    loadProjects();
  }, []);

  useEffect(() => {
    if (selectedProjectId) {
      const selected = projects.find((p) => p.id === selectedProjectId);
      if (selected) {
        setValue("projectLogoUrl", selected.logoUrl);
        setValue("dashUrl", selected.dashUrl);
        setValue("corHex", selected.corHex);
      }
    }
  }, [selectedProjectId, projects, setValue]);

  useEffect(() => {
    if (alert.show) {
      const timeout = setTimeout(() => setAlert({ show: false }), 5000);
      return () => clearTimeout(timeout);
    }
  }, [alert.show]);

  return (
    <Layout titulo="Tela de cadastro">
      {/*Componente de alert */}
      {alert.show && alert.title && (
        <CustomAlert
          category={alert.category}
          title={alert.title}
          onClose={() => setAlert({ show: false })}
        />
      )}
      {/* Modal de cadastro */}
      <Dialog open={openModal} onClose={() => setOpenModal(false)} maxWidth="sm" fullWidth>
        <DialogTitle>Cadastrar novo projeto</DialogTitle>
        <DialogContent dividers>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            <TextField
              label="Nome do Projeto"
              value={newProjectName}
              onChange={(e) => setNewProjectName(e.target.value)}
              required
            />
            <TextField
              label="URL da Logo"
              value={newProjectLogo}
              onChange={(e) => setNewProjectLogo(e.target.value)}
              required
            />
            <TextField
              label="URL do Dash"
              value={newProjectDashUrl}
              onChange={(e) => setNewProjectDashUrl(e.target.value)}
              required
            />
            <TextField
              label="Cor padrão do Projeto"
              type="color"
              value={newProjectCorHex}
              onChange={(e) => setNewProjectCorHex(e.target.value)}
              InputLabelProps={{ shrink: true }}
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenModal(false)}>Cancelar</Button>
          <Button variant="contained" onClick={handleCreateProject}>
            Cadastrar
          </Button>
        </DialogActions>
      </Dialog>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
        <Box sx={{ mt: 2, textAlign: "center" }} className={styles.buttonContainer} >
          <Button onClick={() => setOpenModal(true)} className={styles.buttonContent}>
            Cadastrar novo projeto
          </Button>
        </Box>
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
