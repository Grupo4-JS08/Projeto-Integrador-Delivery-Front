import { useEffect, useState } from 'react';
import { buscar } from '../../services/Service';
import { FaShoppingCart } from 'react-icons/fa';
import type Produto from '../../models/Produtos';

function EditarProdutos() {
  const [produtos, setProdutos] = useState<Produto[]>([]);

  async function listarProdutos() {
    try {
      await buscar('/produtos', setProdutos);
    } catch (error) {
      console.error('Erro ao listar produtos:', error);
    }
  }

  useEffect(() => {
    listarProdutos();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-[#7E8C54] mb-8">Nossos Produtos</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {produtos.map((produto) => (
          <div key={produto.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
            <div className="p-4 flex justify-between items-start">
              <div className="flex-1">
                <h3 className="font-bold text-lg text-gray-800">{produto.item}</h3>
                <p className="text-sm text-gray-600 mt-1">Calorias: {produto.calorias}kcal</p>
                <p className="text-sm text-gray-600">Objetivo: {produto.objetivo}</p>
                <span className="font-bold text-[#7E8C54] mt-2 block">R$ {produto.valor}</span>
              </div>

              <div className="ml-4 flex flex-col items-end">
                <div className="w-20 h-20 bg-gray-200 rounded overflow-hidden">
                  <img
                    src="/lanche01.jpg"
                    alt={produto.item}
                    className="w-full h-full object-cover"
                  />
                </div>
                <button className="mt-2 p-2 bg-[#FF9800] rounded-full text-white hover:bg-[#F79009] transition">
                  <FaShoppingCart size={16} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EditarProdutos;
