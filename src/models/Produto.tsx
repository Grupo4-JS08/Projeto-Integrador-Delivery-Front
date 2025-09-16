import type Categoria from "./Categoria";

export default interface Produto {
  id: number;
  item: string;
  valor: number;
  calorias: number;
  objetivo: "emagrecer" | "hipertrofia" | "geral";
  categoria: Categoria | null;
}
