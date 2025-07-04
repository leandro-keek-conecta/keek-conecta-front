import User from "./IUserType";

export default interface Projeto {
  id: number;
  name: string;
  state: string;
  logoUrl?: string;
  users?: User[]; // geralmente omitido no frontend para evitar carregar tudo
  createdAt: string;
  updatedAt: string;
}
