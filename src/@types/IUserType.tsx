import Projeto from "./IProjetoType";
import Role from "./IRoleType";

export default interface User {
  id?: number;
  email: string;
  password?: string; // opcional no frontend se não precisar mostrar
  name?: string;
  profession?: string;
  role?: Role;
  projetoId?: number;
  projeto?: Projeto; // opcional para evitar circularidade
}
