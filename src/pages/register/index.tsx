import Forms, { InputType } from "@/components/Forms";
import { Layout } from "@/components/Layout";
import { Box, Card, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function Register() {
  const [loading, setLoading] = useState(false);

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data: any) => {
    console.log("Cadastro do usuário:", data);
  };

  // Inputs de "Dados do Usuário"
  const userInputs: InputType[] = [
    {
      name: "name",
      title: "Nome",
      placeholder: "Digite seu nome completo",
      type: "text",
      colSpan: 4,
      rules: { required: "Nome é obrigatório" },
    },
    {
      name: "email",
      title: "E-mail",
      placeholder: "Digite seu e-mail completo",
      type: "email",
      colSpan: 4,
      rules: {
        required: "E-mail é obrigatório",
        pattern: {
          value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
          message: "E-mail inválido",
        },
      },
    },
    {
      name: "profession",
      title: "Profissão",
      placeholder: "Digite sua profissão",
      type: "text",
      colSpan: 4,
      rules: { required: "Profissão é obrigatória" },
    },
    {
      name: "password",
      title: "Senha",
      placeholder: "Digite sua senha",
      type: "password",
      colSpan: 4,
      rules: {
        required: "Senha é obrigatória",
        minLength: { value: 6, message: "Mínimo 6 caracteres" },
      },
    },
    {
      name: "passwordConfirm",
      title: "Confirme sua senha",
      placeholder: "Digite sua senha novamente",
      type: "password",
      colSpan: 4,
      rules: {
        required: "Confirmação de senha é obrigatória",
      },
    },
    {
      name: "role",
      title: "Digite o Nível de acesso",
      placeholder: "Digite sua função no projeto",
      type: "Select",
      selectOptions: [
        { label: "Usuário Comum", value: "USER" },
        { label: "Administrador", value: "ADMIN" },
        { label: "Super Administrador", value: "SUPERADMIN" },
      ],
      colSpan: 4,
      rules: { required: "Função é obrigatória" },
    },
  ];

  // Inputs de "Dados do Projeto"
  const projectInputs: InputType[] = [
    {
      name: "projectName",
      title: "Nome",
      placeholder: "Digite o nome do projeto",
      type: "Select",
      colSpan: 6,
      selectOptions: [
        { label: "Projeto A", value: "projeto_a" },
        { label: "Projeto B", value: "projeto_b" },
        { label: "Projeto C", value: "projeto_c" },
      ],
      rules: { required: "Nome do projeto é obrigatório" },
    },
    {
      name: "projectLogoUrl",
      title: "url",
      placeholder: "Digite a URL da logo do projeto",
      type: "text",
      colSpan: 6,
      rules: { required: "URL da logo é obrigatória" },
    },
  ];

  return (
    <Layout titulo="Tela de cadastro">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Card sx={{ p: 3 }}>
          {/* Título: Dados do Usuário */}
          <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, textAlign: "center" }}>
            Dados do Usuário
          </Typography>
          <Forms inputsList={userInputs} control={control} errors={errors} />

          {/* Título: Dados do Projeto */}
          <Typography variant="h6" fontWeight="bold" sx={{ mt: 4, mb: 2, textAlign: "center" }}>
            Dados do Projeto
          </Typography>
          <Forms inputsList={projectInputs} control={control} errors={errors} />

          {/* Botão de submit (você pode estilizar melhor com MUI/Button) */}
          <Box sx={{ mt: 4, }}>
            <button type="submit" disabled={loading}>
              {loading ? "Enviando..." : "Cadastrar"}
            </button>
          </Box>
        </Card>
      </form>
    </Layout>
  );
}
