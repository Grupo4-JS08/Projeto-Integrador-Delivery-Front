import { useContext } from "react";
import { CarrinhoContext } from "../../contexts/CarrinhoContext";

export default function CarrinhoLista() {
  const { itens, alterarQuantidade, remover, carregando } = useContext(CarrinhoContext);

  if (carregando) {
    return (
      <div className="flex justify-center items-center h-32">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl p-6 shadow-lg">
      <h2 className="text-lg font-semibold text-gray-900 mb-4">Descrição do pedido</h2>

      {itens.length === 0 ? (
        <p className="text-center text-gray-500 py-8">Seu carrinho está vazio</p>
      ) : (
        <ul className="space-y-4">
          {itens.map((item) => (
            <li key={item.produto.id} className="flex items-center justify-between p-4 bg-amber-50 rounded-lg">
              <div className="flex items-center space-x-4">
                <img
                  src={item.produto.categoria?.foto || "/lanche01.jpg"}
                  alt={item.produto.item}
                  className="w-16 h-16 object-cover rounded-full"
                />
                <div>
                  <h3 className="font-semibold">{item.produto.item}</h3>
                  <p className="text-sm text-gray-600">R$ {item.produto.valor.toFixed(2)}</p>
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => alterarQuantidade(item.produto.id, item.quantidade - 1)}
                  className="bg-white text-orange-500 rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-orange-50"
                >
                  -
                </button>
                <span className="mx-2 font-semibold">{item.quantidade}</span>
                <button
                  onClick={() => alterarQuantidade(item.produto.id, item.quantidade + 1)}
                  className="bg-white text-orange-500 rounded-full w-8 h-8 flex items-center justify-center shadow-md hover:bg-orange-50"
                >
                  +
                </button>
                <button
                  onClick={() => remover(item.produto.id)}
                  className="ml-4 text-red-500 hover:text-red-700"
                >
                  Remover
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
