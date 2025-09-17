/* eslint-disable @typescript-eslint/no-explicit-any */
// pages/admin/Admin.tsx
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';
import { buscar, cadastrar, atualizar, deletar } from '../../services/Service';
import { FaEdit, FaTrash, FaSignOutAlt } from 'react-icons/fa';
import type Produto from '../../models/Produto';
import type Categoria from '../../models/Categoria';


function Admin() {
  const { usuario, handleLogout } = useContext(AuthContext);
  const [produtos, setProdutos] = useState<Produto[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [abaAtiva, setAbaAtiva] = useState<'produtos' | 'categorias'>('produtos');

  // Estados para formulários
  const [editandoProduto, setEditandoProduto] = useState<Produto | null>(null);
  const [editandoCategoria, setEditandoCategoria] = useState<Categoria | null>(null);

  // Estados para novos itens
  const [novoProduto, setNovoProduto] = useState<Partial<Produto>>({
    item: '',
    valor: 0,
    calorias: 0,
    objetivo: 'geral',
    categoria: null
  });

  const [novaCategoria, setNovaCategoria] = useState<Partial<Categoria>>({
    nome: '',
    descricao: ''
  });

  // Verificar se usuário é admin
  useEffect(() => {
    if (!usuario.token || !usuario.isMasterAdmin) {
      // Redirecionar para home se não for admin
      window.location.href = '/home';
    }
  }, [usuario]);

  // Carregar dados
  useEffect(() => {
    if (usuario.token && usuario.isMasterAdmin) {
      carregarProdutos();
      carregarCategorias();
    }
  }, [usuario]);

  const carregarProdutos = async () => {
    try {
      await buscar('/produtos', setProdutos, {
        headers: { Authorization: `Bearer ${usuario.token}` }
      });
    } catch (error) {
      console.error('Erro ao carregar produtos:', error);
    }
  };

  const carregarCategorias = async () => {
    try {
      await buscar('/categorias', setCategorias, {
        headers: { Authorization: `Bearer ${usuario.token}` }
      });
    } catch (error) {
      console.error('Erro ao carregar categorias:', error);
    }
  };

  // Handlers para Produtos
  const handleCriarProduto = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await cadastrar('/produtos', novoProduto, setProdutos, {
        headers: { Authorization: `Bearer ${usuario.token}` }
      });
      setNovoProduto({
        item: '',
        valor: 0,
        calorias: 0,
        objetivo: 'geral',
        categoria: null
      });
    } catch (error) {
      console.error('Erro ao criar produto:', error);
    }
  };

  const handleEditarProduto = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editandoProduto) return;

    try {
      await atualizar('/produtos', editandoProduto, setProdutos, {
        headers: { Authorization: `Bearer ${usuario.token}` }
      });
      setEditandoProduto(null);
    } catch (error) {
      console.error('Erro ao editar produto:', error);
    }
  };

  const handleExcluirProduto = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja excluir este produto?')) return;

    try {
      await deletar(`/produtos/${id}`, {
        headers: { Authorization: `Bearer ${usuario.token}` }
      });
      carregarProdutos(); // Recarregar a lista
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
    }
  };

  // Handlers para Categorias
  const handleCriarCategoria = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await cadastrar('/categorias', novaCategoria, setCategorias, {
        headers: { Authorization: `Bearer ${usuario.token}` }
      });
      setNovaCategoria({
        nome: '',
        descricao: ''
      });
    } catch (error) {
      console.error('Erro ao criar categoria:', error);
    }
  };

  const handleEditarCategoria = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!editandoCategoria) return;

    try {
      await atualizar('/categorias', editandoCategoria, setCategorias, {
        headers: { Authorization: `Bearer ${usuario.token}` }
      });
      setEditandoCategoria(null);
    } catch (error) {
      console.error('Erro ao editar categoria:', error);
    }
  };

  const handleExcluirCategoria = async (id: number) => {
    if (!window.confirm('Tem certeza que deseja excluir esta categoria?')) return;

    try {
      await deletar(`/categorias/${id}`, {
        headers: { Authorization: `Bearer ${usuario.token}` }
      });
      carregarCategorias(); // Recarregar a lista
    } catch (error) {
      console.error('Erro ao excluir categoria:', error);
    }
  };

  if (!usuario.token || !usuario.isMasterAdmin) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-[#7E8C54]">Acesso Restrito</h2>
          <p className="mt-2">Você não tem permissão para acessar esta página.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 px-4">
      {/* Cabeçalho */}
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[#7E8C54]">Painel Administrativo</h1>
        <button
          onClick={handleLogout}
          className="flex items-center px-4 py-2 bg-[#FF9800] text-black rounded-full font-semibold hover:opacity-90 transition"
        >
          <FaSignOutAlt className="mr-2" />
          Sair
        </button>
      </div>

      {/* Abas */}
      <div className="flex border-b border-gray-200 mb-6">
        <button
          className={`px-6 py-3 font-semibold ${abaAtiva === 'produtos' ? 'text-[#7E8C54] border-b-2 border-[#7E8C54]' : 'text-gray-500'}`}
          onClick={() => setAbaAtiva('produtos')}
        >
          Produtos
        </button>
        <button
          className={`px-6 py-3 font-semibold ${abaAtiva === 'categorias' ? 'text-[#7E8C54] border-b-2 border-[#7E8C54]' : 'text-gray-500'}`}
          onClick={() => setAbaAtiva('categorias')}
        >
          Categorias
        </button>
      </div>

      {/* Conteúdo da Aba de Produtos */}
      {abaAtiva === 'produtos' && (
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">
              {editandoProduto ? 'Editar Produto' : 'Adicionar Novo Produto'}
            </h2>
            <form onSubmit={editandoProduto ? handleEditarProduto : handleCriarProduto}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nome do Item</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#7E8C54]"
                    value={editandoProduto ? editandoProduto.item : novoProduto.item || ''}
                    onChange={(e) =>
                      editandoProduto
                        ? setEditandoProduto({...editandoProduto, item: e.target.value})
                        : setNovoProduto({...novoProduto, item: e.target.value})
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Valor (R$)</label>
                  <input
                    type="number"
                    step="0.01"
                    className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#7E8C54]"
                    value={editandoProduto ? editandoProduto.valor : novoProduto.valor || 0}
                    onChange={(e) =>
                      editandoProduto
                        ? setEditandoProduto({...editandoProduto, valor: parseFloat(e.target.value)})
                        : setNovoProduto({...novoProduto, valor: parseFloat(e.target.value)})
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Calorias</label>
                  <input
                    type="number"
                    className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#7E8C54]"
                    value={editandoProduto ? editandoProduto.calorias : novoProduto.calorias || 0}
                    onChange={(e) =>
                      editandoProduto
                        ? setEditandoProduto({...editandoProduto, calorias: parseInt(e.target.value)})
                        : setNovoProduto({...novoProduto, calorias: parseInt(e.target.value)})
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Objetivo</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#7E8C54]"
                    value={editandoProduto ? editandoProduto.objetivo : novoProduto.objetivo || 'geral'}
                    onChange={(e) =>
                      editandoProduto
                        ? setEditandoProduto({...editandoProduto, objetivo: e.target.value as any})
                        : setNovoProduto({...novoProduto, objetivo: e.target.value as any})
                    }
                    required
                  >
                    <option value="emagrecer">Emagrecer</option>
                    <option value="hipertrofia">Hipertrofia</option>
                    <option value="geral">Geral</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Categoria</label>
                  <select
                    className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#7E8C54]"
                    value={editandoProduto?.categoria?.id || ''}
                    onChange={(e) => {
                      const categoriaId = parseInt(e.target.value);
                      const categoria = categorias.find(c => c.id === categoriaId) || null;

                      if (editandoProduto) {
                        setEditandoProduto({...editandoProduto, categoria});
                      } else {
                        setNovoProduto({...novoProduto, categoria});
                      }
                    }}
                    required
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
              <div className="flex justify-end space-x-2">
                {editandoProduto && (
                  <button
                    type="button"
                    onClick={() => setEditandoProduto(null)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-400 transition"
                  >
                    Cancelar
                  </button>
                )}
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#7E8C54] text-white rounded-full font-semibold hover:bg-[#606f3d] transition"
                >
                  {editandoProduto ? 'Atualizar' : 'Adicionar'} Produto
                </button>
              </div>
            </form>
          </div>

          {/* Lista de Produtos */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Lista de Produtos</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-2 text-left">Nome</th>
                    <th className="py-2 text-left">Valor</th>
                    <th className="py-2 text-left">Calorias</th>
                    <th className="py-2 text-left">Objetivo</th>
                    <th className="py-2 text-left">Categoria</th>
                    <th className="py-2 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {produtos.map(produto => (
                    <tr key={produto.id} className="border-b border-gray-200">
                      <td className="py-3">{produto.item}</td>
                      <td className="py-3">R$ {produto.valor.toFixed(2)}</td>
                      <td className="py-3">{produto.calorias}kcal</td>
                      <td className="py-3 capitalize">{produto.objetivo}</td>
                      <td className="py-3">{produto.categoria?.nome || 'N/A'}</td>
                      <td className="py-3 text-right">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => setEditandoProduto(produto)}
                            className="p-2 text-[#7E8C54] hover:bg-[#7E8C54] hover:text-white rounded-full transition"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleExcluirProduto(produto.id)}
                            className="p-2 text-red-500 hover:bg-red-500 hover:text-white rounded-full transition"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Conteúdo da Aba de Categorias */}
      {abaAtiva === 'categorias' && (
        <div>
          <div className="bg-white rounded-lg shadow-md p-6 mb-6">
            <h2 className="text-xl font-bold mb-4">
              {editandoCategoria ? 'Editar Categoria' : 'Adicionar Nova Categoria'}
            </h2>
            <form onSubmit={editandoCategoria ? handleEditarCategoria : handleCriarCategoria}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                <div>
                  <label className="block text-sm font-medium mb-1">Nome da Categoria</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#7E8C54]"
                    value={editandoCategoria ? editandoCategoria.nome : novaCategoria.nome || ''}
                    onChange={(e) =>
                      editandoCategoria
                        ? setEditandoCategoria({...editandoCategoria, nome: e.target.value})
                        : setNovaCategoria({...novaCategoria, nome: e.target.value})
                    }
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">Descrição</label>
                  <input
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-[#7E8C54]"
                    value={editandoCategoria ? editandoCategoria.descricao : novaCategoria.descricao || ''}
                    onChange={(e) =>
                      editandoCategoria
                        ? setEditandoCategoria({...editandoCategoria, descricao: e.target.value})
                        : setNovaCategoria({...novaCategoria, descricao: e.target.value})
                    }
                    required
                  />
                </div>
              </div>
              <div className="flex justify-end space-x-2">
                {editandoCategoria && (
                  <button
                    type="button"
                    onClick={() => setEditandoCategoria(null)}
                    className="px-4 py-2 bg-gray-300 text-gray-700 rounded-full font-semibold hover:bg-gray-400 transition"
                  >
                    Cancelar
                  </button>
                )}
                <button
                  type="submit"
                  className="px-4 py-2 bg-[#7E8C54] text-white rounded-full font-semibold hover:bg-[#606f3d] transition"
                >
                  {editandoCategoria ? 'Atualizar' : 'Adicionar'} Categoria
                </button>
              </div>
            </form>
          </div>

          {/* Lista de Categorias */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Lista de Categorias</h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="py-2 text-left">Nome</th>
                    <th className="py-2 text-left">Descrição</th>
                    <th className="py-2 text-right">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {categorias.map(categoria => (
                    <tr key={categoria.id} className="border-b border-gray-200">
                      <td className="py-3 font-semibold">{categoria.nome}</td>
                      <td className="py-3">{categoria.descricao}</td>
                      <td className="py-3 text-right">
                        <div className="flex justify-end space-x-2">
                          <button
                            onClick={() => setEditandoCategoria(categoria)}
                            className="p-2 text-[#7E8C54] hover:bg-[#7E8C54] hover:text-white rounded-full transition"
                          >
                            <FaEdit />
                          </button>
                          <button
                            onClick={() => handleExcluirCategoria(categoria.id)}
                            className="p-2 text-red-500 hover:bg-red-500 hover:text-white rounded-full transition"
                          >
                            <FaTrash />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admin;
