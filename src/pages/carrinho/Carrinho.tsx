// src/pages/carrinho/Carrinho.tsx
import React, { useMemo, useState } from "react";
import {
  X,
  ShoppingCartSimpleIcon,
  StorefrontIcon,
  TruckIcon,
  PlusIcon,
  TrashIcon,
  MinusIcon,
  TagIcon,
} from "@phosphor-icons/react";

type CartItem = {
  id: string;
  nome: string;
  preco: number;
  img: string;
  detalhes?: string;
  qtd: number;
};

const formatMoney = (n: number) =>
  n.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

const DELIVERY_FEE = 9.9;

export default function Carrinho() {
  const [itens, setItens] = useState<CartItem[]>([
    {
      id: "1",
      nome: "Salada tropical",
      preco: 29.9,
      img: "https://i.pinimg.com/736x/34/c6/53/34c65335c5acbac27b601326d4dd9d29.jpg",
      detalhes: "Sem queijo + sem Croutons",
      qtd: 1,
    },
    {
      id: "2",
      nome: "Batata recheada",
      preco: 39.9,
      img: "https://i.pinimg.com/736x/34/e7/5d/34e75d0db8c92020c100f677a3a0a260.jpg",
      detalhes: "Molho picante",
      qtd: 1,
    },
    {
      id: "3",
      nome: "Bowl de frango teriyaki",
      preco: 54.9,
      img: "https://i.pinimg.com/736x/04/3b/eb/043beb21b2b4860012364e083233daf1.jpg",
      detalhes: "Extra bacon",
      qtd: 1,
    },
    {
      id: "4",
      nome: "Suco de laranja",
      preco: 10.0,
      img: "https://i.pinimg.com/736x/45/0d/e3/450de32933f8ebf34a9868a2eac20c2e.jpg",
      detalhes: "Com gelo",
      qtd: 2,
    },
    {
      id: "5",
      nome: "Pizza toscana",
      preco: 42.9,
      img: "https://images.unsplash.com/photo-1528137871618-79d2761e3fd5?w=240&q=80",
      detalhes: "Tradicional",
      qtd: 1,
    },
  ]);

  const [selecionado, setSelecionado] = useState<string>("4");
  const [cupom, setCupom] = useState("");
  const [cupomAplicado, setCupomAplicado] = useState<string | null>(null);

  const subtotal = useMemo(
    () => itens.reduce((acc, it) => acc + it.preco * it.qtd, 0),
    [itens]
  );

  const desconto = useMemo(() => {
    if (!cupomAplicado) return 0;
    if (cupomAplicado.toUpperCase() === "PROMO3") return 3;
    if (cupomAplicado.toUpperCase() === "OFF10") return subtotal * 0.1;
    return 0;
  }, [cupomAplicado, subtotal]);

  const total = Math.max(0, subtotal - desconto + DELIVERY_FEE);

  function inc(id: string) {
    setItens((prev) =>
      prev.map((it) => (it.id === id ? { ...it, qtd: it.qtd + 1 } : it))
    );
  }

  function dec(id: string) {
    setItens((prev) =>
      prev.map((it) =>
        it.id === id ? { ...it, qtd: Math.max(1, it.qtd - 1) } : it
      )
    );
  }

  function remover(id: string) {
    setItens((prev) => prev.filter((it) => it.id !== id));
    if (selecionado === id) setSelecionado("");
  }

  function aplicarCupom() {
    setCupomAplicado(cupom.trim() || null);
  }

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-[minmax(0,1fr)_360px] gap-6">
        {/* ESQUERDA */}
        <section>
          <h1 className="text-lg font-semibold text-gray-900 mb-4">
            Descrição do pedido
          </h1>

          <div className="space-y-4">
            {itens.map((it) => {
              const ativo = selecionado === it.id;

              return (
                <div
                  key={it.id}
                  className={`rounded-xl border shadow-sm flex items-center gap-4 pl-4 pr-3 ${
                    ativo
                      ? "bg-[#6B865B] text-white border-transparent"
                      : "bg-amber-50/60 border-amber-100 text-gray-900"
                  }`}
                >
                  <img
                    src={it.img}
                    alt={it.nome}
                    className={`w-14 h-14 rounded-full object-cover ring-2 ${
                      ativo ? "ring-white/60" : "ring-amber-200"
                    }`}
                  />

                  <div className="flex-1 flex items-center gap-4 min-w-0">
                    <div className="flex items-center gap-4 w-full min-w-0 py-4">
                      <div className="h-5 w-[1px] bg-current/40" />
                      <div className="flex-1 min-w-0">
                        <div className="truncate font-semibold">{it.nome}</div>
                        <button
                          className={`mt-1 text-sm ${
                            ativo
                              ? "text-white/90 hover:text-white"
                              : "text-gray-500 hover:text-gray-700"
                          }`}
                          onClick={() => setSelecionado(it.id)}
                        >
                          Alterar pedido
                        </button>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => dec(it.id)}
                          className={`grid place-items-center rounded-full h-8 w-8 ${
                            ativo ? "bg-white/20" : "bg-white"
                          }`}
                          aria-label="Diminuir"
                        >
                          <MinusIcon
                            size={18}
                            className={ativo ? "text-white" : "text-gray-900"}
                            weight="bold"
                          />
                        </button>

                        <span className="inline-flex items-center justify-center h-10 w-10 rounded-lg text-sm font-bold bg-white text-gray-900">
                          {it.qtd}
                        </span>

                        <button
                          onClick={() => inc(it.id)}
                          className={`grid place-items-center rounded-full h-8 w-8 ${
                            ativo ? "bg-white/20" : "bg-white"
                          }`}
                          aria-label="Aumentar"
                        >
                          <PlusIcon
                            size={18}
                            className={ativo ? "text-white" : "text-gray-900"}
                            weight="bold"
                          />
                        </button>

                        <button
                          onClick={() => remover(it.id)}
                          className={`ml-2 grid place-items-center rounded-full h-8 w-8 ${
                            ativo ? "bg-white/20" : "bg-white"
                          }`}
                          aria-label="Remover"
                          title="Remover"
                        >
                          <TrashIcon
                            size={18}
                            className={ativo ? "text-white" : "text-gray-900"}
                          />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </section>

        {/* DIREITA (RESUMO) */}
        <aside className="self-start rounded-xl border shadow-sm overflow-hidden">
          <div className="flex items-center gap-2 bg-[#6B865B] text-white px-4 py-3">
            <ShoppingCartSimpleIcon size={22} weight="bold" />
            <h2 className="font-semibold">Carrinho</h2>
          </div>

          <div className="divide-y">
            {itens.map((it) => (
              <div key={it.id} className="flex items-start gap-3 px-4 py-3">
                <div className="relative">
                  <img
                    src={it.img}
                    alt={it.nome}
                    className="w-12 h-12 rounded object-cover"
                  />
                  {it.qtd > 1 && (
                    <span className="absolute -top-2 -right-2 bg-orange-500 text-white text-[11px] font-bold rounded-full px-1.5 py-0.5">
                      {it.qtd}x
                    </span>
                  )}
                </div>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between gap-2">
                    <div className="truncate font-semibold text-sm">
                      {it.nome}
                    </div>
                    <div className="text-sm font-medium text-gray-700">
                      {formatMoney(it.preco * it.qtd)}
                    </div>
                  </div>
                  {it.detalhes && (
                    <div className="text-[12px] text-gray-500 truncate">
                      {it.detalhes}
                    </div>
                  )}
                </div>

                <button
                  className="ml-1 text-gray-400 hover:text-rose-600"
                  onClick={() => remover(it.id)}
                  aria-label={`Remover ${it.nome}`}
                  title="Remover"
                >
                  <X size={16} />
                </button>
              </div>
            ))}
          </div>

          <div className="px-4 py-3 space-y-2 bg-amber-50/50">
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Sub Total:</span>
              <span className="font-semibold text-gray-800">
                {formatMoney(subtotal)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Discounts:</span>
              <span className="font-semibold text-rose-600">
                - {formatMoney(desconto)}
              </span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-gray-600">Delivery Fee:</span>
              <span className="font-semibold text-gray-800">
                {formatMoney(DELIVERY_FEE)}
              </span>
            </div>

            <div className="mt-2">
              <button
                className="w-full inline-flex items-center justify-between bg-orange-500 text-white font-bold rounded-lg px-4 py-3 shadow hover:bg-orange-600"
                title="Valor total"
              >
                <span>Valor total</span>
                <span className="text-lg">{formatMoney(total)}</span>
              </button>
            </div>

            <div className="mt-3">
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <TagIcon
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
              <TruckIcon className="mx-auto mb-1 text-emerald-700" size={22} />
              <div className="text-xs text-gray-600">Delivery</div>
              <div className="text-[11px] text-gray-500">Chega em ~45min</div>
            </div>
            <div className="rounded-lg border px-3 py-3 text-center">
              <StorefrontIcon className="mx-auto mb-1 text-emerald-700" size={22} />
              <div className="text-xs text-gray-600">Retirar</div>
              <div className="text-[11px] text-gray-500">Pronto às 18:50</div>
            </div>
          </div>

          <div className="px-4 py-4 bg-amber-50/50">
            <button className="w-full inline-flex items-center justify-center gap-2 bg-[#6B865B] text-white font-semibold rounded-lg px-4 py-3 hover:bg-[#5e764e]">
              <ShoppingCartSimpleIcon size={18} />
              Finalizar
            </button>
          </div>
        </aside>
      </div>
    </main>
  );
}
