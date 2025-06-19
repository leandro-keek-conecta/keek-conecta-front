import { api } from "../api/api";

interface CreateUserParams {
  email: string;
  name: string;
  password: string;
  profession: string;
  role: string;
  projeto: { id: number };
}

interface ApiResponse {
  message: string;
  data?: any;
}

export async function createUser(userData: CreateUserParams): Promise<ApiResponse> {
  try {
    const response = await api.post('/user/create', userData);
    
    return {
      message: response.data.message,
      data: response.data.data,
    };
  } catch (error: any) {
    const status = error.status;
    const message = error.data.message || "Erro inesperado no servidor.";

    if (status === 401) {
      throw new Error("Usuário não autorizado. Verifique seu login.");
    }

    if (status === 403) {
      throw new Error("Você não tem permissão para criar usuários.");
    }

    if (status === 409) {
      throw new Error("O email informado já está cadastrado.");
    }

    if (status === 400) {
      throw new Error("Erro de validação: " + (error.data.issues?.[0]?.message || message));
    }

    // Tratamento para outros erros não mapeados especificamente
    throw new Error(message);
  }
}
