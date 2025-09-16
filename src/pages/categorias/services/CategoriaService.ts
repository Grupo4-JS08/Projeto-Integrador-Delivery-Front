
import type Categoria from "../../../models/Categoria";
import api from "../../../services/Service";

export const buscarCategorias = async (): Promise<Categoria[]> => {
  const response = await api.get('/categorias');
  return response.data;
};

export const buscarCategoriaPorId = async (id: number): Promise<Categoria> => {
  const response = await api.get(`/categorias/${id}`);
  return response.data;
};

export const buscarCategoriasPorDescricao = async (descricao: string): Promise<Categoria[]> => {
  const response = await api.get(`/categorias/descricao/${descricao}`);
  return response.data;
};
