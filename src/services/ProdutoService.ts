import type Categoria from "../models/Categoria";
import type Produto from "../models/Produto";
import api from "./Service";

function normalizarPreco(produto: Partial<Produto>): Partial<Produto> {
  return {
    ...produto,
    // Garante que valor e preco sejam números válidos com ponto
    valor:
      produto.valor !== undefined
        ? parseFloat(produto.valor.toString().replace(",", "."))
        : undefined,
    preco:
      produto.preco !== undefined
        ? parseFloat(produto.preco.toString().replace(",", "."))
        : undefined,
  };
}

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

export const buscarProdutoPorId = async (id: number): Promise<Produto> => {
  const response = await api.get(`/produtos/${id}`);
  return response.data;
};

export const buscarProdutosPorObjetivo = async (
  objetivo: string
): Promise<Produto[]> => {
  const response = await api.get(`/produtos/recomendacao/${objetivo}`);
  return response.data;
};

// 🧠 Aqui é onde você deve converter o número antes de enviar
export const criarProduto = async (
  produto: Partial<Produto>
): Promise<Produto> => {
  const produtoNormalizado = normalizarPreco(produto);
  const response = await api.post("/produtos", produtoNormalizado);
  return response.data;
};

// 🧠 Mesmo ajuste para atualização
export const atualizarProduto = async (produto: Produto): Promise<Produto> => {
  const produtoNormalizado = normalizarPreco(produto);
  const response = await api.put("/produtos", produtoNormalizado);
  return response.data;
};

export const deletarProduto = async (id: number): Promise<void> => {
  await api.delete(`/produtos/${id}`);
};

export const buscarCategorias = async (): Promise<Categoria[]> => {
  const response = await api.get("/categorias");
  return response.data;
};
