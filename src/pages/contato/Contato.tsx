import FooterInfo from "../../componets/footerinfo/FooterInfo";

type Parceiro = {
  nome: string;
  logo: string;
  url?: string;
};

const HORARIOS = [
  { dia: "Segunda-feira ", horas: " 8:00 AM–3:00 AM" },
  { dia: "Terça-feira", horas: "8:00 AM–3:00 AM" },
  { dia: "Quarta-feira", horas: "8:00 AM–3:00 AM" },
  { dia: "Quinta-feira", horas: "8:00 AM–3:00 AM" },
  { dia: "Sexta-feira", horas: "8:00 AM–3:00 AM" },
  { dia: "Sábado", horas: "8:00 AM–3:00 AM" },
  { dia: "Domingo", horas: "8:00 AM–3:00 AM" },
];

const PARCEIROS: Parceiro[] = [
  {
    nome: "Generation Brasil",
    logo: "https://arymax.org.br/novosite/wp-content/uploads/2020/12/inc-logo-05.png",
    url: "https://brazil.generation.org/"
  },
  {
    nome: "CNSeg",
    logo: "https://media.licdn.com/dms/image/C4E0BAQECyBsogOpTrQ/company-logo_200_200/0/1586451838402?e=2147483647&v=beta&t=1v-KQBDDDpzk-jLVhfeYAzFz55P0w62zB4TKSjDkw6Y",
    url: "https://cnseg.org.br/",
  },
  {
    nome: "ENS",
    logo: "https://www.alppiseguros.com.br/public/assets/images/logo_ens.png",
    url: "https://www.ens.edu.br/",
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
                className=" w-12 " />

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
                  <li className="text-[13.5px] font-semibold text-slate-900">
                    Envie seu currículo para:
                    rh@devlivery.app
                  </li>
                  <li className="text-[13.5px] font-extrabold text-slate-900">
                    Contato
                  </li>
                  <li className="text-[13.5px] font-semibold text-slate-900">
                    AV. Brigadeiro Faria Lima - SP

                  </li>
                  <li className="text-[13.5px] font-semibold text-slate-900">
                    Número de Telefone: (11) 91234-5678
                  </li>

                </ul>

                <a
                  href="https://github.com/Grupo4-JS08"
                  target="_blank"
                  rel="noreferrer"
                  className="mt-3 inline-block text-[13px] font-medium text-slate-700 underline decoration-slate-300 underline-offset-2 hover:text-emerald-700 hover:decoration-emerald-500"
                >
                  https://github.com/Grupo4-JS08
                </a>
              </div>
            </div>
          </div>

          {/* DIREITA: Card verde com sombra deslocada */}
          <div className="relative md:justify-self-end">
            <div className="absolute inset-0 translate-x-2 translate-y-2 rounded-2xl bg-black/15 blur-[2px] -z-10" />
            <div className="rounded-2xl bg-[#6B865B] text-white shadow-md px-8 py-8">
              <h3 className="text-center text-[20px] font-extrabold tracking-tight">
                Horário de Atendimento
              </h3>
              <ul className="mt-6 space-y-[9px]">
                {HORARIOS.map((h) => (
                  <li
                    key={h.dia}
                    className="flex items-baseline justify-between leading-tight"
                  >
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

      <FooterInfo />

      {/* Parceiros */}
      <section className="container mx-auto px-4 pb-16">
        <h3 className="text-base font-semibold text-gray-500">Parceiros</h3>

        <div
          className="
      mt-6 grid gap-6
      [grid-template-columns:repeat(auto-fit,minmax(280px,0))]
      max-w-5xl mx-auto
      justify-center
    "
        >
          {PARCEIROS.map((p) => {
            const Card = (
              <div
                className="
            w-[280px] h-[140px]
            grid grid-rows-[1fr_auto] place-items-center
            rounded-2xl border border-gray-200 bg-white
            p-4 shadow-sm hover:shadow-md transition
          "
              >
                {/* área do logo com altura fixa para não variar */}
                <div className="h-16 w-full flex items-center justify-center">
                  <img
                    src={p.logo}
                    alt={p.nome}
                    className="h-full max-h-16 w-auto object-contain"
                    loading="lazy"
                  />
                </div>

                <span className="text-sm font-medium text-gray-800">
                  {p.nome}
                </span>
              </div>
            );

            return p.url ? (
              <a key={p.nome} href={p.url} target="_blank" rel="noreferrer" className="justify-self-center">
                {Card}
              </a>
            ) : (
              <div key={p.nome} className="justify-self-center">
                {Card}
              </div>
            );
          })}
        </div>
      </section>

    </main>
  );
}
