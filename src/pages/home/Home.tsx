/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { FaSearch, FaShoppingCart } from "react-icons/fa";
import FooterInfo from "../../componets/footerinfo/FooterInfo";
import type Produto from "../../models/Produto";
import type Categoria from "../../models/Categoria";
import { buscarCategorias } from "../../services/CategoriaService";
import {
  buscarProdutos,
  buscarProdutosPorObjetivo,
} from "../../services/ProdutoService";
import Avaliacoes from "../../componets/avaliacoes/Avaliacoes";
import { CarrinhoContext } from "../../contexts/CarrinhoContext";
import { AuthContext } from "../../contexts/AuthContext";

// Componente de produto com suporte à mensagem de sucesso
const ProductCard = ({
  produto,
  adicionar,
  mostrarMensagem,
  isAuthenticated,
  mostrarMensagemErro,
}: {
  produto: Produto;
  adicionar: (id: number) => void;
  mostrarMensagem: (msg: string) => void;
  isAuthenticated: boolean;
  mostrarMensagemErro: () => void;
}) => {
  const handleAddToCart = () => {
    if (!isAuthenticated) {
      mostrarMensagemErro();
      return;
    }

    adicionar(produto.id);
    mostrarMensagem("Produto adicionado ao carrinho!");
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition cursor-pointer">
      <div className="flex justify-between p-4 h-full">
        <div className="flex-1 flex flex-col justify-between">
          <div>
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
            <br />
            <span
              className={`text-xs ${
                produto.objetivo === "emagrecer"
                  ? "text-green-600"
                  : produto.objetivo === "hipertrofia"
                    ? "text-blue-600"
                    : "text-orange-600"
              }`}
            >
              {produto.objetivo}
            </span>
          </div>
          <button
            onClick={handleAddToCart}
            className="mt-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm hover:bg-orange-600 transition w-fit cursor-pointer"
          >
            <FaShoppingCart className="inline mr-1" /> Adicionar
          </button>
        </div>
        <div className="relative ml-4 flex items-center">
          <img
            src={produto.categoria?.foto || "/Sacola-entrega.png"}
            alt={produto.item}
            className="w-28 h-28 object-cover rounded"
          />
        </div>
      </div>
    </div>
  );
};

