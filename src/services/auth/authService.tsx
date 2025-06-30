import { useAuth } from "@/context/AuthContext";
import UserLogin from "../../@types/userLogin";
import { api } from "@/services/api/api";

export async function login(data: UserLogin, updateThemeColor: (color: string) => void) {
  try {
    const response = await api.post("/auth/login", data);

    if (response.data.response.accessToken) {
      localStorage.setItem("token", response.data.response.accessToken);
    }

    if (response.data.response.user) {
      const userRole = response.data.response.user;
      localStorage.setItem("user", JSON.stringify(userRole));

      // Aqui atualiza imediatamente após login
      const corHex = userRole.projeto.corHex;
      updateThemeColor(corHex);
    }

    return response;
  } catch (error: any) {
    const message = error.response?.data?.message || "Erro ao conectar ao servidor";
    throw new Error(message);
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
