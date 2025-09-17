/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-wrapper-object-types */
/* eslint-disable @typescript-eslint/no-unsafe-function-type */
import axios from "axios";

// Configuração base da API
const api = axios.create({
  baseURL: "https://projeto-integrador-delivery.onrender.com", // URL do back-end NestJS
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para adicionar o token de autenticação às requisições
api.interceptors.request.use(
  (config) => {
    let token = localStorage.getItem("token");
    if (token) {
      token = token.replace("Bearer ", "");
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const cadastrarUsuario = async (
  url: string,
  dados: Object,
  setDados: Function
) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);
};

// Login do usuário (ou admin)
export const login = async (url: string, dados: Object, setDados: Function) => {
  const resposta = await api.post(url, dados);
  setDados(resposta.data);

  // Salva o token no localStorage
  if (resposta.data.token) {
    localStorage.setItem("token", resposta.data.token);
    localStorage.setItem("usuario", JSON.stringify(resposta.data));

    // Decodifica o token para verificar se é admin
    try {
      const decoded: any = jwtDecode(resposta.data.token);
      if (decoded.isMasterAdmin) {
        localStorage.setItem("isAdmin", "true");
        return resposta.data;
      } else {
        localStorage.setItem("isAdmin", "false");
        return resposta.data;
      }
    } catch (err) {
      console.error("Erro ao decodificar token JWT:", err);
      localStorage.setItem("isAdmin", "false");
    }
  }
};

// Função para verificar se está logado e se é admin
export const isAdmin = (): boolean => {
  return localStorage.getItem("isAdmin") === "true";
};

export const buscar = async (
  url: string,
  setDados: Function,
  header: Object = {}
) => {
  const resposta = await api.get(url, header);
  setDados(resposta.data);
};

export const cadastrar = async (
  url: string,
  dados: Object,
  setDados: Function,
  header: Object = {}
) => {
  const resposta = await api.post(url, dados, header);
  setDados(resposta.data);
};

export const atualizar = async (
  url: string,
  dados: Object,
  setDados: Function,
  header: Object = {}
) => {
  const resposta = await api.put(url, dados, header);
  setDados(resposta.data);
};

export const deletar = async (url: string, header: Object = {}) => {
  await api.delete(url, header);
};

export default api;
function jwtDecode(token: any): any {
  throw new Error("Function not implemented.");
}

