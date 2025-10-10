/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  useContext,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { PulseLoader } from "react-spinners";
import { IoMdClose } from "react-icons/io";
import { AiOutlineMail } from "react-icons/ai";
import { FaEye, FaEyeSlash, FaUserPlus, FaUser } from "react-icons/fa";

interface ModalLoginProps {
  isOpen: boolean;
  onClose: () => void;
  onForgotPasswordClick: () => void;
  onOpenCadastro?: () => void; // opcional caso ainda queira redirecionar para modal separado
}

function ModalLogin({
  isOpen,
  onClose,
  onForgotPasswordClick,
}: ModalLoginProps) {
  const { handleLogin } = useContext(AuthContext);
  const dialogRef = useRef<HTMLDivElement | null>(null);

  const [usuarioLogin, setUsuarioLogin] = useState({
    usuario: "",
    senha: "",
  });

  const [loginError, setLoginError] = useState<string | null>(null);
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [modoCadastro, setModoCadastro] = useState(false);

  //Fecha modal com tecla ESC
  useEffect(() => {
    if (!isOpen) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);


  // Atualiza estado do formulário
  useEffect(() => {
    if (isOpen) {
      setUsuarioLogin({ usuario: "", senha: "" });
      setLoginError(null);
      setIsSubmitting(false);
      setMostrarSenha(false);
      setModoCadastro(false);
    }
  }, [isOpen]);

    const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUsuarioLogin((prev) => ({ ...prev, [name]: value }));
    if (loginError) setLoginError(null);
  }

  async function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    setLoginError(null);

    try {
      await handleLogin(usuarioLogin);
      // fecha modal após login bem-sucedido
      onClose();
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data ||
        "Usuário ou senha incorretos. Verifique suas credenciais.";
      setLoginError(errorMessage);
      setIsSubmitting(false);
    }
  }

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[140] flex items-center justify-center bg-black/50 px-4"
      onMouseDown={handleBackdropClick}
      role="dialog"
      aria-modal="true"
    >
      <div
        ref={dialogRef}
        className="relative bg-white rounded-xl p-8 w-full max-w-md shadow-lg"
      >
        {/* Botão Fechar */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-[#0F172A] rounded-full w-8 h-8 flex items-center justify-center text-lg"
          aria-label="Fechar modal"
        >
          <IoMdClose />
        </button>

        {/* Logo */}
        <div className="flex justify-center mb-6">
          <img
            src="/LogomarcaNutriGoal.png"
            alt="Logo NutriGoal"
            className="w-60"
          />
        </div>

        {!modoCadastro ? (
          <>
            <h2 className="text-[#f79009] font-bold text-lg mb-4 text-center">
              Bem-vindo de volta
            </h2>

            {/* Formulário de Login */}
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
                    className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700"
                    disabled={isSubmitting}
                  >
                    {mostrarSenha ? (
                      <FaEyeSlash size={16} />
                    ) : (
                      <FaEye size={16} />
                    )}
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
                {isSubmitting ? (
                  <PulseLoader color="#fff" size={10} />
                ) : (
                  "Entrar"
                )}
              </button>
            </form>

            {/* Links auxiliares */}
            <div className="mt-4 space-y-2 text-center">
              <button
                type="button"
                onClick={onForgotPasswordClick}
                className="text-sm text-[#1e293b] underline hover:text-[#f79009] block w-full"
              >
                Esqueci minha senha
              </button>

              <button
                type="button"
                onClick={() => setModoCadastro(true)}
                className="flex items-center justify-center w-full bg-[#FDF2C3] hover:bg-[#fbe9a1] text-[#1E1E1E] font-semibold py-2 rounded-full text-md transition"
              >
                <FaUserPlus className="mr-2" /> Cadastrar
              </button>
            </div>
          </>
        ) : (
          <>
            {/* Modo de Cadastro Simples */}
            <h2 className="text-[#758250] font-bold text-lg mb-4 text-center">
              Criar Conta
            </h2>

            <div className="text-center mb-4">
              <p className="text-sm text-[#1E1E1E]">
                Ainda não há integração com backend para cadastro aqui.
              </p>
            </div>

            <button
              type="button"
              onClick={() => setModoCadastro(false)}
              className="flex items-center justify-center w-full bg-[#758250] hover:bg-[#606f3d] text-white font-semibold py-2 rounded-full text-md transition"
            >
              <FaUser className="mr-2" /> Voltar ao Login
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default ModalLogin;
