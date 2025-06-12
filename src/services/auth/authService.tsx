import UserLogin from "../../@types/userLogin";
import { api } from "@/services/api/api";

export async function login(data: UserLogin) {
  try {
    const response = await api.post("/auth/login", data);
    console.log("response", response)
    console.log(response.data.response.accessToken)
    // Armazena o token no localStorage após o login
    if (response.data.response.accessToken) {
      localStorage.setItem("token", response.data.response.accessToken);
    }


    // Armazena os dados do usuário no localStorage
    if (response.data.response.user) {
      localStorage.setItem("user", JSON.stringify(response.data.response.user)); // Serializa o objeto
      localStorage.setItem("planoId", "74");
    }

    return response; // Retorna os dados recebidos da API
  } catch (error: any) {
    const message =
      error.response?.data?.message || "Erro ao conectar ao servidor";
    throw new Error(message); // Retorna uma mensagem de erro clara
  }
}

export async function logout() {
  try {
    // Exemplo de chamada de logout, se necessário
    await api.post("/auth/logout");
    localStorage.clear() // Remove o token do localStorage
  } catch (error: any) {
    console.error("Erro ao fazer logout: ", error);
  }
}
