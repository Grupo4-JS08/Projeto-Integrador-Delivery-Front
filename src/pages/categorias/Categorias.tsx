import { useEffect, useState } from "react";
import { buscar } from "../../services/Service";
import type Categoria from "../../models/Categorias";

function Categorias() {
  const [categorias, setCategorias] = useState<Categoria[]>([]);

  async function listarCategorias() {
    try {
      await buscar("/categorias", setCategorias);
    } catch (error) {
      console.error("Erro ao listar categorias:", error);
    }
  }

  useEffect(() => {
    listarCategorias();
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold text-[#7E8C54] mb-8">Categorias</h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {categorias.map((categoria) => (
          <div
            key={categoria.id}
            className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
          >
            <div className="p-6">
              <h3 className="font-bold text-xl text-gray-800 mb-2">
                {categoria.nome}
              </h3>
              <p className="text-gray-600">{categoria.descricao}</p>
              <button className="mt-4 px-4 py-2 bg-[#7E8C54] text-white rounded-full hover:bg-[#606f3d] transition">
                Ver Produtos
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categorias;
