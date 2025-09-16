/* eslint-disable  */
import { FaTrash, FaEdit } from "react-icons/fa";

import FooterInfo from "../../componets/footerinfo/FooterInfo";
import { useEffect, useState } from "react";
import type Produto from "../../models/Produto";
import type Categoria from "../../models/Categoria";
import { buscarCategorias } from "../categorias/services/CategoriaService";
import { buscarProdutos } from "../produtos/services/ProdutoService";
import NavBar2 from "../../componets/navbar/NavBar2";

function Home2() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>("");
  const [produtosFiltrados, setProdutosFiltrados] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);

        const [categoriasData, produtosData] = await Promise.all([
          buscarCategorias(),
          buscarProdutos(),
        ]);

        setCategorias(categoriasData);
        setProdutos(produtosData);
        setProdutosFiltrados(produtosData);
      } catch (error) {
        console.error("Erro ao buscar dados:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    if (categoriaSelecionada === "") {
      setProdutosFiltrados(produtos);
    } else {
      const filtrados = produtos.filter(
        (produto) =>
          produto.categoria?.nome.toLowerCase() ===
          categoriaSelecionada.toLowerCase()
      );
      setProdutosFiltrados(filtrados);
    }
  }, [categoriaSelecionada, produtos]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  // Componente de card CORRIGIDO
  const ProductCard = ({ produto }: { produto: Produto }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition cursor-pointer">
      <div className="flex justify-between p-4">
        <div className="flex-1">
          <h3 className="font-bold text-lg">{produto.item}</h3>
          <p className="text-sm text-gray-600">
            {produto.categoria?.nome || "Sem categoria"}
          </p>
          <span className="font-bold text-gray-900 mt-2 block">
            R$ {produto.valor.toFixed(2)}
          </span>
          <span className="text-xs text-gray-500">
            {produto.calorias} calorias
          </span>
          <span
            className={`text-xs ${
              produto.objetivo === "emagrecer"
                ? "text-green-600"
                : produto.objetivo === "hipertrofia"
                  ? "text-blue-600"
                  : "text-gray-600"
            }`}
          >
            {produto.objetivo}
          </span>
        </div>
        <div className="relative ">
          <img
            src={produto.categoria?.foto || "/lanche01.jpg"} // ← CORRIGIDO: foto é opcional
            alt={produto.item}
            className="w-40  h-35 object-cover rounded-3xl"
          />
          <div className="w-15 absolute bottom-0 flex align-middle justify-center right-0 p-2 shadow-md bg-white rounded-br-lg rounded-tl-lg  ">
            {" "}
            <button className="text-orange-500 hover:text-orange-700">
              <FaTrash />
              {/* modal exclusão */}
              
            </button>
            <button className="ml-2 text-orange-500 hover:text-orange-700">
              {/* modal edição */}

              <FaEdit />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  // Componente de card grande CORRIGIDO
  const ProductCardLarge = ({ produto }: { produto: Produto }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition cursor-pointer">
      <img
        src={produto.categoria?.foto || "/saudavel02.jpg"} // ← CORRIGIDO
        alt={produto.item}
        className="w-full h-50 object-cover"
      />
      <div className="p-4">
        <h3 className="font-bold text-lg">{produto.item}</h3>
        <p className="text-sm text-gray-600">
          {produto.categoria?.descricao || "Descrição não disponível"}
        </p>
        <span className="font-bold text-gray-900 mt-2 block">
          R$ {produto.valor.toFixed(2)}
        </span>
      </div>
    </div>
  );

  // Filtra produtos por categoria específica (para as seções)
  const getProdutosPorCategoria = (nomeCategoria: string) => {
    return produtos.filter(
      (produto) =>
        produto.categoria?.nome.toLowerCase() === nomeCategoria.toLowerCase()
    );
  };

  return (
    <>
      <NavBar2 />

      {/* SEÇÃO PRINCIPAL DE PRODUTOS */}
      <section className="container mx-auto mt-12">
        <h2 className="text-2xl font-bold text-orange-500 mb-6">
          {categoriaSelecionada ? categoriaSelecionada : "Todos os Produtos"}
        </h2>

        {produtosFiltrados.length === 0 ? (
          <p className="text-center text-gray-500">Nenhum produto encontrado</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {produtosFiltrados.map((produto) => (
              <ProductCard key={produto.id} produto={produto} />
            ))}
          </div>
        )}
      </section>

      {/* SEÇÕES ESPECÍFICAS POR CATEGORIA */}
      {categorias.map((categoria) => {
        const produtosCategoria = getProdutosPorCategoria(categoria.nome).slice(
          0,
          4
        );

        if (produtosCategoria.length === 0) return null;

        return (
          <section key={categoria.id} className="container mx-auto mt-12">
            <h2 className="text-2xl font-bold text-orange-500 mb-6">
              {categoria.nome}
            </h2>
            <p className="text-gray-600 mb-4">{categoria.descricao}</p>

            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {produtosCategoria.map((produto) => (
                <ProductCard key={produto.id} produto={produto} />
              ))}
            </div>
          </section>
        );
      })}

      <FooterInfo />
    </>
  );
}

export default Home2;
