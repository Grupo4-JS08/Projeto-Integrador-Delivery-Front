/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, type ReactNode, useEffect } from "react";
import type { CarrinhoItem } from "../models/CarrinhoItem";
import { buscarProdutoPorId } from "../services/ProdutoService";

interface CarrinhoContextProps {
  itens: CarrinhoItem[];
  adicionar: (produtoId: number) => void;
  remover: (id: number) => void;
  alterarQuantidade: (id: number, quantidade: number) => void;
  limpar: () => void;
  carregando: boolean;
}

export const CarrinhoContext = createContext<CarrinhoContextProps>({
  itens: [],
  adicionar: () => {},
  remover: () => {},
  alterarQuantidade: () => {},
  limpar: () => {},
  carregando: false,
});

export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [itens, setItens] = useState<CarrinhoItem[]>([]);
  const [carregando, setCarregando] = useState(false);

  useEffect(() => {
    const carrinhoSalvo = localStorage.getItem("carrinho");
    if (carrinhoSalvo) {
      try {
        const parsedItens = JSON.parse(carrinhoSalvo);
        setItens(parsedItens);
      } catch (error) {
        console.error("Erro ao carregar carrinho do localStorage:", error);
        localStorage.removeItem("carrinho");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(itens));
  }, [itens]);

  async function adicionar(produtoId: number) {
    setCarregando(true);
    try {
      const existe = itens.find((i) => i.produto.id === produtoId);

      if (existe) {
        setItens((prev) =>
          prev.map((i) =>
            i.produto.id === produtoId
              ? { ...i, quantidade: i.quantidade + 1 }
              : i
          )
        );
      } else {
        const produto = await buscarProdutoPorId(produtoId);
        const novoItem: CarrinhoItem = {
          produto: {
            id: produto.id,
            item: produto.item,
            valor: produto.valor,
            calorias: produto.calorias,
            objetivo: produto.objetivo,
            categoria: produto.categoria || null,
            nome: "",
            preco: 0,
            descricao: ""
          },
          quantidade: 1,
        };
        setItens((prev) => [...prev, novoItem]);
      }
    } catch (error) {
      console.error("Erro ao adicionar produto ao carrinho:", error);
    } finally {
      setCarregando(false);
    }
  }

  function remover(id: number) {
    setItens((prev) => prev.filter((i) => i.produto.id !== id));
  }

  function alterarQuantidade(id: number, quantidade: number) {
    if (quantidade <= 0) {
      remover(id);
      return;
    }
    setItens((prev) =>
      prev.map((i) =>
        i.produto.id === id ? { ...i, quantidade: quantidade } : i
      )
    );
  }

  function limpar() {
    setItens([]);
  }

  return (
    <CarrinhoContext.Provider
      value={{
        itens,
        adicionar,
        remover,
        alterarQuantidade,
        limpar,
        carregando,
      }}
    >
      {children}
    </CarrinhoContext.Provider>
  );
}
