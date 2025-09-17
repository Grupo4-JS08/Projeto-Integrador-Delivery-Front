
/* eslint-disable */

import { FaSearch, FaShoppingCart } from "react-icons/fa";
import FooterInfo from "../../componets/footerinfo/FooterInfo";
import { useEffect, useState } from "react";
import type Produto from "../../models/Produto";
import type Categoria from "../../models/Categoria";
import { buscarCategorias } from "../categorias/services/CategoriaService";
import { buscarProdutos } from "../produtos/services/ProdutoService";
import Avaliacoes from "../../componets/avaliacoes/Avaliacoes";


function Home() {
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
          buscarProdutos()
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
      const filtrados = produtos.filter(produto =>
        produto.categoria?.nome.toLowerCase() === categoriaSelecionada.toLowerCase()
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
          <span className={`text-xs ${produto.objetivo === 'emagrecer' ? 'text-green-600' :
            produto.objetivo === 'hipertrofia' ? 'text-blue-600' : 'text-gray-600'
            }`}>
            {produto.objetivo}
          </span>
        </div>
        <div className="relative">
          <img
            src={produto.categoria?.foto || "/lanche01.jpg"} // ← CORRIGIDO: foto é opcional
            alt={produto.item}
            className="w-30 h-35 object-cover rounded"
          />
          <FaShoppingCart className="absolute bottom-2 right-2 text-[#FF9800] text-xl" />
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
    return produtos.filter(produto =>
      produto.categoria?.nome.toLowerCase() === nomeCategoria.toLowerCase()
    );
  };

  return (
    <>


      <div className="w-full">
        {/* BANNER */}
        <section className="container mx-auto mt-6">
          <div className="relative overflow-hidden rounded-xl shadow-md text-white">

            {/* imagem de fundo */}
            <img
              src="https://i.pinimg.com/1200x/4c/d8/c4/4cd8c4493efc8e4d6bc9992a25521d85.jpg"
              alt="Fundo"
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* tinta verde por cima da imagem */}
            <div className="absolute inset-0 bg-[#7E8C54]/60" />

            {/* gradiente escuro da esquerda p/ direita p/ dar contraste ao título */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/20 to-transparent" />

            {/* conteúdo */}
            <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-6 p-6">
              {/* texto */}
              <div>
                <h2 className="
          text-4xl md:text-5xl font-extrabold text-orange-500 leading-tight
          drop-shadow-[0_3px_10px_rgba(0,0,0,0.65)]
        ">
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

              {/* imagem do prato (opcional) */}
              <img
                src="https://i.pinimg.com/1200x/4c/d8/c4/4cd8c4493efc8e4d6bc9992a25521d85.jpg"
                alt="Prato"
                className="w-[420px] h-[210px] object-cover rounded-lg"
              />
            </div>
          </div>
        </section>
      </div>


      {/* SEÇÃO CARDS DE PROMOÇÕES */}
      <section className="container mx-auto mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Card 1 */}
        <a href="/promocoes" className="relative rounded-xl overflow-hidden shadow hover:scale-105 transition block">
          <img
            src="/saudavel02.jpg"
            alt="Mais promoções"
            className="w-full h-56 object-cover"
          />
          {/* gradient escuro no fundo */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          {/* caixinha opaca atrás do texto */}
          <div className="absolute bottom-3 left-3 right-3">
            <div className="inline-block bg-black/60 backdrop-blur-[2px] rounded-lg px-3 py-2 text-white">
              <span className="block text-xs">Aproveite nossas promoções parceiras</span>
              <h3 className="mt-0.5 font-bold text-lg leading-tight">Mais promoções</h3>
            </div>
          </div>
          <span className="absolute top-2 right-2 bg-[#7E8C54] text-white text-xs px-2 py-1 rounded">-20%</span>
        </a>

        {/* Card 2 */}
        <a href="/vegan" className="relative rounded-xl overflow-hidden shadow hover:scale-105 transition block">
          <img
            src="/lanche01.jpg"
            alt="Comidas veganas"
            className="w-full h-56 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3">
            <div className="inline-block bg-black/60 backdrop-blur-[2px] rounded-lg px-3 py-2 text-white">
              <span className="block text-xs">Aqui você encontra</span>
              <h3 className="mt-0.5 font-bold text-lg leading-tight">Comidas veganas</h3>
            </div>
          </div>
          <span className="absolute top-2 right-2 bg-[#7E8C54] text-white text-xs px-2 py-1 rounded">-30%</span>
        </a>

        {/* Card 3 */}
        <a href="/detox" className="relative rounded-xl overflow-hidden shadow hover:scale-105 transition block">
          <img
            src="https://i.pinimg.com/736x/1e/3b/42/1e3b4299531ae69bf823a58d850038d7.jpg"
            alt="Linha Detox"
            className="w-full h-56 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-3 left-3 right-3">
            <div className="inline-block bg-black/60 backdrop-blur-[2px] rounded-lg px-3 py-2 text-white">
              <span className="block text-xs">Sempre o melhor para você</span>
              <h3 className="mt-0.5 font-bold text-lg leading-tight">Conheça nossa linha Detox</h3>
            </div>
          </div>
          <span className="absolute top-2 right-2 bg-[#7E8C54] text-white text-xs px-2 py-1 rounded">-10%</span>
        </a>
      </section>



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
        const produtosCategoria = getProdutosPorCategoria(categoria.nome).slice(0, 4);

        if (produtosCategoria.length === 0) return null;

        return (
          <section key={categoria.id} className="container mx-auto mt-12">
            <h2 className="text-2xl font-bold text-orange-500 mb-6">{categoria.nome}</h2>
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
      <Avaliacoes />
    </>
  );
}

export default Home;
