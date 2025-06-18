import { userCreateType } from "@/@types/IUserCreateType";
import { useAuth } from "@/context/AuthContext";
import { api } from "@/services/api/api";

export async function createUser(data: userCreateType) {
  try {
    const response = await api.post("/user/create", data);

    return response; // Retorna os dados recebidos da API
  } catch (error) {
    const message =
      error.data?.details || error.data?.message || "Erro ao criar usuário";
    throw new Error(message);
  }
}

export async function logout() {
  const { setUser } = useAuth();
  try {
    // Exemplo de chamada de logout, se necessário
    /* await api.post("/auth/logout"); */
    setUser(null);
    localStorage.clear(); // Remove o token do localStorage
  } catch (error: any) {
    console.error("Erro ao fazer logout: ", error);
  }
}
