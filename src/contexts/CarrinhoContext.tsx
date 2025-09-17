// contexts/CarrinhoContext.tsx
/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, type ReactNode, useEffect } from "react";
import type { CarrinhoItem } from "../models/CarrinhoItem";
import { buscarProdutoPorId } from "../pages/produtos/services/ProdutoService";

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

  // Carregar carrinho do localStorage ao inicializar
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

  // Salvar carrinho no localStorage sempre que mudar
  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(itens));
  }, [itens]);

  async function adicionar(produtoId: number) {
    setCarregando(true);
    try {
      // Verificar se o produto já está no carrinho
      const existe = itens.find((i) => i.produto.id === produtoId);

      if (existe) {
        // Se já existe, apenas aumenta a quantidade
        setItens((prev) =>
          prev.map((i) =>
            i.produto.id === produtoId
              ? { ...i, quantidade: i.quantidade + 1 }
              : i
          )
        );
      } else {
        // Se não existe, busca o produto do backend
        const produto = await buscarProdutoPorId(produtoId);
        // Garante que o produto tem todas as propriedades necessárias
        const novoItem: CarrinhoItem = {
          produto: {
            id: produto.id,
            nome: produto.nome || produto.item, // Adicione nome
            item: produto.item,
            valor: produto.valor,
            preco: produto.valor, // Se preco for diferente de valor, ajuste
            descricao: produto.descricao || "", // Adicione descrição
            calorias: produto.calorias,
            objetivo: produto.objetivo,
            categoria: produto.categoria || null,
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
