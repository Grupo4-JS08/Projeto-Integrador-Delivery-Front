// src/components/navbar/Navbar.tsx
import { useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";

// seus paths originais
import ModalLogin from "../usuario/modallogin/ModalLogin";
import ModalLogin2 from "../usuario/modallogin2/ModalLogin2";
import ModalCadastro from "../usuario/modalcadastrar/ModalCadastrar";

function Navbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLogin2Open, setIsLogin2Open] = useState(false);
  const [isCadastroOpen, setIsCadastroOpen] = useState(false);

  // Fecha todos (garante que só um modal fique aberto de cada vez)
  const closeAllModals = () => {
    setIsLoginOpen(false);
    setIsLogin2Open(false);
    setIsCadastroOpen(false);
  };

  // Scroll lock no <body> quando algum modal está aberto
  useEffect(() => {
    const anyOpen = isLoginOpen || isLogin2Open || isCadastroOpen;
    document.body.classList.toggle("overflow-hidden", anyOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [isLoginOpen, isLogin2Open, isCadastroOpen]);

  // Fechar com ESC
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeAllModals();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // Aberturas/fechamentos
  const handleOpenLogin = () => {
    closeAllModals();
    setIsLoginOpen(true);
  };
  const handleCloseLogin = () => setIsLoginOpen(false);

  const handleOpenLogin2 = () => {
    closeAllModals();
    setIsLogin2Open(true);
  };
  const handleCloseLogin2 = () => setIsLogin2Open(false);

  const handleOpenCadastro = () => {
    closeAllModals();
    setIsCadastroOpen(true);
  };
  const handleCloseCadastro = () => setIsCadastroOpen(false);

  // Fluxos a partir do ModalLogin (passo 1)
  const handleGoToLogin2 = () => {
    // fecha o ModalLogin e abre o ModalLogin2
    setIsLoginOpen(false);
    setIsLogin2Open(true);
  };

  const handleGoToCadastro = () => {
    // fecha o ModalLogin e abre o ModalCadastro
    setIsLoginOpen(false);
    setIsCadastroOpen(true);
  };

  return (
    <>
      <nav className="w-full bg-white shadow-sm">
        <div className="container mx-auto flex justify-between items-center py-2 px-6">
          {/* LOGO */}
          <Link to="/home" className="flex items-center space-x-2">
            <img src="/logo.png" alt="Logo DevLivery" className="h-16 w-auto" />
          </Link>

          {/* MENU */}
          <div className="flex items-center space-x-6">
            {/* Ofertas + Contato */}
            <div className="flex rounded-full overflow-hidden border border-gray-200">
              <Link
                to="/ofertas"
                className="px-4 py-2 bg-[#7E8C54] text-black font-semibold text-sm hover:opacity-90 transition rounded-l-full text-center"
              >
                Ofertas
              </Link>
              <Link
                to="/contato"
                className="px-4 py-2 bg-[#FFF5DC] text-black font-semibold text-sm hover:opacity-90 transition rounded-full -ml-4"
              >
                Contato
              </Link>
            </div>

            {/* Botão que abre o ModalLogin (passo 1) */}
            <button
              type="button"
              onClick={handleOpenLogin}
              className="flex items-center space-x-2 px-5 py-2 rounded-full bg-[#FF9800] text-black font-semibold text-sm hover:opacity-90 transition"
            >
              <FaUser />
              <span>Login</span>
            </button>
          </div>
        </div>
      </nav>

      {/* ModalLogin (passo 1) */}
      <ModalLogin
        isOpen={isLoginOpen}
        onClose={handleCloseLogin}
        onLoginClick={handleGoToLogin2}      // abre ModalLogin2
        onRegisterClick={handleGoToCadastro} // abre ModalCadastro
      />

      {/* ModalLogin2 (form de login) */}
      {isLogin2Open && (
        <ModalLogin2 onClose={handleCloseLogin2} />
      )}

      {/* ModalCadastro */}
      {isCadastroOpen && (
        <ModalCadastro onClose={handleCloseCadastro} />
      )}
    </>
  );
}

export default Navbar;
