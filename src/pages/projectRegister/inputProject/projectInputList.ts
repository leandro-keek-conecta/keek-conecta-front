import { InputType } from "@/components/Forms";

 export const projectInputs: InputType[] = [
    {
      name: "name",
      title: "Nome",
      placeholder: "Digite o nome do projeto",
      type: "text",
      colSpan: 6,
      rules: { required: "Nome do projeto é obrigatório" },
    },
    {
      name: "logoUrl",
      title: "Logo",
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