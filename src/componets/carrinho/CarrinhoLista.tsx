import { useContext } from "react";
import { CarrinhoContext } from "../../contexts/CarrinhoContext";

export default function CarrinhoLista() {
  const { itens, alterarQuantidade, remover } = useContext(CarrinhoContext);

  return (
    <div>
      <h2>Descrição do pedido</h2>
      <ul>
        {itens.map((item) => (
          <li key={item.produto.id}>
            {item.produto.item} - {item.quantidade}
            <button onClick={() => alterarQuantidade(item.produto.id, item.quantidade - 1)}>-</button>
            <button onClick={() => alterarQuantidade(item.produto.id, item.quantidade + 1)}>+</button>
            <button onClick={() => remover(item.produto.id)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
}