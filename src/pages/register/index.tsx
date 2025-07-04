import styles from "./register.module.css";
import Forms, { InputType } from "@/components/Forms";
import { Layout } from "@/components/Layout";
import { useForm, useWatch } from "react-hook-form";
import { userInputs } from "./inputs/userInput";
import { userInputsUpdate } from "./inputs/userInputUpdate";
import { Box, Card, Typography, CircularProgress, Button } from "@mui/material";
import { useEffect, useState } from "react";
import { logout } from "@/services/auth/authService";
import CustomAlert from "@/components/Alert";
import { GenericDataTable } from "@/components/DataTable";
import { columnsUsers } from "./colunsOfUsers/colunsUserData";
import { Grid } from "@mui/material";
import { useCallback } from "react";
import {
  createUser,
  fetchUsers,
  updateUser,
} from "@/services/user/userService";
import User from "@/@types/IUserType";
import { Role } from "@/@types/IRoleType";
import { projectInputs } from "./inputs/projectInput";
import { fetchProjects, ProjectDTO } from "@/services/projetos/projetoService";
import { ModalUserDelete } from "./modalDelete";

type RoleUser = "ADMIN" | "USER";

type FormValues = {
  id?: number;
  name: string;
  email: string;
  profession: string;
  role?: any;
  password?: string;
  projectName?: string;
  projectLogoUrl?: string;
};

