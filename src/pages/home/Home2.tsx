/* eslint-disable  */
import { FaTrash, FaEdit, FaPlus } from "react-icons/fa";
import FooterInfo from "../../componets/footerinfo/FooterInfo";
import { useEffect, useState } from "react";
import type Produto from "../../models/Produto";
import type Categoria from "../../models/Categoria";
import { buscarCategorias } from "../categorias/services/CategoriaService";
import { buscarProdutos, deletarProduto, atualizarProduto, criarProduto } from "../produtos/services/ProdutoService";
import NavBar2 from "../../componets/navbar/NavBar2";

function Home2() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState<string>("");
  const [produtosFiltrados, setProdutosFiltrados] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);

  // Estados para modais
  const [produtoEditando, setProdutoEditando] = useState<Produto | null>(null);
  const [novoProduto, setNovoProduto] = useState<Partial<Produto>>({
    item: "",
    valor: 0,
    calorias: 0,
    objetivo: "geral",
    categoria: null,
  });
  const [mostrarModalEdicao, setMostrarModalEdicao] = useState(false);
  const [mostrarModalCriacao, setMostrarModalCriacao] = useState(false);
  const [produtoParaExcluir, setProdutoParaExcluir] = useState<Produto | null>(null);

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

  // Funções CRUD
  const handleEditar = (produto: Produto) => {
    setProdutoEditando(produto);
    setMostrarModalEdicao(true);
  };

  const handleExcluirClick = (produto: Produto) => {
    setProdutoParaExcluir(produto);
  };

  const handleConfirmarExclusao = async () => {
    if (produtoParaExcluir) {
      try {
        await deletarProduto(produtoParaExcluir.id);
        setProdutos(produtos.filter(p => p.id !== produtoParaExcluir.id));
        setProdutosFiltrados(produtosFiltrados.filter(p => p.id !== produtoParaExcluir.id));
        alert("Produto excluído com sucesso!");
      } catch (error) {
        console.error("Erro ao excluir produto:", error);
        alert("Erro ao excluir produto");
      } finally {
        setProdutoParaExcluir(null);
      }
    }
  };

  const handleSalvarEdicao = async () => {
    if (produtoEditando) {
      try {
        const produtoAtualizado = await atualizarProduto(produtoEditando);
        setProdutos(produtos.map(p => p.id === produtoAtualizado.id ? produtoAtualizado : p));
        setProdutosFiltrados(produtosFiltrados.map(p => p.id === produtoAtualizado.id ? produtoAtualizado : p));
        alert("Produto atualizado com sucesso!");
        setMostrarModalEdicao(false);
      } catch (error) {
        console.error("Erro ao atualizar produto:", error);
        alert("Erro ao atualizar produto");
      }
    }
  };

  const handleCriarProduto = async () => {
    try {
      const produtoCriado = await criarProduto(novoProduto);
      setProdutos([...produtos, produtoCriado]);
      setProdutosFiltrados([...produtosFiltrados, produtoCriado]);
      alert("Produto criado com sucesso!");
      setMostrarModalCriacao(false);
      setNovoProduto({
        item: "",
        valor: 0,
        calorias: 0,
        objetivo: "geral",
        categoria: null,
      });
    } catch (error) {
      console.error("Erro ao criar produto:", error);
      alert("Erro ao criar produto");
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  // Componente de Card
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
          <span className={`text-xs ${
            produto.objetivo === "emagrecer" ? "text-green-600" :
            produto.objetivo === "hipertrofia" ? "text-blue-600" : "text-gray-600"
          }`}>
            {produto.objetivo}
          </span>
        </div>
        <div className="relative">
          <img
            src={produto.categoria?.foto || "/lanche01.jpg"}
            alt={produto.item}
            className="w-40 h-35 object-cover rounded-3xl"
          />
          <div className="w-15 absolute bottom-0 flex align-middle justify-center right-0 p-2 shadow-md bg-white bg-opacity-90 rounded-br-lg rounded-tl-lg">
            <button
              onClick={() => handleEditar(produto)}
              className="text-orange-500 hover:text-orange-700 transition"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => handleExcluirClick(produto)}
              className="ml-2 text-orange-500 hover:text-orange-700 transition"
            >
              <FaTrash />
            </button>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <>
      <NavBar2 />

      {/* Botão para adicionar novo produto */}
      <div className="container mx-auto mt-8 flex justify-end">
        <button
          onClick={() => setMostrarModalCriacao(true)}
          className="bg-[#7E8C54] text-white px-6 py-3 rounded-lg flex items-center hover:bg-[#6a7a48] transition"
        >
          <FaPlus className="mr-2" />
          Novo Produto
        </button>
      </div>

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

      {/* Modal de Edição */}
      {mostrarModalEdicao && produtoEditando && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Editar Produto</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nome do Item</label>
                <input
                  type="text"
                  value={produtoEditando.item}
                  onChange={(e) => setProdutoEditando({...produtoEditando, item: e.target.value})}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Valor (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  value={produtoEditando.valor}
                  onChange={(e) => setProdutoEditando({...produtoEditando, valor: parseFloat(e.target.value)})}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Calorias</label>
                <input
                  type="number"
                  value={produtoEditando.calorias}
                  onChange={(e) => setProdutoEditando({...produtoEditando, calorias: parseInt(e.target.value)})}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Objetivo</label>
                <select
                  value={produtoEditando.objetivo}
                  onChange={(e) => setProdutoEditando({...produtoEditando, objetivo: e.target.value as "emagrecer" | "hipertrofia" | "geral"})}
                  className="w-full p-2 border rounded"
                >
                  <option value="emagrecer">Emagrecer</option>
                  <option value="hipertrofia">Hipertrofia</option>
                  <option value="geral">Geral</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setMostrarModalEdicao(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancelar
              </button>
              <button
                onClick={handleSalvarEdicao}
                className="px-4 py-2 bg-[#7E8C54] text-white rounded hover:bg-[#6a7a48]"
              >
                Salvar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Confirmação de Exclusão */}
      {produtoParaExcluir && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Confirmar Exclusão</h2>
            <p className="mb-4">Tem certeza que deseja excluir o produto "{produtoParaExcluir.item}"?</p>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setProdutoParaExcluir(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmarExclusao}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Confirmar Exclusão
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Criação */}
      {mostrarModalCriacao && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Novo Produto</h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Nome do Item</label>
                <input
                  type="text"
                  value={novoProduto.item || ""}
                  onChange={(e) => setNovoProduto({...novoProduto, item: e.target.value})}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Valor (R$)</label>
                <input
                  type="number"
                  step="0.01"
                  value={novoProduto.valor || 0}
                  onChange={(e) => setNovoProduto({...novoProduto, valor: parseFloat(e.target.value)})}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Calorias</label>
                <input
                  type="number"
                  value={novoProduto.calorias || 0}
                  onChange={(e) => setNovoProduto({...novoProduto, calorias: parseInt(e.target.value)})}
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Objetivo</label>
                <select
                  value={novoProduto.objetivo || "geral"}
                  onChange={(e) => setNovoProduto({...novoProduto, objetivo: e.target.value as "emagrecer" | "hipertrofia" | "geral"})}
                  className="w-full p-2 border rounded"
                >
                  <option value="emagrecer">Emagrecer</option>
                  <option value="hipertrofia">Hipertrofia</option>
                  <option value="geral">Geral</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">Categoria</label>
                <select
                  value={novoProduto.categoria?.id || ""}
                  onChange={(e) => {
                    const categoriaId = parseInt(e.target.value);
                    const categoria = categorias.find(c => c.id === categoriaId);
                    if (categoria) {
                      setNovoProduto({...novoProduto, categoria});
                    }
                  }}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Selecione uma categoria</option>
                  {categorias.map(categoria => (
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setMostrarModalCriacao(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancelar
              </button>
              <button
                onClick={handleCriarProduto}
                className="px-4 py-2 bg-[#7E8C54] text-white rounded hover:bg-[#6a7a48]"
              >
                Criar Produto
              </button>
            </div>
          </div>
        </div>
      )}

      <FooterInfo />
    </>
  );
}

export default Home2;
