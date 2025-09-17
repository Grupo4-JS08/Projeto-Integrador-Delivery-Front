import type Categoria from "./Categoria";

export default interface Produto {
  nome: ReactNode;
  preco: any;
  descricao: ReactNode;
  id: number;
  item: string;
  valor: number;
  calorias: number;
  objetivo: "emagrecer" | "hipertrofia" | "geral";
  categoria: Categoria | null;
}
