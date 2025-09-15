import type Categoria from "./Categoria";

export default interface Produto {
    id: number;
    item: string;
    valor: string;
    calorias: number;
    objetivo: 'emagrecer' | 'hipertrofia' | 'geral';
    categoria: Categoria | null;
}