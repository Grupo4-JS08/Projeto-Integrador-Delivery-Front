/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from "axios";
import type Usuario from "../models/Usuario";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
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
  dados: object,
  p0: () => void
) => {
  const resposta = await api.post(url, dados);
  return resposta.data;
};

export const login = async (
  url: string,
  dados: object,
  setDados?: (userData: Usuario) => void
) => {
  const resposta = await api.post(url, dados);

  if (resposta.data.token) {
    localStorage.setItem("token", resposta.data.token);
    localStorage.setItem("usuario", JSON.stringify(resposta.data));

    // Chama a callback se existir
    if (setDados) {
      setDados(resposta.data);
    }
  }

  return resposta.data;
};

export const buscar = async (url: string, header: object = {}) => {
  const resposta = await api.get(url, header);
  return resposta.data;
};

export const cadastrar = async (
  url: string,
  dados: object,
  header: object = {}
) => {
  const resposta = await api.post(url, dados, header);
  return resposta.data;
};

export const atualizar = async (
  url: string,
  dados: object,
  header: object = {}
) => {
  const resposta = await api.put(url, dados, header);
  return resposta.data;
};

export const deletar = async (url: string, header: object = {}) => {
  await api.delete(url, header);
};

export default api;
