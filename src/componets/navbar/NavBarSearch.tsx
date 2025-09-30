import { useState } from "react";
import { FaSearch } from "react-icons/fa";
import type Produto from "../../models/Produto";
import { buscarProdutosPorObjetivo } from "../../services/ProdutoService";

interface NavBarSearchProps {
  onSearchResults: (produtos: Produto[], objetivo: string) => void;
}

function NavBarSearch({ onSearchResults }: NavBarSearchProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const objetivos = [
    { value: "hipertrofia", label: "Hipertrofia" },
    { value: "emagrecer", label: "Emagrecer" },
    { value: "geral", label: "Geral" },
  ];

  const handleObjetivoSearch = async (objetivo: string) => {
    setIsLoading(true);
    setIsDropdownOpen(false);
    setSearchTerm(objetivo);

    try {
      const produtos = await buscarProdutosPorObjetivo(objetivo);
      onSearchResults(produtos, objetivo);
    } catch (error) {
      console.error("Erro ao buscar produtos por objetivo:", error);
      onSearchResults([], objetivo);
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setIsDropdownOpen(e.target.value.length > 0);
  };

  const filteredObjetivos = objetivos.filter((objetivo) =>
    objetivo.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="relative flex-1 max-w-xs">
      <div className="relative">
        <input
          type="text"
          placeholder="Buscar por objetivo..."
          value={searchTerm}
          onChange={handleInputChange}
          className="w-full pl-10 pr-4 py-2 rounded-full
                   bg-white text-black
                   focus:outline-none focus:ring-2 focus:ring-[#FF9800] focus:border-[#FF9800]"
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
              onClick={() => handleObjetivoSearch(objetivo.value)}
              className="w-full px-4 py-3 text-left hover:bg-gray-100 first:rounded-t-lg last:rounded-b-lg
                       transition-colors duration-200"
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

export default NavBarSearch;
