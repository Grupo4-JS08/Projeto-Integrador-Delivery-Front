// services/produtoService.ts
import type Produto from "../../../models/Produto";
import api from "../../../services/Service";

export const buscarProdutos = async (): Promise<Produto[]> => {
  const response = await api.get("/produtos");
  return response.data;
};

export const buscarProdutosPorCategoria = async (
  categoria: string
): Promise<Produto[]> => {
  const response = await api.get(`/produtos/categoria/${categoria}`);
  return response.data;
};

export const buscarProdutosPorObjetivo = async (
  objetivo: string
): Promise<Produto[]> => {
  const response = await api.get(`/produtos/recomendacao/${objetivo}`);
  return response.data;
};
