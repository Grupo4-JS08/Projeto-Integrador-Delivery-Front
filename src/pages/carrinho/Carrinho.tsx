// pages/carrinho/Carrinho.tsx
import { useContext, useMemo, useState } from "react";
import { CarrinhoContext } from "../../contexts/CarrinhoContext";
import {
  X,
  ShoppingCart,
  Store,
  Truck,
  Plus,
  Trash2,
  Minus,
  Tag,
} from "lucide-react";

const DELIVERY_FEE = 9.9;

export default function Carrinho() {
  const { itens, alterarQuantidade, remover, carregando } =
    useContext(CarrinhoContext);
  const [cupom, setCupom] = useState("");
  const [cupomAplicado, setCupomAplicado] = useState<string | null>(null);

  const subtotal = useMemo(
    () =>
      itens.reduce(
        (acc, item) => acc + item.produto.valor * item.quantidade,
        0
      ),
    [itens]
  );

  const desconto = useMemo(() => {
    if (!cupomAplicado) return 0;
    if (cupomAplicado.toUpperCase() === "PROMO3") return 3;
    if (cupomAplicado.toUpperCase() === "OFF10") return subtotal * 0.1;
    return 0;
  }, [cupomAplicado, subtotal]);

  const total = Math.max(0, subtotal - desconto + DELIVERY_FEE);

  function aumentarQuantidade(id: number) {
    alterarQuantidade(
      id,
      itens.find((item) => item.produto.id === id)!.quantidade + 1
    );
  }

  function diminuirQuantidade(id: number) {
    const item = itens.find((item) => item.produto.id === id);
    if (item && item.quantidade > 1) {
      alterarQuantidade(id, item.quantidade - 1);
    } else {
      remover(id);
    }
  }

  function aplicarCupom() {
    setCupomAplicado(cupom.trim() || null);
  }

  if (carregando) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-6">
        {/* ESQUERDA - LISTA DE ITENS */}
        <section>
          <h1 className="text-lg font-semibold text-gray-900 mb-4">
            Descrição do pedido
          </h1>

          <div className="space-y-4">
            {itens.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                Seu carrinho está vazio
              </p>
            ) : (
              itens.map((item) => (
                <div
                  key={item.produto.id}
                  className="rounded-xl border shadow-sm flex items-center gap-4 pl-4 pr-3 bg-amber-50/60 border-amber-100 text-gray-900"
                >
                  <img
                    src={item.produto.categoria?.foto || "/lanche01.jpg"}
                    alt={item.produto.item}
                    className="w-14 h-14 rounded-full object-cover ring-2 ring-amber-200"
                  />

                  <div className="flex-1 flex items-center gap-4 min-w-0">
                    <div className="flex items-center gap-4 w-full min-w-0 py-4">
                      <div className="h-5 w-[1px] bg-gray-400/40" />
                      <div className="flex-1 min-w-0">
                        <div className="truncate font-semibold">
                          {item.produto.item}
                        </div>
                        <div className="mt-1 text-sm text-gray-500">
                          R$ {item.produto.valor.toFixed(2)}
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => diminuirQuantidade(item.produto.id)}
                          className="grid place-items-center rounded-full h-8 w-8 bg-white"
                          aria-label="Diminuir"
                        >
                          <Minus
                            size={18}
                            className="text-gray-900"
                            height="bold"
                          />
                        </button>

                        <span className="inline-flex items-center justify-center h-10 w-10 rounded-lg text-sm font-bold bg-white text-gray-900">
                          {item.quantidade}
                        </span>

                        <button
                          onClick={() => aumentarQuantidade(item.produto.id)}
                          className="grid place-items-center rounded-full h-8 w-8 bg-white"
                          aria-label="Aumentar"
                        >
                          <Plus
                            size={18}
                            className="text-gray-900"
                            height="bold"
                          />
                        </button>

                        <button
                          onClick={() => remover(item.produto.id)}
                          className="ml-2 grid place-items-center rounded-full h-8 w-8 bg-white"
                          aria-label="Remover"
                          title="Remover"
                        >
                          <Trash2 size={18} className="text-gray-900" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </section>

        {/* DIREITA - RESUMO DO CARRINHO */}
        <aside className="self-start rounded-xl border shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 bg-[#6B865B] text-white px-4 py-3">
            <ShoppingCart size={22} height="bold" />
            <h2 className="font-semibold">Carrinho</h2>
          </div>

          <div className="divide-y">
            {itens.length === 0 ? (
              <p className="text-center text-gray-500 p-4">
                Seu carrinho está vazio
              </p>
            ) : (
              itens.map((item) => (
                <div
                  key={item.produto.id}
                  className="flex items-start gap-3 px-4 py-3"
                >
                  <div className="relative">
                    <img
                      src={item.produto.categoria?.foto || "/lanche01.jpg"}
                      alt={item.produto.item}
                      className="w-12 h-12 rounded object-cover"
                    />
                    {item.quantidade > 1 && (
                      <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[11px] font-bold rounded-full px-1.5 py-0.5">
                        {item.quantidade}x
                      </span>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between gap-2">
                      <div className="truncate font-semibold text-sm">
                        {item.produto.item}
                      </div>
                      <div className="text-sm font-medium text-gray-700">
                        R$ {(item.produto.valor * item.quantidade).toFixed(2)}
                      </div>
                    </div>
                    <div className="text-[12px] text-gray-500">
                      {item.produto.calorias} calorias
                    </div>
                  </div>

                  <button
                    className="ml-1 text-gray-400 hover:text-rose-600"
                    onClick={() => remover(item.produto.id)}
                    aria-label={`Remover ${item.produto.item}`}
                    title="Remover"
                  >
                    <X size={16} />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="px-4 py-3 space-y-2 bg-amber-50/50">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Sub Total:</span>
              <span className="font-semibold text-gray-800">
                R$ {subtotal.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Desconto:</span>
              <span className="font-semibold text-rose-600">
                - R$ {desconto.toFixed(2)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Taxa de Entrega:</span>
              <span className="font-semibold text-gray-800">
                R$ {DELIVERY_FEE.toFixed(2)}
              </span>
            </div>

            <div className="mt-2">
              <button
                className="w-full inline-flex items-center justify-between bg-orange-500 text-white font-bold rounded-lg px-4 py-3 shadow hover:bg-orange-600"
                title="Valor total"
              >
                <span>Valor total</span>
                <span className="text-lg">R$ {total.toFixed(2)}</span>
              </button>
            </div>

            <div className="mt-3">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <Tag
                    size={16}
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
                  />
                  <input
                    type="text"
                    placeholder="Cupom de desconto"
                    value={cupom}
                    onChange={(e) => setCupom(e.target.value)}
                    className="w-full pl-9 pr-3 py-2 rounded-lg border text-sm focus:outline-none focus:ring-2 focus:ring-emerald-500"
                  />
                </div>
                <button
                  onClick={aplicarCupom}
                  className="px-3 py-2 rounded-lg bg-emerald-600 text-white text-sm font-semibold hover:bg-emerald-700"
                >
                  Aplicar
                </button>
              </div>
              {cupomAplicado && (
                <p className="mt-1 text-xs text-emerald-700">
                  Cupom <strong>{cupomAplicado.toUpperCase()}</strong> aplicado.
                </p>
              )}
            </div>
          </div>

          <div className="px-4 py-3 grid grid-cols-2 gap-3 bg-amber-50/50">
            <div className="rounded-lg border px-3 py-3 text-center">
              <Truck className="mx-auto mb-1 text-emerald-700" size={22} />
              <div className="text-xs text-gray-600">Delivery</div>
              <div className="text-[11px] text-gray-500">Chega em ~45min</div>
            </div>
            <div className="rounded-lg border px-3 py-3 text-center">
              <Store className="mx-auto mb-1 text-emerald-700" size={22} />
              <div className="text-xs text-gray-600">Retirar</div>
              <div className="text-[11px] text-gray-500">Pronto às 18:50</div>
            </div>
          </div>

          <div className="px-4 py-4 bg-amber-50/50">
            <button
              className={`w-full inline-flex items-center justify-center gap-2 bg-[#6B865B] text-white font-semibold rounded-lg px-4 py-3 hover:bg-[#5e764e] ${itens.length === 0 ? "opacity-50 cursor-not-allowed" : ""}`}
              disabled={itens.length === 0}
            >
              <ShoppingCart size={18} />
              Finalizar Pedido
            </button>
          </div>
        </aside>
      </div>
    </main>
  );
}
