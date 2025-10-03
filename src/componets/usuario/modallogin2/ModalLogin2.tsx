/* eslint-disable @typescript-eslint/no-explicit-any */

import {
  useContext,
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { PulseLoader } from "react-spinners";
import { IoMdClose } from "react-icons/io";
import { AiOutlineMail } from "react-icons/ai";
import { FaEye, FaEyeSlash } from "react-icons/fa";

interface ModalLogin2Props {
  onClose: () => void;
  onRegisterClick: () => void;
  onForgotPasswordClick: () => void; // Nova prop para recuperação de senha
}

function ModalLogin2({
  onClose,
  onRegisterClick,
  onForgotPasswordClick,
}: ModalLogin2Props) {
  const { handleLogin } = useContext(AuthContext);

  const [usuarioLogin, setUsuarioLogin] = useState({
    usuario: "",
    senha: "",
  });

  const [loginError, setLoginError] = useState<string | null>(null);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUsuarioLogin((prev) => ({ ...prev, [name]: value }));
    if (loginError) {
      setLoginError(null);
    }
  }

  async function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setLoginError(null);

    console.log("Tentando logar com:", usuarioLogin);

    try {
      await handleLogin(usuarioLogin);
      // O redirecionamento agora acontece dentro do handleLogin
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data ||
        "Usuário ou senha incorretos. Verifique suas credenciais.";
      setLoginError(errorMessage);
      setIsSubmitting(false);
    }
  }
  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[140] flex items-center bg-black/50 justify-center"
      onMouseDown={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div className="bg-white rounded-xl p-8 w-full max-w-md relative text-center shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-black rounded-full w-8 h-8 flex items-center justify-center text-lg"
          aria-label="Fechar"
        >
          <IoMdClose />
        </button>

        <div className="mb-2">
          <img
            src="/LogoDevLivery.png"
            alt="Logo DevLivery"
            className="mx-auto w-60"
          />
        </div>

        <h2 className="text-[#f79009] font-bold text-lg mb-4">
          Bem-vindo de volta
        </h2>

        <form onSubmit={login} className="space-y-4 text-left">
          <div className="relative">
            <label className="block text-sm font-medium mb-1">Email</label>
            <div className="relative">
              <input
                type="email"
                name="usuario"
                placeholder="seu.email@exemplo.com"
                value={usuarioLogin.usuario}
                onChange={atualizarEstado}
                className="w-full px-10 py-2 bg-[#c8cfac] text-sm rounded-full focus:outline-none"
                required
                disabled={isSubmitting}
              />
              <AiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700" />
            </div>
          </div>

          <div className="relative">
            <label className="block text-sm font-medium mb-1">Senha</label>
            <div className="relative">
              <input
                type={mostrarSenha ? "text" : "password"}
                name="senha"
                placeholder="Digite sua senha"
                value={usuarioLogin.senha}
                onChange={atualizarEstado}
                className="w-full px-10 py-2 bg-[#c8cfac] text-sm rounded-full focus:outline-none"
                required
                minLength={6}
                disabled={isSubmitting}
              />
              <button
                type="button"
                onClick={() => setMostrarSenha((v) => !v)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-700"
                disabled={isSubmitting}
              >
                {mostrarSenha ? <FaEyeSlash size={16} /> : <FaEye size={16} />}
              </button>
            </div>
          </div>

          {loginError && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-sm text-red-600 font-medium text-center">
                {loginError}
              </p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#f79009] hover:bg-[#e28200] text-white font-bold py-2 rounded-full transition disabled:opacity-70"
            disabled={isSubmitting}
          >
            {isSubmitting ? <PulseLoader color="#fff" size={10} /> : "Logar"}
          </button>
        </form>

        <div className="mt-4 space-y-2">
          <button
            type="button"
            onClick={onForgotPasswordClick}
            className="text-sm text-[#1e293b] underline hover:text-[#f79009] block w-full"
          >
            Esqueci minha senha
          </button>

          <p className="text-sm text-[#1e293b]">
            Não tem conta?{" "}
            <button
              type="button"
              onClick={onRegisterClick}
              className="underline hover:text-[#f79009]"
            >
              Cadastre-se
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ModalLogin2;
