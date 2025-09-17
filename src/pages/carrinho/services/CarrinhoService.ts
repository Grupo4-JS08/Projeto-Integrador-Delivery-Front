
import type Produto from "../../../models/Produto";
import api from "../../../services/Service";

export async function buscarProdutosDoCarrinho(ids: number[]): Promise<Produto[]> {
  if (ids.length === 0) return [];
  const produtos = await Promise.all(ids.map(id => api.get(`/produtos/${id}`)));
  return produtos.map(res => res.data);
}
