// services/ProdutoService.ts

import type Categoria from "../../../models/Categoria";
import type Produto from "../../../models/Produto";
import api from "../../../services/Service";

export const buscarProdutos = async (): Promise<Produto[]> => {
  const response = await api.get('/produtos');
  return response.data;
};

export const buscarProdutosPorCategoria = async (categoria: string): Promise<Produto[]> => {
  const response = await api.get(`/produtos/categoria/${categoria}`);
  return response.data;
};

export const buscarProdutoPorId = async (id: number): Promise<Produto> => {
  const response = await api.get(`/produtos/${id}`);
  return response.data;
};

export const buscarProdutosPorObjetivo = async (objetivo: string): Promise<Produto[]> => {
  const response = await api.get(`/produtos/recomendacao/${objetivo}`);
  return response.data;
};

export const criarProduto = async (produto: Partial<Produto>): Promise<Produto> => {
  const response = await api.post('/produtos', produto);
  return response.data;
};

export const atualizarProduto = async (produto: Produto): Promise<Produto> => {
  const response = await api.put('/produtos', produto);
  return response.data;
};

export const deletarProduto = async (id: number): Promise<void> => {
  await api.delete(`/produtos/${id}`);
};

export const buscarCategorias = async (): Promise<Categoria[]> => {
  const response = await api.get('/categorias');
  return response.data;
};
