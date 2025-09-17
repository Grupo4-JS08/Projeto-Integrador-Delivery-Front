import { useContext } from "react";
import { CarrinhoContext } from "../../contexts/CarrinhoContext";

export default function CarrinhoResumo() {
  const { itens } = useContext(CarrinhoContext);

  // Exemplo de cálculo
  const subTotal = itens.reduce((acc, item) => acc + item.produto.valor * item.quantidade, 0);
  const desconto = 3.0;
  const taxaEntrega = 2.5;
  const total = subTotal - desconto + taxaEntrega;

  return (
    <aside className="bg-[#D9E6C3] rounded-xl p-6 w-full max-w-xs mx-auto shadow-lg">
      <h2 className="font-bold text-lg mb-4 flex items-center gap-2">
        <span className="bg-[#F79009] text-white rounded-full px-2 py-1">🛒</span>
        Carrinho
      </h2>
      <ul className="mb-4">
        {itens.map((item) => (
          <li key={item.produto.id} className="flex justify-between mb-2">
            <span>{item.quantidade}x {item.produto.item}</span>
            <span>£{(item.produto.valor * item.quantidade).toFixed(2)}</span>
          </li>
        ))}
      </ul>
      <div className="mb-2 flex justify-between">
        <span>Sub Total:</span>
        <span>£{subTotal.toFixed(2)}</span>
      </div>
      <div className="mb-2 flex justify-between">
        <span>Discount:</span>
        <span>-£{desconto.toFixed(2)}</span>
      </div>
      <div className="mb-2 flex justify-between">
        <span>Delivery Fee:</span>
        <span>£{taxaEntrega.toFixed(2)}</span>
      </div>
      <div className="mb-4 flex justify-between font-bold text-[#F79009]">
        <span>Valor total</span>
        <span>£{total.toFixed(2)}</span>
      </div>
      <button className="w-full bg-[#F79009] text-white font-bold py-2 rounded-full hover:bg-[#e28200]">
        Finalizar
      </button>
    </aside>
  );
}