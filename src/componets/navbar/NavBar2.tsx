import { useContext } from "react";
import { FaShoppingCart, FaSearch } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

function NavBar2() {
  const { usuario, handleLogout } = useContext(AuthContext);

  return (
    <div className="mt-2">
      {/* Use container para ter a mesma largura dos cards */}
      <div className="flex items-stretch container mx-auto rounded-lg overflow-hidden">

        {/* Bloco branco do logo */}
        <div className="bg-white flex items-center justify-center px-4">
          <Link to={"/home2"}>
            <img src="/logo.png" alt="DevLivery Logo" className="h-16" />
          </Link>
        </div>

        {/* Bloco verde da navbar */}
        <div className="bg-[#7E8C54] flex items-center justify-between flex-1 px-8 gap-6">

          {/* Botão Olá Fulano ou Login */}
          {usuario && usuario.token ? (
            <>
            <div className="px-6 py-2 bg-[#FFF5DC] text-black rounded-full text-base font-semibold shadow">
                Olá {usuario.nome}
              </div>
            <button
              onClick={handleLogout}
              className="px-6 py-2 bg-[#FFF5DC] text-black rounded-full text-base font-semibold shadow hover:opacity-90"
            >
              Sair
            </button></>

          ) : (
            <button
              onClick={() => (window.location.href = "/home")}
              className="px-6 py-2 bg-[#FFF5DC] text-black rounded-full text-base font-semibold shadow hover:opacity-90"
            >
              Login
            </button>
          )}
          {/* Categorias */}
          <span className="text-white font-semibold text-lg text-center flex-1">
            Lanches Saudáveis · Marmitas Fit · Sucos
          </span>
          {/* Campo de pesquisa */}
          <div className="relative flex-1 max-w-xs">
            <input
              type="text"
              placeholder="Pesquisar..."
              className="w-full pl-10 pr-4 py-2 rounded-full
                         bg-white text-black
                         focus:outline-none focus:ring-2 focus:ring-[#FF9800] focus:border-[#FF9800]"
            />
            <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" />
          </div>

          <Link to="/carrinho">
            <FaShoppingCart className="text-white text-2xl cursor-pointer hover:scale-110 transition" />
          </Link>{" "}
        </div>
      </div>
    </div>
  );
}

export default NavBar2;
