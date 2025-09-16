import { FaSearch, FaShoppingCart } from "react-icons/fa";

function NavBar2() {
  return (
    <div>
      {/* SEÇÃO PRODUTOS */}
      <section className="container mx-auto mt-8">
        {/* Título + Pesquisa */}
        <div className="flex flex-col md:flex-row justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Veja nossos produtos</h2>
          <div className="relative mt-2 md:mt-0">
            <input
              type="text"
              placeholder="Pesquisar"
              className="pl-10 pr-4 py-2 border border-gray-200 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF9800]"
            />
            <FaSearch className="absolute left-3 top-3 text-gray-400" />
          </div>
        </div>

        {/* Barra Verde */}
        <div className="bg-[#7E8C54] flex items-center justify-between px-8 py-4 rounded">
          {/* Botão Contato */}
          <button className="px-6 py-2 bg-[#FFF5DC] text-black rounded-full text-base font-semibold shadow hover:opacity-90">
            Contato
          </button>

          {/* Categorias */}
          <span className="text-white font-semibold text-lg flex-1 text-center">
            Lanches Saudáveis · Marmitas Fit · Sucos
          </span>

          <div className="bg-[#7E8C54] p-2 rounded-full flex items-center justify-center">
            <FaShoppingCart className="text-white text-2xl cursor-pointer hover:scale-110 transition" />
          </div>
        </div>
      </section>
    </div>
  );
}

export default NavBar2;
