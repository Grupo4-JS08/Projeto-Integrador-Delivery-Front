// src/components/modal/ModalLogin.tsx
import React, { useEffect, useRef } from "react";
import { FaUser, FaUserPlus, FaUserShield } from "react-icons/fa";

export type ModalLoginProps = {
  /** controla se o modal aparece */
  isOpen: boolean;
  /** fecha o modal */
  onClose: () => void;
  /** abre o ModalLogin2 (etapa de login) */
  onLoginClick: () => void;
  /** abre o ModalCadastro (etapa de cadastro) */
  onRegisterClick: () => void;
  /** abre o ModalLogin2 em modo admin */
  onAdminLoginClick: () => void;
};

const ModalLogin: React.FC<ModalLoginProps> = ({
  isOpen,
  onClose,
  onLoginClick,
  onRegisterClick,
  onAdminLoginClick,
}) => {
  const dialogRef = useRef<HTMLDivElement | null>(null);

  // Fecha com tecla ESC
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  // Fecha clicando fora do card (backdrop)
  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[120] bg-black/50 flex items-center justify-center px-4"
      onMouseDown={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-login-title"
    >
      <div
        ref={dialogRef}
        className="relative bg-white rounded-xl p-6 max-w-md w-full shadow-lg"
      >
        {/* Fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-[#0F172A] rounded-full w-8 h-8 flex items-center justify-center text-lg"
          aria-label="Fechar modal"
        >
          &times;
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/LogoDevLivery.png"
            alt="DevLivery Logo"
            className="w-40"
          />
        </div>

        {/* Título (para acessibilidade, ligado ao aria-labelledby) */}
        <h2 id="modal-login-title" className="sr-only">
          Entrar ou cadastrar
        </h2>

        {/* Botão Login -> abre ModalLogin2 */}
        <button
          type="button"
          onClick={onLoginClick}
          className="flex items-center justify-center w-full bg-[#758250] hover:bg-[#606f3d] text-white font-semibold py-3 rounded-full text-lg transition mb-4"
        >
          <FaUser className="mr-2" />
          Login
        </button>

             {/* Botão Login Admin */}
        <button
          type="button"
          onClick={onAdminLoginClick}
          className="flex items-center justify-center w-full bg-[#FF9800] hover:bg-[#e68900] text-white font-semibold py-3 rounded-full text-lg transition mb-4"
        >
          <FaUserShield className="mr-2" />
          Login Administrador
        </button>

        {/* Botão Cadastrar -> abre ModalCadastro */}
        <button
          type="button"
          onClick={onRegisterClick}
          className="flex items-center justify-center w-full bg-[#FDF2C3] hover:bg-[#fbe9a1] text-[#1E1E1E] font-semibold py-3 rounded-full text-lg transition mb-4"
        >
          <FaUserPlus className="mr-2" />
          Cadastrar
        </button>

        {/* Links auxiliares */}
        <div className="text-center space-y-2">
          <button
            type="button"
            className="text-sm text-[#1E1E1E] underline hover:text-orange-600"
            onClick={() => {
              // aqui você pode acionar um fluxo de recuperação de senha
              // ex.: navegar para "/recuperar-senha" ou abrir outro modal
              // navigate("/recuperar-senha");
            }}
          >
            Esqueci a senha
          </button>

          {/* exemplo de link secundário para cadastro (opcional) */}
          {/* <div>
            <span className="text-sm text-[#1E1E1E]">Não tem conta? </span>
            <button
              type="button"
              onClick={onRegisterClick}
              className="text-sm underline text-[#1E1E1E] hover:text-orange-600"
            >
              Cadastre-se
            </button>
          </div> */}
        </div>
      </div>
    </div>
  );
};

export default ModalLogin;
