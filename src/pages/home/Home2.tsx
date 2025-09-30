/* eslint-disable @typescript-eslint/no-unused-vars */
import { FaTrash, FaEdit, FaPlus, FaTag } from "react-icons/fa";
import FooterInfo from "../../componets/footerinfo/FooterInfo";
import { useEffect, useState } from "react";
import type Produto from "../../models/Produto";
import type Categoria from "../../models/Categoria";
import {
  buscarCategorias,
  criarCategoria,
  atualizarCategoria,
  deletarCategoria,
} from "../../services/CategoriaService";
import {
  buscarProdutos,
  deletarProduto,
  atualizarProduto,
  criarProduto,
} from "../../services/ProdutoService";
import NavBar from "../../componets/navbar/NavBar";

function Home2() {
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState("");
  const [produtosFiltrados, setProdutosFiltrados] = useState<Produto[]>([]);
  const [loading, setLoading] = useState(true);

  const [produtoEditando, setProdutoEditando] = useState<Produto | null>(null);
  const [novoProduto, setNovoProduto] = useState({
    item: "",
    valor: 0,
    calorias: 0,
    objetivo: "geral" as "geral" | "emagrecer" | "hipertrofia",
    categoria: null as Categoria | null,
  });

  const [categoriaEditando, setCategoriaEditando] = useState<Categoria | null>(
    null
  );
  const [novaCategoria, setNovaCategoria] = useState({
    nome: "",
    descricao: "",
  });

  const [mostrarModalProduto, setMostrarModalProduto] = useState(false);
  const [mostrarModalCategoria, setMostrarModalCategoria] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [produtoParaExcluir, setProdutoParaExcluir] = useState<Produto | null>(
    null
  );
  const [categoriaParaExcluir, setCategoriaParaExcluir] =
    useState<Categoria | null>(null);

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

  const handleEditarProduto = (produto: Produto) => {
    setProdutoEditando(produto);
    setModoEdicao(true);
    setMostrarModalProduto(true);
  };

  const handleExcluirProdutoClick = (produto: Produto) => {
    setProdutoParaExcluir(produto);
  };

  const handleConfirmarExclusaoProduto = async () => {
    if (produtoParaExcluir) {
      try {
        await deletarProduto(produtoParaExcluir.id);
        setProdutos(produtos.filter((p) => p.id !== produtoParaExcluir.id));
        setProdutosFiltrados(
          produtosFiltrados.filter((p) => p.id !== produtoParaExcluir.id)
        );
        alert("Produto excluído com sucesso!");
      } catch (error) {
        console.error("Erro ao excluir produto:", error);
        alert("Erro ao excluir produto");
      } finally {
        setProdutoParaExcluir(null);
      }
    }
  };

  const handleSalvarProduto = async () => {
    try {
      if (modoEdicao && produtoEditando) {
        const produtoAtualizado = await atualizarProduto(produtoEditando);
        setProdutos(
          produtos.map((p) =>
            p.id === produtoAtualizado.id ? produtoAtualizado : p
          )
        );
        setProdutosFiltrados(
          produtosFiltrados.map((p) =>
            p.id === produtoAtualizado.id ? produtoAtualizado : p
          )
        );
        alert("Produto atualizado com sucesso!");
      } else {
        const produtoCriado = await criarProduto(novoProduto);
        setProdutos([...produtos, produtoCriado]);
        setProdutosFiltrados([...produtosFiltrados, produtoCriado]);
        alert("Produto criado com sucesso!");
      }
      setMostrarModalProduto(false);
      setProdutoEditando(null);
    } catch (error) {
      console.error("Erro ao salvar produto:", error);
      alert("Erro ao salvar produto");
    }
  };

  const handleEditarCategoria = (categoria: Categoria) => {
    setCategoriaEditando(categoria);
    setModoEdicao(true);
    setMostrarModalCategoria(true);
  };

  const handleExcluirCategoriaClick = (categoria: Categoria) => {
    setCategoriaParaExcluir(categoria);
  };

  const handleConfirmarExclusaoCategoria = async () => {
    if (categoriaParaExcluir) {
      try {
        await deletarCategoria(categoriaParaExcluir.id);
        setCategorias(
          categorias.filter((c) => c.id !== categoriaParaExcluir.id)
        );
        alert("Categoria excluída com sucesso!");
      } catch (error) {
        console.error("Erro ao excluir categoria:", error);
        alert("Erro ao excluir categoria");
      } finally {
        setCategoriaParaExcluir(null);
      }
    }
  };

  const handleSalvarCategoria = async () => {
    try {
      if (modoEdicao && categoriaEditando) {
        const categoriaAtualizada = await atualizarCategoria(categoriaEditando);
        setCategorias(
          categorias.map((c) =>
            c.id === categoriaAtualizada.id ? categoriaAtualizada : c
          )
        );
        alert("Categoria atualizada com sucesso!");
      } else {
        const categoriaCriada = await criarCategoria(novaCategoria);
        setCategorias([...categorias, categoriaCriada]);
        alert("Categoria criada com sucesso!");
      }
      setMostrarModalCategoria(false);
      setCategoriaEditando(null);
    } catch (error) {
      console.error("Erro ao salvar categoria:", error);
      alert("Erro ao salvar categoria");
    }
  };

  const handleNovaCategoria = () => {
    setNovaCategoria({ nome: "", descricao: "" });
    setModoEdicao(false);
    setMostrarModalCategoria(true);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  const ProductCard = ({ produto }: { produto: Produto }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:scale-105 transition cursor-pointer">
      <div className="flex justify-between p-4">
        <div className="w-1/2">
          <h3 className="font-bold text-lg">{produto.item}</h3>
          <div className="flex items-center mb-2">
            <br />
            <br />
            <button
              onClick={() =>
                produto.categoria && handleEditarCategoria(produto.categoria)
              }
              className="text-sm text-[#7E8C54] hover:text-[#6a7a48] flex items-center"
            >
              <FaTag className="mr-1" size={12} />
              {produto.categoria?.nome || "Sem categoria"}
            </button>
          </div>
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
                  : "text-gray-600"
            }`}
          >
            {produto.objetivo}
          </span>
        </div>
        <div className="relative w-1/2">
          <img
            src={produto.categoria?.foto || "/lanche01.jpg"}
            alt={produto.item}
            className="w-full h-auto object-cover rounded-3xl"
          />
          <div className="w-15 absolute bottom-0 flex align-middle justify-center right-0 p-2 shadow-md bg-white bg-opacity-90 rounded-br-lg rounded-tl-lg">
            <button
              onClick={() => handleEditarProduto(produto)}
              className="text-orange-500 hover:text-orange-700 transition"
            >
              <FaEdit />
            </button>
            <button
              onClick={() => handleExcluirProdutoClick(produto)}
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
      <NavBar />

      <div className="container mx-auto mt-8 flex justify-end space-x-4">
        <button
          onClick={() => {
            setNovoProduto({
              item: "",
              valor: 0,
              calorias: 0,
              objetivo: "geral",
              categoria: null,
            });
            setModoEdicao(false);
            setMostrarModalProduto(true);
          }}
          className="bg-[#7E8C54] text-white px-6 py-3 rounded-lg flex items-center hover:bg-[#6a7a48] transition"
        >
          <FaPlus className="mr-2" />
          Novo Produto
        </button>

        <button
          onClick={handleNovaCategoria}
          className="bg-[#FF9800] text-white px-6 py-3 rounded-lg flex items-center hover:bg-[#e28200] transition"
        >
          <FaTag className="mr-2" />
          Nova Categoria
        </button>
      </div>

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

      {mostrarModalProduto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96 max-h-96 overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {modoEdicao ? "Editar Produto" : "Novo Produto"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Nome do Item
                </label>
                <input
                  type="text"
                  value={
                    modoEdicao ? produtoEditando?.item || "" : novoProduto.item
                  }
                  onChange={(e) =>
                    modoEdicao
                      ? setProdutoEditando({
                          ...produtoEditando!,
                          item: e.target.value,
                        })
                      : setNovoProduto({ ...novoProduto, item: e.target.value })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Valor (R$)
                </label>
                <input
                  type="number"
                  step="0.01"
                  value={
                    modoEdicao ? produtoEditando?.valor || 0 : novoProduto.valor
                  }
                  onChange={(e) =>
                    modoEdicao
                      ? setProdutoEditando({
                          ...produtoEditando!,
                          valor: parseFloat(e.target.value),
                        })
                      : setNovoProduto({
                          ...novoProduto,
                          valor: parseFloat(e.target.value),
                        })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Calorias
                </label>
                <input
                  type="number"
                  value={
                    modoEdicao
                      ? produtoEditando?.calorias || 0
                      : novoProduto.calorias
                  }
                  onChange={(e) =>
                    modoEdicao
                      ? setProdutoEditando({
                          ...produtoEditando!,
                          calorias: parseInt(e.target.value),
                        })
                      : setNovoProduto({
                          ...novoProduto,
                          calorias: parseInt(e.target.value),
                        })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Objetivo
                </label>
                <select
                  value={
                    modoEdicao
                      ? produtoEditando?.objetivo || "geral"
                      : novoProduto.objetivo
                  }
                  onChange={(e) =>
                    modoEdicao
                      ? setProdutoEditando({
                          ...produtoEditando!,
                          objetivo: e.target.value as
                            | "emagrecer"
                            | "hipertrofia"
                            | "geral",
                        })
                      : setNovoProduto({
                          ...novoProduto,
                          objetivo: e.target.value as
                            | "emagrecer"
                            | "hipertrofia"
                            | "geral",
                        })
                  }
                  className="w-full p-2 border rounded"
                >
                  <option value="emagrecer">Emagrecer</option>
                  <option value="hipertrofia">Hipertrofia</option>
                  <option value="geral">Geral</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Categoria
                </label>
                <select
                  value={
                    modoEdicao
                      ? produtoEditando?.categoria?.id || ""
                      : novoProduto.categoria?.id || ""
                  }
                  onChange={(e) => {
                    const categoriaId = parseInt(e.target.value);
                    const categoria = categorias.find(
                      (c) => c.id === categoriaId
                    );
                    if (modoEdicao && categoria) {
                      setProdutoEditando({ ...produtoEditando!, categoria });
                    } else if (categoria) {
                      setNovoProduto({ ...novoProduto, categoria });
                    }
                  }}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Selecione uma categoria</option>
                  {categorias.map((categoria) => (
                    <option key={categoria.id} value={categoria.id}>
                      {categoria.nome}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setMostrarModalProduto(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancelar
              </button>
              <button
                onClick={handleSalvarProduto}
                className="px-4 py-2 bg-[#7E8C54] text-white rounded hover:bg-[#6a7a48]"
              >
                {modoEdicao ? "Atualizar" : "Criar"} Produto
              </button>
            </div>
          </div>
        </div>
      )}

      {mostrarModalCategoria && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">
              {modoEdicao ? "Editar Categoria" : "Nova Categoria"}
            </h2>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Nome da Categoria
                </label>
                <input
                  type="text"
                  value={
                    modoEdicao
                      ? categoriaEditando?.nome || ""
                      : novaCategoria.nome
                  }
                  onChange={(e) =>
                    modoEdicao
                      ? setCategoriaEditando({
                          ...categoriaEditando!,
                          nome: e.target.value,
                        })
                      : setNovaCategoria({
                          ...novaCategoria,
                          nome: e.target.value,
                        })
                  }
                  className="w-full p-2 border rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Descrição
                </label>
                <textarea
                  value={
                    modoEdicao
                      ? categoriaEditando?.descricao || ""
                      : novaCategoria.descricao
                  }
                  onChange={(e) =>
                    modoEdicao
                      ? setCategoriaEditando({
                          ...categoriaEditando!,
                          descricao: e.target.value,
                        })
                      : setNovaCategoria({
                          ...novaCategoria,
                          descricao: e.target.value,
                        })
                  }
                  className="w-full p-2 border rounded"
                  rows={3}
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setMostrarModalCategoria(false)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancelar
              </button>
              <button
                onClick={handleSalvarCategoria}
                className="px-4 py-2 bg-[#FF9800] text-white rounded hover:bg-[#e28200]"
              >
                {modoEdicao ? "Atualizar" : "Criar"} Categoria
              </button>
            </div>
          </div>
        </div>
      )}

      {produtoParaExcluir && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Confirmar Exclusão</h2>
            <p className="mb-4">
              Tem certeza que deseja excluir o produto "
              {produtoParaExcluir.item}"?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setProdutoParaExcluir(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmarExclusaoProduto}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Confirmar Exclusão
              </button>
            </div>
          </div>
        </div>
      )}

      {categoriaParaExcluir && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h2 className="text-xl font-bold mb-4">Confirmar Exclusão</h2>
            <p className="mb-4">
              Tem certeza que deseja excluir a categoria "
              {categoriaParaExcluir.nome}"?
            </p>
            <p className="text-sm text-red-500 mb-4">
              Atenção: Esta ação não pode ser desfeita e pode afetar produtos
              associados.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setCategoriaParaExcluir(null)}
                className="px-4 py-2 text-gray-600 hover:text-gray-800"
              >
                Cancelar
              </button>
              <button
                onClick={handleConfirmarExclusaoCategoria}
                className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Confirmar Exclusão
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
