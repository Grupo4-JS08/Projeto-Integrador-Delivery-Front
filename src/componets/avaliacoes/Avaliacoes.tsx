import { useState, type FormEvent } from "react";
import { FaStar } from "react-icons/fa";

interface Avaliacao {
  nome: string;
  local: string;
  data: string;
  nota: number;
  comentario: string;
}

export default function Avaliacoes() {
  // Estado inicial já com 2 avaliações
  const [avaliacoes, setAvaliacoes] = useState<Avaliacao[]>([
    {
      nome: "João Silva",
      local: "São Paulo",
      data: new Date().toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      nota: 4,
      comentario: "Ótima experiência, entrega rápida!",
    },
    {
      nome: "Maria Oliveira",
      local: "Rio de Janeiro",
      data: new Date().toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      nota: 5,
      comentario: "Adorei! Comida deliciosa e bem embalada.",
    },
  ]);

  const [nome, setNome] = useState("");
  const [local, setLocal] = useState("");
  const [nota, setNota] = useState(0);
  const [comentario, setComentario] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const novaAvaliacao: Avaliacao = {
      nome,
      local,
      data: new Date().toLocaleDateString("pt-BR", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      nota,
      comentario,
    };

    setAvaliacoes([...avaliacoes, novaAvaliacao]);

    // limpar campos
    setNome("");
    setLocal("");
    setNota(0);
    setComentario("");
  };

  return (
    <div className="w-full flex flex-col items-center gap-8 p-6">
      <h2 className="text-3xl font-bold mb-8 text-left">Avaliações</h2>

      {/* LISTA DE AVALIAÇÕES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl">
        {avaliacoes.map((avaliacao, index) => (
          <div
            key={index}
            className="p-4 rounded-lg shadow-md bg-white flex flex-col gap-2"
          >
            <div className="flex justify-between items-center">
              <h3 className="font-bold">{avaliacao.nome}</h3>
              <span className="text-sm text-gray-500">{avaliacao.data}</span>
            </div>
            <span className="text-orange-600">{avaliacao.local}</span>
            <p className="text-gray-600">{avaliacao.comentario}</p>

            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  color={i < avaliacao.nota ? "orange" : "lightgray"}
                />
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* FORMULÁRIO */}
      <form
        onSubmit={handleSubmit}
        className="p-6 rounded-lg shadow-md bg-white w-full max-w-xl flex flex-col gap-4"
      >
        <h2 className="text-xl font-bold">Deixe sua avaliação</h2>

        <input
          type="text"
          placeholder="Digite seu nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <input
          type="text"
          placeholder="Digite seu local"
          value={local}
          onChange={(e) => setLocal(e.target.value)}
          className="border p-2 rounded"
          required
        />

        <div className="flex gap-2 items-center">
          <span>Sua nota:</span>
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              onClick={() => setNota(i + 1)}
              color={i < nota ? "orange" : "lightgray"}
              className="cursor-pointer"
            />
          ))}
        </div>

        <textarea
          placeholder="Escreva seu comentário"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
          className="border p-2 rounded resize-none"
          rows={3}
          required
        />

        <button
          type="submit"
          className="bg-orange-500 hover:bg-orange-600 text-white py-2 rounded"
        >
          Enviar avaliação
        </button>
      </form>
    </div>
  );
}