function NavBarSearch({
  onSearchResults,
}: {
  onSearchResults: (produtos: Produto[], objetivo: string) => void;
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const objetivos = [
    { value: "hipertrofia", label: "Hipertrofia" },
    { value: "emagrecer", label: "Emagrecer" },
    { value: "geral", label: "Geral" },
  ];

  async function handleObjetivoSearch(objetivo: string) {
    setIsLoading(true);
    setIsDropdownOpen(false);
    setSearchTerm(objetivo);

    try {
      const produtos = await buscarProdutosPorObjetivo(objetivo);
      onSearchResults(produtos, objetivo);
      document
        .getElementById("resultados-pesquisa")
        ?.scrollIntoView({ behavior: "smooth" });
    } catch (error) {
      console.error("Erro ao buscar produtos por objetivo:", error);
      onSearchResults([], objetivo);
    } finally {
      setIsLoading(false);
    }
  }

  const filteredObjetivos =
    searchTerm.trim() === ""
      ? objetivos
      : objetivos.filter((objetivo) =>
          objetivo.label.toLowerCase().includes(searchTerm.toLowerCase())
        );

  return (
    <div className="relative flex-1 max-w-xs overflow-visible">
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar por objetivo..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onFocus={() => setIsDropdownOpen(true)}
          onBlur={() => setTimeout(() => setIsDropdownOpen(false), 150)}
          className="w-full pl-10 pr-4 py-2 rounded-full bg-[#FFF5DC] text-black focus:outline-none focus:ring-2 focus:ring-[#FF9800]"
        />
        <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
        {isLoading && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-[#7E8C54]"></div>
          </div>
        )}
      </div>

      {isDropdownOpen && filteredObjetivos.length > 0 && (
        <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-lg shadow-lg z-50 border border-gray-200">
          {filteredObjetivos.map((objetivo) => (
            <button
              key={objetivo.value}
              onMouseDown={() => handleObjetivoSearch(objetivo.value)}
              className="w-full px-4 py-3 text-left hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg transition-colors duration-200"
            >
              <div className="font-semibold text-gray-800">
                {objetivo.label}
              </div>
              <div className="text-sm text-gray-500">
                Buscar produtos para {objetivo.label.toLowerCase()}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

function SearchResults({
  produtos,
  objetivo,
  adicionar,
  mostrarMensagem,
  isAuthenticated,
  mostrarMensagemErro,
}: {
  produtos: Produto[];
  objetivo: string;
  adicionar: (id: number) => void;
  mostrarMensagem: (msg: string) => void;
  isAuthenticated: boolean;
  mostrarMensagemErro: () => void;
}) {
  if (!objetivo) return null;

  return (
    <section id="resultados-pesquisa" className="container mx-auto mt-12">
      <h2 className="text-2xl font-bold text-orange-500 mb-6">
        Resultados para: {objetivo.charAt(0).toUpperCase() + objetivo.slice(1)}
      </h2>
      {produtos.length === 0 ? (
        <p className="text-center text-gray-500 py-8">
          Nenhum produto encontrado para este objetivo.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {produtos.map((produto) => (
            <ProductCard
              key={produto.id}
              produto={produto}
              adicionar={adicionar}
              mostrarMensagem={mostrarMensagem}
              isAuthenticated={isAuthenticated}
              mostrarMensagemErro={mostrarMensagemErro}
            />
          ))}
        </div>
      )}
    </section>
  );
}

function Home() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [produtosFiltrados, setProdutosFiltrados] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchResults, setSearchResults] = useState<Produto[]>([]);
  const [searchObjective, setSearchObjective] = useState("");
  const { adicionar } = useContext(CarrinhoContext);
  const [mensagemSucesso, setMensagemSucesso] = useState<string | null>(null);
  const { usuario } = useContext(AuthContext);
  const [mensagemErro, setMensagemErro] = useState<string | null>(null);

  // Função de mensagem temporária
  function mostrarMensagem(mensagem: string) {
    setMensagemSucesso(mensagem);
    setTimeout(() => setMensagemSucesso(null), 3000);
  }

  function mostrarMensagemErro(mensagem: string) {
    setMensagemErro(mensagem);
    setTimeout(() => setMensagemErro(null), 3000);
  }

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

  const handleSearchResults = (produtos: Produto[], objetivo: string) => {
    setSearchResults(produtos);
    setSearchObjective(objetivo);
    setCategoriaSelecionada("");
  };

  const isAuthenticated = !!usuario?.token;

  const handleUnauthorized = () => {
    mostrarMensagemErro(
      "Você precisa estar logado para adicionar produtos ao carrinho."
    );
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <>
      {/* Alerta de erro fixo no topo */}
      {mensagemErro && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg shadow-lg">
            <p className="text-sm text-red-600 font-medium text-center">
              {mensagemErro}
            </p>
          </div>
        </div>
      )}
      {mensagemSucesso && (
        <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg shadow-lg">
            <p className="text-sm text-green-600 font-medium text-center">
              {mensagemSucesso}
            </p>
          </div>
        </div>
      )}

      {/* Barra de pesquisa */}
      <div className="mt-2">
        <div className="relative flex items-stretch container mx-auto rounded-lg">
          <div className="flex items-center justify-between flex-1 px-8 gap-6">
            <NavBarSearch onSearchResults={handleSearchResults} />
          </div>
        </div>
      </div>

      {/* Resultados da pesquisa */}
      {searchObjective && (
        <SearchResults
          produtos={searchResults}
          objetivo={searchObjective}
          adicionar={adicionar}
          mostrarMensagem={mostrarMensagem}
          isAuthenticated={isAuthenticated}
          mostrarMensagemErro={handleUnauthorized}
        />
      )}

      {/* Produtos padrão */}
      {!searchObjective && (
        <section className="container mx-auto mt-6">
          <h2 className="text-2xl font-bold text-orange-500 mb-6">
            {categoriaSelecionada || "Todos os Produtos"}
          </h2>
          {produtosFiltrados.length === 0 ? (
            <p className="text-center text-gray-500">
              Nenhum produto encontrado
            </p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {produtosFiltrados.map((produto) => (
                <ProductCard
                  key={produto.id}
                  produto={produto}
                  adicionar={adicionar}
                  mostrarMensagem={mostrarMensagem}
                  isAuthenticated={isAuthenticated}
                  mostrarMensagemErro={handleUnauthorized}
                />
              ))}
            </div>
          )}
        </section>
      )}

      <FooterInfo />
      <Avaliacoes />
    </>
  );
}

export default Home;
