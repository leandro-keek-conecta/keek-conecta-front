import City from "./ICityType";
import Role from "./IRoleType";

export default interface User {
  id: number;
  email: string;
  password?: string; // opcional no frontend se não precisar mostrar
  name: string;
  birthDate?: string; // geralmente tratado como ISO string no frontend
  profession?: string;
  gender: string;
  role: Role;
  cityId: number;
  city?: City; // opcional para evitar circularidade
  createdAt: string;
  updatedAt: string;
}
