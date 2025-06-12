import axios, { AxiosResponse } from "axios";

// Obtenha o token do localStorage ou de outro lugar, se necessário
const getUserToken = () => localStorage.getItem("token") || "";

const baseURL = `http://localhost:5443/keek-api`;

export const api = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getUserToken()}`, // Token dinâmico
  },
});

// Interceptores para tratar respostas e erros
api.interceptors.response.use(
  (response) => response, // Sucesso, apenas retorna a resposta
  (error) => {
    console.log("Erro na requisição: ", error);

    const data = error.response?.data || { message: "Erro na requisição" };

    const response: AxiosResponse = {
      data: data,
      status: error.response?.status || 500,
      statusText: error.response?.statusText || "Erro na requisição",
      headers: error.response?.headers || {},
      config: error.config,
      request: error.request,
    };

    // Rejeita a promise com os dados do erro
    return Promise.reject(response);
  }
);
