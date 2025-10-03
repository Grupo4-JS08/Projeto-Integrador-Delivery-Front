/* eslint-disable @typescript-eslint/no-unused-vars */
import { useContext, useEffect, useState } from "react";
import { FaShoppingCart, FaUser, FaEdit } from "react-icons/fa";
import { Link } from "react-router-dom";
import ModalLogin from "../usuario/modallogin/ModalLogin";
import ModalLogin2 from "../usuario/modallogin2/ModalLogin2";
import ModalCadastro from "../usuario/modalcadastrar/ModalCadastrar";
import ModalRecuperarSenha from "../usuario/Modalrecuperarsenha/ModalRecuperarSenha";
import ModalEditarUsuario from "../usuario/modaleditarusuario/ModalEditarUsuario";
import { AuthContext } from "../../contexts/AuthContext";

function Navbar() {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isLogin2Open, setIsLogin2Open] = useState(false);
  const [isCadastroOpen, setIsCadastroOpen] = useState(false);
  const [isRecuperarSenhaOpen, setIsRecuperarSenhaOpen] = useState(false);
  const [isEditarUsuarioOpen, setIsEditarUsuarioOpen] = useState(false);
  const { usuario, handleLogout } = useContext(AuthContext);

  const closeAllModals = () => {
    setIsLoginOpen(false);
    setIsLogin2Open(false);
    setIsCadastroOpen(false);
    setIsRecuperarSenhaOpen(false);
    setIsEditarUsuarioOpen(false);
  };

  // Scroll lock no <body> quando algum modal está aberto
  useEffect(() => {
    const anyOpen = isLoginOpen || isLogin2Open || isCadastroOpen || isRecuperarSenhaOpen || isEditarUsuarioOpen;
    document.body.classList.toggle("overflow-hidden", anyOpen);
    return () => document.body.classList.remove("overflow-hidden");
  }, [isLoginOpen, isLogin2Open, isCadastroOpen, isRecuperarSenhaOpen, isEditarUsuarioOpen]);

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

  const handleOpenRecuperarSenha = () => {
    closeAllModals();
    setIsRecuperarSenhaOpen(true);
  };
  const handleCloseRecuperarSenha = () => setIsRecuperarSenhaOpen(false);

  const handleOpenEditarUsuario = () => {
    closeAllModals();
    setIsEditarUsuarioOpen(true);
  };
  const handleCloseEditarUsuario = () => setIsEditarUsuarioOpen(false);

  // Fluxos a partir do ModalLogin (passo 1)
  const handleGoToLogin2 = () => {
    setIsLoginOpen(false);
    setIsLogin2Open(true);
  };

  const handleGoToCadastro = () => {
    setIsLoginOpen(false);
    setIsCadastroOpen(true);
  };

  // Fluxo do ModalLogin2 para ModalCadastro
  const handleGoToCadastroFromLogin2 = () => {
    setIsLogin2Open(false);
    setIsCadastroOpen(true);
  };

  // Fluxo do ModalLogin2 para Recuperar Senha
  const handleGoToRecuperarSenhaFromLogin2 = () => {
    setIsLogin2Open(false);
    setIsRecuperarSenhaOpen(true);
  };

  // Fluxo do Recuperar Senha para Login2
  const handleBackToLoginFromRecuperarSenha = () => {
    setIsRecuperarSenhaOpen(false);
    setIsLogin2Open(true);
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
            <img
              src="/logo.png"
              alt="Logo DevLivery"
              className="h-auto max-w-60"
            />
          </Link>

          {/* MENU */}
          <div className="flex items-center space-x-6">
            {usuario.token ? (
              <div className="flex items-center space-x-3">
                <span  className="flex items-center space-x-2 px-4 py-2  text-[#FF9800] font-semibold text-xl hover:opacity-90 transition">
                  Olá, {usuario.nome}
                </span>
            {/* Ofertas + Contato */}
            <div className="flex rounded-full overflow-hidden border border-gray-200">
              <Link
                to="/ofertas"
                className="px-4 py-2 bg-[#7E8C54] text-white font-semibold text-sm hover:opacity-70 transition rounded-l-full text-center"
              >
                Ofertas
              </Link>
              <Link
                to="/contato"
                className="px-4 py-2 bg-[#FFF5DC] text-black font-semibold text-sm hover:opacity-70 transition rounded-r-full"
              >
                Contato
              </Link>
            </div>
            {/* Botão de Login/Logout */}

                {/* Botão Editar Perfil */}
                <button
                  type="button"
                  onClick={handleOpenEditarUsuario}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full bg-[#7E8C54] text-white font-semibold text-sm hover:opacity-90 transition"
                >
                  <FaEdit />
                  <span>Editar Perfil</span>
                </button>

                {/* Botão Sair */}
                <button
                  type="button"
                  onClick={handleLogoutClick}
                  className="flex items-center space-x-2 px-4 py-2 rounded-full bg-[#FF9800] text-black font-semibold text-sm hover:opacity-90 transition"
                >
                  <FaUser />
                  <span>Sair</span>
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={handleOpenLogin}
                className="cursor-pointer flex items-center space-x-2 px-5 py-2 rounded-full bg-[#FF9800] text-black font-semibold text-sm hover:opacity-70 transition"
              >
                <FaUser />
                <span>Login</span>
              </button>
            )}
            <Link to="/carrinho">
              <FaShoppingCart className="text-orange text-2xl cursor-pointer hover:opacity-70 transition " />
            </Link>
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
        onForgotPasswordClick={handleOpenRecuperarSenha}
      />

      {/* ModalLogin2 (form de login) */}
      {isLogin2Open && (
        <ModalLogin2
          onClose={handleCloseLogin2}
          onRegisterClick={handleGoToCadastroFromLogin2}
          onForgotPasswordClick={handleGoToRecuperarSenhaFromLogin2}
        />
      )}

      {/* ModalCadastro */}
      {isCadastroOpen && (
        <ModalCadastro
          onClose={handleCloseCadastro}
          onOpenLogin={handleOpenLogin2}
        />
      )}

      {/* ModalRecuperarSenha */}
      {isRecuperarSenhaOpen && (
        <ModalRecuperarSenha
          onClose={handleCloseRecuperarSenha}
          onBackToLogin={handleBackToLoginFromRecuperarSenha}
        />
      )}

      {/* ModalEditarUsuario */}
      {isEditarUsuarioOpen && (
        <ModalEditarUsuario
          onClose={handleCloseEditarUsuario}
          usuario={usuario}
        />
      )}
    </>
  );
}

export default Navbar;
