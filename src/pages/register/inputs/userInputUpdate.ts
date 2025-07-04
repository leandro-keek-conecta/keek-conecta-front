import { InputType } from "@/components/Forms";

export const userInputsUpdate: InputType[] = [
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
      name: "role",
      title: "Digite o Nível de acesso",
      placeholder: "Digite sua função no projeto",
      type: "Select",
      selectOptions: [
        { label: "Usuário Comum", value: "USER" },
        { label: "Administrador", value: "ADMIN" },
      ],
      colSpan: 4,
      rules: {
        required: 'Selecione um nível de acesso',
        validate: (v: string) => ['USER', 'ADMIN'].includes(v) || 'Valor inválido'
      }
    },
  ];