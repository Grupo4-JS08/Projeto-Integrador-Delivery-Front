import FooterInfo from "../../componets/footerinfo/FooterInfo";

type Parceiro = {
  nome: string;
  logo: string;       
  url?: string;       
};

const HORARIOS = [
  { dia: "Segunda-feira",    horas: "11:00 AM – 10:00 PM" },
  { dia: "Terça-feira",   horas: "11:00 AM – 10:00 PM" },
  { dia: "Quarta-feira", horas: "11:00 AM – 10:00 PM" },
  { dia: "Quinta-feira",  horas: "11:00 AM – 10:00 PM" },
  { dia: "Sexta-feira",    horas: "11:00 AM – 11:00 PM" },
  { dia: "Sábado",  horas: "10:00 AM – 11:00 PM" },
  { dia: "Domingo",    horas: "10:00 AM – 09:00 PM" },
];

const PARCEIROS: Parceiro[] = [
  {
    nome: "Generation Brasil",
    logo: "",
    url: "",
  },
  {
    nome: "CNSeg",
    logo: "https://upload.wikimedia.org/wikipedia/commons/2/2f/Papa_John%27s_logo.svg",
    url: "https://www.papajohns.com/",
  },
  {
    nome: "ENS",
    logo: "https://upload.wikimedia.org/wikipedia/commons/5/57/KFC_logo.svg",
    url: "https://www.kfc.com/",
  },
];

export default function Contato() {
  return (
    <main className="min-h-screen bg-white">
<section className="container mx-auto px-4 py-10">
  <div className="grid grid-cols-1 md:grid-cols-[minmax(0,1fr)_420px] gap-10 items-start">
    {/* ESQUERDA: Título + lista */}
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        {/* Ícone simples (SVG) */}
      <img src="/infoContato.png" 
      alt=""
      className=" w-12 "  />

        <div>
          {/* Título exatamente como no mock */}
          <h2 className="text-[22px] leading-tight font-extrabold text-slate-900">
            Informações
          </h2>

          {/* Lista em negrito, pequena e com tracking normal */}
          <ul className="mt-3 space-y-1">
            <li className="text-[13.5px] font-extrabold text-slate-900">
              Trabalhe conosco
            </li>
            <li className="text-[13.5px] font-extrabold text-slate-900">
              Assine nossa Newsletter
            </li>
            <li className="text-[13.5px] font-extrabold text-slate-900">
              Contato
            </li>
          </ul>
        </div>
      </div>
    </div>

    {/* DIREITA: Card verde com sombra deslocada */}
    <div className="relative md:justify-self-end">
      {/* sombra deslocada (igual ao “cartão flutuando”) */}
      <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-2xl bg-black/15 blur-[2px] -z-10" />

      <div className="rounded-2xl bg-[#6B865B] text-white shadow-md px-8 py-8">
        <h3 className="text-center text-[20px] font-extrabold tracking-tight">
          Operational Times
        </h3>

        <ul className="mt-6 space-y-[9px]">
          {HORARIOS.map((h) => (
            <li
              key={h.dia}
              className="flex items-baseline justify-between leading-tight"
            >
              {/* Dia em negrito mais forte; horário um pouco mais claro */}
              <span className="text-[14px] font-extrabold text-white/95">
                {h.dia}
              </span>
              <span className="text-[13px] font-medium text-white/90">
                {h.horas}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  </div>
</section>
      <FooterInfo/>

      <section className="container mx-auto px-4 pb-16">
        <h3 className="text-base font-semibold text-gray-500">Parceiros</h3>

        <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          {PARCEIROS.map((p) => {
            const Card = (
              <div className="group flex flex-col items-center justify-center gap-3 rounded-2xl border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition">
                <div className="h-14 w-full flex items-center justify-center">
                  <img
                    src={p.logo}
                    alt={p.nome}
                    className="max-h-14 max-w-full object-contain"
                    loading="lazy"
                  />
                </div>
                <span className="text-sm font-medium text-gray-800 group-hover:text-emerald-700">
                  {p.nome}
                </span>
              </div>
            );
            return p.url ? (
              <a key={p.nome} href={p.url} target="_blank" rel="noreferrer">
                {Card}
              </a>
            ) : (
              <div key={p.nome}>{Card}</div>
            );
          })}
        </div>
      </section>
    </main>
  );
}