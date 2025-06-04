import { selctProps } from "./selctProps";

export default interface InputType {
  name: string; // Nome usado para referência no formulário
  title: string; // Texto exibido no input
  placeholder: string;
  variant?: "line" | "border"; // Define o estilo (linha ou borda)
  type?: "text" | "email" | "password" | "Date" | "Select"; // Tipos permitidos
  selectOptions?: selctProps; // Opções para campos do tipo Select
  value: string; // Valor inicial
  colSpan?: number; // Define a largura do input
  onChangeText?: (text: string) => void; // Torna opcional para uso com React Hook Form
  rules?: {
    required?: string;
    minLength?: { value: number; message: string };
    maxLength?: { value: number; message: string };
    pattern?: { value: RegExp; message: string };
    validate?: (value: string) => boolean | string;
  };
}
