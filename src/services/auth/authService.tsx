import { useAuth } from "@/context/AuthContext";
import UserLogin from "../../@types/userLogin";
import { api } from "@/services/api/api";

export async function login(data: UserLogin) {
    
  try {
    const response = await api.post("/auth/login", data);

    // Armazena o token no localStorage após o login
    if (response.data.response.accessToken) {
      localStorage.setItem("token", response.data.response.accessToken);
    }


    // Armazena os dados do usuário no localStorage
    if (response.data.response.user) {
      const userRole = response.data.response.user
      localStorage.setItem("user", JSON.stringify(userRole)); // Serializa o objeto
    }

    return response; // Retorna os dados recebidos da API
  } catch (error: any) {
    const message =
      error.response?.data?.message || "Erro ao conectar ao servidor";
    throw new Error(message); // Retorna uma mensagem de erro clara
  }
}

export async function logout() {
  const { setUser } = useAuth();
  try {
    // Exemplo de chamada de logout, se necessário
    /* await api.post("/auth/logout"); */
    setUser(null);
    localStorage.clear() // Remove o token do localStorage
  } catch (error: any) {
    console.error("Erro ao fazer logout: ", error);
  }
}
