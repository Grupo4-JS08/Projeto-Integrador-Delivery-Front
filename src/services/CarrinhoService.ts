import type Produto from "../models/Produto";
import api from "./Service";
import { normalizarPreco } from "./ProdutoService";

export async function buscarProdutosDoCarrinho(
  ids: number[]
): Promise<Produto[]> {
  if (ids.length === 0) return [];
  const produtos = await Promise.all(
    ids.map((id) => api.get(`/produtos/${id}`))
  );
  return produtos.map((res) => normalizarPreco(res.data) as Produto);
}
