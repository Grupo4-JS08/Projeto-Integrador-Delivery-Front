import type Produto from "../models/Produto";
import api from "./Service";
import { normalizarPreco } from "./ProdutoService";

export async function buscarProdutosDoCarrinho(ids: number[]): Promise<Produto[]> {
  if (!Array.isArray(ids) || ids.length === 0) return [];

  const resultados = await Promise.allSettled(
    ids.map((id) => api.get(`/produtos/${id}`))
  );

  const produtosValidos = resultados
    .filter((resultado): resultado is PromiseFulfilledResult<any> => resultado.status === "fulfilled")
    .map((resultado) => normalizarPreco(resultado.value.data) as Produto);

  return produtosValidos;
}
