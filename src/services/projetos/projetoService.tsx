import { api } from "../api/api";

export interface ProjectDTO {
  id: number;
  name: string;
  logoUrl?: string | null;
  dashUrl?: string | null;
  corHex?: string | null;
}

/** GET /projetos – lista todos */
export async function fetchProjects(): Promise<ProjectDTO[]> {
  const response = await api.get("/projeto/list");
  return response.data.data; // ← acessa corretamente o array de projetos
}

/** POST /projetos – cria novo */
export async function createProject(payload: Omit<ProjectDTO, "id">): Promise<ProjectDTO> {
   const { data } = await api.post<ProjectDTO>("/projeto/create", payload);
  return data;
}
  
export async function updateProject(data){
  const response= await api.patch<ProjectDTO>("/projeto/update", data);
  return response;
}

export async function deleteProject(id:number){
  const response= await api.delete(`/projeto/delete/${id}`);
  return response;
}
