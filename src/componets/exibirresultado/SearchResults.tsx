import type Produto from "../../models/Produto";


interface SearchResultsProps {
  produtos: Produto[];
  objetivo: string;
}

function SearchResults({ produtos, objetivo }: SearchResultsProps) {
  if (!objetivo) return null;

  return (
    <div className="container mx-auto mt-6 p-6 bg-white rounded-lg shadow">
      <h2 className="text-2xl font-bold text-[#7E8C54] mb-4">
        Resultados para: {objetivo}
      </h2>

      {produtos.length === 0 ? (
        <p className="text-gray-600">Nenhum produto encontrado para este objetivo.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {produtos.map((produto) => (
            <div key={produto.id} className="border rounded-lg p-4">
              <h3 className="font-semibold text-lg">{produto.nome}</h3>
              <p className="text-gray-600">{produto.descricao}</p>
              <p className="text-[#7E8C54] font-bold mt-2">
                R$ {produto.preco.toFixed(2)}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default SearchResults;
