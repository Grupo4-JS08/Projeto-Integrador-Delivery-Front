/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { FaUser } from "react-icons/fa";
import { Link } from "react-router-dom";
import ModalLogin from "../usuario/modallogin/ModalLogin";
import ModalLogin2 from "../usuario/modallogin2/ModalLogin2";
import ModalCadastro from "../usuario/modalcadastrar/ModalCadastrar";
import { AuthContext } from "../../contexts/AuthContext";

function Navbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLogin2Open, setIsLogin2Open] = useState(false);
  const [isCadastroOpen, setIsCadastroOpen] = useState(false);
  const { usuario, handleLogout } = useContext(AuthContext);

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
    setIsLoginOpen(false);
    setIsLogin2Open(true);
  };

  const handleGoToCadastro = () => {
    setIsLoginOpen(false);
    setIsCadastroOpen(true);
  };

  const handleLogoutClick = () => {
    handleLogout();
    closeAllModals();
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
                className="px-4 py-2 bg-[#7E8C54] text-white font-semibold text-sm hover:opacity-90 transition rounded-l-full text-center"
              >
                Ofertas
              </Link>
              <Link
                to="/contato"
                className="px-4 py-2 bg-[#FFF5DC] text-black font-semibold text-sm hover:opacity-90 transition rounded-r-full"
              >
                Contato
              </Link>
            </div>

            {/* Botão de Login/Logout */}
            {usuario.token ? (
              <div className="flex items-center space-x-3">
                <span className="text-sm text-gray-700">Olá, {usuario.nome}</span>
                <button
                  type="button"
                  onClick={handleLogoutClick}
                  className="flex items-center space-x-2 px-5 py-2 rounded-full bg-[#FF9800] text-black font-semibold text-sm hover:opacity-90 transition"
                >
                  <FaUser />
                  <span>Sair</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleOpenLogin}
                className="flex items-center space-x-2 px-5 py-2 rounded-full bg-[#FF9800] text-black font-semibold text-sm hover:opacity-90 transition"
              >
                <FaUser />
                <span>Login</span>
              </button>
            )}
          </div>
        </div>
      </nav>

      {/* ModalLogin (passo 1) */}
      <ModalLogin
        isOpen={isLoginOpen}
        onClose={handleCloseLogin}
        onLoginClick={handleGoToLogin2}
        onRegisterClick={handleGoToCadastro}
        onAdminLoginClick={handleOpenLogin2}
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
