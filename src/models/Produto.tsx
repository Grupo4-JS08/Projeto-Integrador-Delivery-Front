/* eslint-disable */
import type { ReactNode } from "react";
import type Categoria from "./Categoria";

export default interface Produto {
  id: number;
  item: string;
  nome: string;
  valor: number;
  preco: number;
  descricao: string; 
  calorias: number;
  objetivo: "emagrecer" | "hipertrofia" | "geral";
  categoria: Categoria | null;
}
