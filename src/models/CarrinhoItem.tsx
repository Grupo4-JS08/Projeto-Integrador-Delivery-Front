import type Produto from "./Produto";

export interface CarrinhoItem {
  produto: Produto;
  quantidade: number;
}