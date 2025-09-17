import { createContext, useState, type ReactNode } from "react";
import type { CarrinhoItem } from "../models/CarrinhoItem";
import type Produto from "../models/Produto";

interface CarrinhoContextProps {
  itens: CarrinhoItem[];
  adicionar: (produto: Produto) => void;
  remover: (id: number) => void;
  alterarQuantidade: (id: number, quantidade: number) => void;
  limpar: () => void;
}

export const CarrinhoContext = createContext<CarrinhoContextProps>({
  itens: [],
  adicionar: () => {},
  remover: () => {},
  alterarQuantidade: () => {},
  limpar: () => {},
});

export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<CarrinhoItem[]>([]);

  function adicionar(produto: Produto) {
    setItens((prev) => {
      const existe = prev.find((i) => i.produto.id === produto.id);
      if (existe) {
        return prev.map((i) =>
          i.produto.id === produto.id
            ? { ...i, quantidade: i.quantidade + 1 }
            : i
        );
      }
      return [...prev, { produto, quantidade: 1 }];
    });
  }

  function remover(id: number) {
    setItens((prev) => prev.filter((i) => i.produto.id !== id));
  }

  function alterarQuantidade(id: number, quantidade: number) {
    setItens((prev) =>
      prev.map((i) =>
        i.produto.id === id
          ? { ...i, quantidade: Math.max(1, quantidade) }
          : i
      )
    );
  }

  function limpar() {
    setItens([]);
  }

  return (
    <CarrinhoContext.Provider value={{ itens, adicionar, remover, alterarQuantidade, limpar }}>
      {children}
    </CarrinhoContext.Provider>
  );
}