import styles from "./projectRegister.module.css";
import Forms from "@/components/Forms";
import { Layout } from "@/components/Layout";
import { useForm } from "react-hook-form";
import { projectInputs } from "./inputProject/projectInputList";
import { Box, Card, Typography, CircularProgress, Button } from "@mui/material";
import { useEffect, useState } from "react";
import {
  createProject,
  fetchProjects,
  ProjectDTO,
  updateProject,
} from "@/services/projetos/projetoService";
import { logout } from "@/services/auth/authService";
import CustomAlert from "@/components/Alert";
import { GenericDataTable } from "@/components/DataTable";
import { columnsProject } from "./colunsOfData/colunsProjectData";
import { ModalDelete } from "./modalDelete";

export default function ProjectRegister() {
  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [projects, setProjects] = useState<ProjectDTO[]>([]);
  const [projectSelected, setProjectSelected] = useState<ProjectDTO | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [projectToDelete, setProjectToDelete] = useState<ProjectDTO | null>(null);
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

  useEffect(() => {
    loadProjects();
  }, []);

  async function loadProjects() {
    try {
      const data = await fetchProjects();
      if (Array.isArray(data)) setProjects(data);
    } catch (error) {
      console.error("Erro ao buscar projetos:", error);
    }
  }

  function handlerCancelEdit() {
    reset();
    setIsEditing(false);
  }

  async function onSubmit(data: any) {
    const projectData = {
      name: data.name,
      logoUrl: data.logoUrl,
      dashUrl: data.dashUrl,
      corHex: data.corHex,
    };

    try {
      setLoading(true);

      if (isEditing && projectSelected) {
        await updateProject({
          id: projectSelected.id,
          ...projectData,
        });
        setAlert({
          show: true,
          category: "success",
          title: "Projeto atualizado com sucesso!",
        });
      } else {
        await createProject(projectData);
        setAlert({
          show: true,
          category: "success",
          title: "Projeto cadastrado com sucesso!",
        });
      }

      reset();
      setIsEditing(false);
      setProjectSelected(null);
      await loadProjects();
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
        logout();
      }
    } finally {
      setLoading(false);
    }
  }

  function handleEdit(row: ProjectDTO) {
    setProjectSelected(row);
    setIsEditing(true);
    setValue("name", row.name);
    setValue("logoUrl", row.logoUrl || "");
    setValue("dashUrl", row.dashUrl || "");
    setValue("corHex", row.corHex || "");
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
      {projectToDelete && (
        <ModalDelete
          openModal={openDeleteModal}
          setOpenModal={setOpenDeleteModal}
          idProject={projectToDelete.id}
          onDeleted={async () => {
            setAlert({
              show: true,
              category: "success",
              title: "Projeto deletado com sucesso!",
            });
            setProjectToDelete(null);
            await loadProjects();
          }}
        />
      )}
      <Card sx={{ p: 2, m: 2 }}>
        <Typography
          variant="h6"
          fontWeight="bold"
          sx={{ mb: 2, textAlign: "center", pb: "1rem" }}
        >
          {isEditing ? "Editar Projeto" : "Dados do Projeto"}
        </Typography>

        <form onSubmit={handleSubmit(onSubmit)} className={styles.container}>
          <Forms inputsList={projectInputs} control={control} errors={errors} />

          <Box sx={{ mt: 4 }} className={styles.bottonContainer}>
            <button type="submit" disabled={loading} className={styles.button}>
              {loading ? (
                <CircularProgress size={24} sx={{ color: "white" }} />
              ) : isEditing ? (
                "Atualizar"
              ) : (
                "Cadastrar"
              )}
            </button>
          </Box>
        </form>
      </Card>

      <Box>
        <Box
          sx={{ m: 2, mb: 0, textAlign: "center" }}
          className={`${styles.buttonContainer} ${
            isEditing ? styles.visible : styles.hidden
          }`}
        >
          <Button
            onClick={() => handlerCancelEdit()}
            className={styles.buttonContent}
          >
            Cancelar edição
          </Button>
        </Box>
        <Card sx={{ m: 2, mb: 5, mt: 0 }}>
          <GenericDataTable
            rows={projects}
            columns={columnsProject}
            onEdit={handleEdit}
            onDelete={(row) => {
              setProjectToDelete(row);
              setOpenDeleteModal(true);
            }}
            hideActions={false}
          />
        </Card>
      </Box>
    </Layout>
  );
}
