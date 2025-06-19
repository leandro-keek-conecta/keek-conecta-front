import { InputType } from "@/components/Forms";

export const userInputs: InputType[] = [
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
      type: "text",
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
      type: "text",
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