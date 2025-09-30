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

const ProductCard = ({
  produto,
  adicionar,
}: {
  produto: Produto;
  adicionar: (id: number) => void;
}) => (
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
          onClick={() => adicionar(produto.id)}
          className="mt-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm hover:bg-orange-600 transition w-fit cursor-pointer"
        >
          <FaShoppingCart className="inline mr-1" /> Adicionar
        </button>
      </div>
      <div className="relative ml-4 flex items-center">
        <img
          src={produto.categoria?.foto || "/lanche01.jpg"}
          alt={produto.item}
          className="w-28 h-28 object-cover rounded"
        />
      </div>
    </div>
  </div>
);

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
}: {
  produtos: Produto[];
  objetivo: string;
  adicionar: (id: number) => void;
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

  const getProdutosPorCategoria = (nomeCategoria: string) => {
    return produtos.filter(
      (produto) =>
        produto.categoria?.nome.toLowerCase() === nomeCategoria.toLowerCase()
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
      <div className="mt-2">
        <div className="relative flex items-stretch container mx-auto rounded-lg">
          <div className="flex items-center justify-between flex-1 px-8 gap-6">
            <NavBarSearch onSearchResults={handleSearchResults} />
          </div>
        </div>
      </div>

      {searchObjective && (
        <SearchResults
          produtos={searchResults}
          objetivo={searchObjective}
          adicionar={adicionar}
        />
      )}

      {!searchObjective && (
        <>
          <div className="w-full">
            <section className="container mx-auto mt-6">
              <div className="relative overflow-hidden rounded-xl shadow-md text-white">
                <img
                  src="https://i.pinimg.com/1200x/4c/d8/c4/4cd8c4493efc8e4d6bc9992a25521d85.jpg"
                  alt="Fundo"
                  className="absolute inset-0 w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-[#7E8C54]/60" />
                <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />
                <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 p-6">
                  <div>
                    <h2 className="text-4xl md:text-5xl font-extrabold text-orange-500 leading-tight drop-shadow-[0_3px_10px_rgba(0,0,0,0.65)]">
                      Mais pedido
                    </h2>
                    <div className="mt-4 flex flex-wrap gap-3">
                      <button className="px-4 py-2 bg-white text-gray-900 rounded-full text-sm shadow hover:opacity-90">
                        Receba nossas novidades
                      </button>
                      <button className="px-4 py-2 bg-white text-gray-900 rounded-full text-sm shadow hover:opacity-90">
                        Delivery em 20-25 min
                      </button>
                    </div>
                  </div>
                  <img
                    src="https://i.pinimg.com/1200x/4c/d8/c4/4cd8c4493efc8e4d6bc9992a25521d85.jpg"
                    alt="Prato"
                    className="w-[420px] h-[210px] object-cover rounded-lg"
                  />
                </div>
              </div>
            </section>
          </div>

          <section className="container mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              {
                href: "/promocoes",
                img: "/saudavel02.jpg",
                title: "Mais promoções",
                discount: "-20%",
              },
              {
                href: "/vegan",
                img: "/lanche01.jpg",
                title: "Comidas veganas",
                discount: "-30%",
              },
              {
                href: "/detox",
                img: "https://i.pinimg.com/736x/1e/3b/42/1e3b4299531ae69bf823a58d850038d7.jpg",
                title: "Linha Detox",
                discount: "-10%",
              },
            ].map((card, index) => (
              <a
                key={index}
                href={card.href}
                className="relative rounded-xl overflow-hidden shadow hover:scale-105 transition block"
              >
                <img
                  src={card.img}
                  alt={card.title}
                  className="w-full h-56 object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                <div className="absolute bottom-3 left-3 right-3">
                  <div className="inline-block bg-black/60 backdrop-blur-[2px] rounded-lg px-3 py-2 text-white">
                    <span className="block text-xs">
                      {index === 0
                        ? "Aproveite nossas promoções parceiras"
                        : index === 1
                          ? "Aqui você encontra"
                          : "Sempre o melhor para você"}
                    </span>
                    <h3 className="mt-0.5 font-bold text-lg leading-tight">
                      {card.title}
                    </h3>
                  </div>
                </div>
                <span className="absolute top-2 right-2 bg-[#7E8C54] text-white text-xs px-2 py-1 rounded">
                  {card.discount}
                </span>
              </a>
            ))}
          </section>

          <section className="container mx-auto mt-12">
            <h2 className="text-2xl font-bold text-orange-500 mb-4">
              Categorias
            </h2>
            <div className="flex flex-wrap gap-2 mb-6">
              <button
                onClick={() => setCategoriaSelecionada("")}
                className={`px-4 py-2 rounded-full text-sm ${
                  categoriaSelecionada === ""
                    ? "bg-orange-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                Todos
              </button>
              {categorias.map((categoria) => (
                <button
                  key={categoria.id}
                  onClick={() => setCategoriaSelecionada(categoria.nome)}
                  className={`px-4 py-2 rounded-full text-sm cursor-pointer ${
                    categoriaSelecionada === categoria.nome
                      ? "bg-orange-500 text-white"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {categoria.nome}
                </button>
              ))}
            </div>
          </section>

          <section className="container mx-auto mt-6">
            <h2 className="text-2xl font-bold text-orange-500 mb-6">
              {categoriaSelecionada
                ? categoriaSelecionada
                : "Todos os Produtos"}
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
                  />
                ))}
              </div>
            )}
          </section>

          {categorias.map((categoria) => {
            const produtosCategoria = getProdutosPorCategoria(
              categoria.nome
            ).slice(0, 4);
            if (produtosCategoria.length === 0) return null;

            return (
              <section key={categoria.id} className="container mx-auto mt-12">
                <h2 className="text-2xl font-bold text-orange-500 mb-6">
                  {categoria.nome}
                </h2>
                <p className="text-gray-600 mb-4">{categoria.descricao}</p>
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {produtosCategoria.map((produto) => (
                    <ProductCard
                      key={produto.id}
                      produto={produto}
                      adicionar={adicionar}
                    />
                  ))}
                </div>
              </section>
            );
          })}
        </>
      )}

      <FooterInfo />
      <Avaliacoes />
    </>
  );
}

export default Home;