export default function Register() {
  const [loading, setLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const [projects, setProjects] = useState<ProjectDTO[]>([]);
  const [projectToDelete, setProjectToDelete] = useState<ProjectDTO | null>(
    null
  );
  const [userToDelete, setUserToDelete] = useState<ProjectDTO | null>(null);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);

  const [alert, setAlert] = useState<{
    show: boolean;
    category?: "success" | "error" | "info" | "warning";
    title?: string;
  }>({
    show: false,
    category: undefined,
    title: undefined,
  });

  const handleEditUser = useCallback((row: User) => {
    changeForEdit(row);
  }, []);

  const handleDeleteUser = useCallback((row: any) => {
    setUserToDelete(row);
    setOpenDeleteModal(true);
  }, []);

  const projectInputList = Array.isArray(projects)
    ? projects.map((project) => ({
        label: project.name,
        value: project.id,
      }))
    : [];

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
  ];

  const {
    control: controlCreate,
    handleSubmit: handleCreate,
    reset: resetCreate,
    watch,
    formState: { errors: errorsCreate },
    setValue: setValueCreate,
  } = useForm<FormValues>({
    defaultValues: { role: "USER" },
    shouldUnregister: true,
  });

  const selectedProjectId = useWatch({
    control: controlCreate,
    name: "projectName",
  });

  //  Formulário de edição
  const {
    control: controlEdit,
    handleSubmit: handleEdit,
    reset: resetEdit,
    formState: { errors: errorsEdit },
  } = useForm<FormValues>({
    defaultValues: {},
    shouldUnregister: true,
  });

  useEffect(() => {
    loadUsers();
  }, []);

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
    const selectedProject = projects.find(
      (proj) => proj.id === Number(selectedProjectId)
    );
    if (selectedProject?.logoUrl) {
      setValueCreate("projectLogoUrl", selectedProject.logoUrl);
    } else {
      setValueCreate("projectLogoUrl", "");
    }
  }, [selectedProjectId, projects, setValueCreate]);

  useEffect(() => {
    if (alert.show) {
      const timeout = setTimeout(() => setAlert({ show: false }), 5000);
      return () => clearTimeout(timeout);
    }
  }, [alert.show]);

  async function loadUsers() {
    try {
      const data = await fetchUsers();
      const usersWithProject = data.map((item) => ({
        ...item,
        projectName: item.projeto?.name ?? "", // Evita erro se "projeto" for null
      }));
      setUsers(usersWithProject);
    } catch (error) {
      console.error("Erro ao buscar usuários:", error);
    }
  }

  function changeForEdit(user: User) {
    resetEdit({
      id: user.id,
      name: user.name,
      email: user.email,
      profession: user.profession,
      role: user.role,
    });
    setIsEditing(true);
  }

  async function onSubmitCreate(data: any) {
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
      resetCreate();
      await loadUsers();
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

  async function onSubmiteUpdate(data: any) {
    try {
      setLoading(true);
      await updateUser({ id: data.id, ...data });
      setAlert({
        show: true,
        category: "success",
        title: "Usuário atualizado com sucesso!",
      });
      await loadUsers();
      resetEdit();
      setIsEditing(false);
    } catch (err: any) {
      const msg = err.message || "Erro ao atualizar usuário";
      setAlert({ show: true, category: "error", title: msg });
    } finally {
      setLoading(false);
    }
  }

  return (
    <Layout titulo="Tela de Usuários">
      {/* Alerta de feedback */}
      {alert.show && alert.title && (
        <CustomAlert
          category={alert.category}
          title={alert.title}
          onClose={() => setAlert({ show: false })}
        />
      )}

      {/* modal de delete de usuário */}
      {userToDelete && (
        <ModalUserDelete
          openModal={openDeleteModal}
          setOpenModal={setOpenDeleteModal}
          idUser={userToDelete.id} // correto
          onDeleted={async () => {
            setAlert({
              show: true,
              category: "success",
              title: "Usuário deletado com sucesso!",
            });
            setUserToDelete(null);
            setOpenDeleteModal(false); // ⬅ fechar o modal aqui
            await loadUsers();
          }}
        />
      )}

      <Box sx={{ m: 3 }}>
        {isEditing && (
          <Grid container justifyContent="left" sx={{ mt: 2 }}>
            <Grid item>
              <button
                className={styles.buttomEdiction}
                onClick={() => {
                  resetEdit();
                  setIsEditing(false);
                }}
              >
                Cancelar Edição
              </button>
            </Grid>
          </Grid>
        )}

        <Card sx={{ p: 3 }}>
          {!isEditing ? (
            // Cadastro
            <form
              onSubmit={handleCreate(onSubmitCreate)}
              className={styles.container}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ mb: 2, textAlign: "center" }}
              >
                Cadastrar Usuário
              </Typography>
              <Forms
                inputsList={userInputs}
                control={controlCreate}
                errors={errorsCreate}
              />

              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ mt: 4, mb: 2, textAlign: "center" }}
              >
                Dados do Projeto
              </Typography>
              <Forms
                inputsList={projectInputs}
                control={controlCreate}
                errors={errorsCreate}
              />
              <Box sx={{ mt: 4 }} className={styles.bottomContainer}>
                <button
                  type="submit"
                  disabled={loading}
                  className={styles.buttom}
                >
                  {loading ? (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  ) : (
                    "Cadastrar"
                  )}
                </button>
              </Box>
            </form>
          ) : (
            //  Edição
            <form
              onSubmit={handleEdit(onSubmiteUpdate)}
              className={styles.container}
            >
              <Typography
                variant="h6"
                fontWeight="bold"
                sx={{ mb: 2, textAlign: "center" }}
              >
                Atualizar Usuário
              </Typography>
              <Forms
                inputsList={userInputsUpdate}
                control={controlEdit}
                errors={errorsEdit}
              />
              <Box sx={{ mt: 4 }} className={styles.bottomContainer}>
                <button
                  type="submit"
                  disabled={loading}
                  className={styles.buttom}
                >
                  {loading ? (
                    <CircularProgress size={24} sx={{ color: "white" }} />
                  ) : (
                    "Atualizar"
                  )}
                </button>
              </Box>
            </form>
          )}
        </Card>
      </Box>

      {/* Tabela */}
      <Box sx={{ p: 3 }}>
        <Card sx={{ mb: 5, mt: 0 }}>
          <GenericDataTable
            rows={users}
            columns={columnsUsers}
            onEdit={handleEditUser}
            onDelete={handleDeleteUser}
          />
        </Card>
      </Box>
    </Layout>
  );
}
