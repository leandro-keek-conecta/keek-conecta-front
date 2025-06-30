import axios, { AxiosResponse, AxiosError } from "axios";

// Função para obter o token do localStorage
const getUserToken = (): string | null => localStorage.getItem("token");

// URL base da sua API
const baseURL = `https://apoio-gestao.keekconecta.com.br/keek-api`;

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar o token de autorização a cada requisição
api.interceptors.request.use(
  (config) => {
    const token = getUserToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Interceptor para tratar respostas e erros
api.interceptors.response.use(
  (response) => response, // Requisição bem-sucedida, retorna a resposta
  (error: AxiosError) => {
    if (error.response) {
      // O servidor respondeu com um status de erro (ex: 4xx, 5xx)
      console.error("Erro na resposta da API:", error.response.data);
      console.error("Status:", error.response.status);

      // Exemplo: Lidar com token expirado ou não autorizado
      if (error.response.status === 401) {
        console.warn("Sessão expirada ou não autorizada.");
        // Implemente aqui a lógica para logout ou refresh token
      }
      return Promise.reject(error.response);
    } else if (error.request) {
      // A requisição foi feita, mas nenhuma resposta foi recebida
      console.error("Nenhuma resposta recebida do servidor:", error.request);
      return Promise.reject(new Error("Nenhuma resposta do servidor. Verifique sua conexão."));
    } else {
      // Algo aconteceu na configuração da requisição que disparou um erro
      console.error("Erro na configuração da requisição:", error.message);
      return Promise.reject(new Error(`Erro de configuração: ${error.message}`));
    }
  }
);