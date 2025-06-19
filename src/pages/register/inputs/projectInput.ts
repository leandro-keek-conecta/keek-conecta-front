import { InputType } from "@/components/Forms";

 export const projectInputs: InputType[] = [
    {
      name: "projectName",
      title: "Nome",
      placeholder: "Digite o nome do projeto",
      type: "Select",
      colSpan: 6,
      selectOptions: [
        { label: "Projeto A", value: 1 },
        { label: "Projeto B", value: 2 },
        { label: "Projeto C", value: 3 },
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