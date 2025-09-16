import { useContext, useEffect, useState, type ChangeEvent, type FormEvent, useCallback } from "react";
import { AuthContext } from "../../../contexts/AuthContext";
import { PulseLoader } from "react-spinners";
import { IoMdClose } from "react-icons/io";
import { AiOutlineMail } from "react-icons/ai";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 

interface ModalLogin2Props {
  onClose: () => void;
}

function ModalLogin2({ onClose }: ModalLogin2Props) {
  const { usuario, handleLogin, isLoading } = useContext(AuthContext);
  const navigate = useNavigate(); 

  const [usuarioLogin, setUsuarioLogin] = useState({
    usuario: "",
    senha: "",
  });

  const [hasSubmitted, setHasSubmitted] = useState(false);
  const [loginError, setLoginError] = useState<string | null>(null);
  const [mostrarSenha, setMostrarSenha] = useState(false);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setUsuarioLogin((prev) => ({ ...prev, [name]: value }));
  }

  async function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setHasSubmitted(true);
    setLoginError(null); 
    await handleLogin(usuarioLogin);
  }

  useEffect(() => {
    if (!hasSubmitted) return;

    if (!isLoading) {
      if (usuario.token && usuario.token.trim() !== "") {
        
        navigate('/home2'); 
        onClose();
      } else {
        
        setLoginError("Usuário ou senha incorretos.");
      }
    }
  }, [usuario?.token, isLoading, hasSubmitted, onClose, navigate]); 

  useEffect(() => {
    const onKey = (ev: KeyboardEvent) => {
      if (ev.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const handleBackdropClick = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  return (
    <div
      className="fixed inset-0 z-[140] flex items-center bg-black/50 justify-center bg-opacity-60"
      onMouseDown={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="modal-login2-title"
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
            className="mx-auto w-40"
          />
        </div>

        <h2 id="modal-login2-title" className="text-[#f79009] font-bold text-lg mb-4">
          Bem-vindo de volta
        </h2>

        <form onSubmit={login} className="space-y-4 text-left">
          <div className="relative">
            <input
              type="email"
              name="usuario"
              placeholder="Email"
              value={usuarioLogin.usuario}
              onChange={atualizarEstado}
              className="w-full px-4 py-2 pr-10 bg-[#c8cfac] text-sm rounded-full focus:outline-none"
              required
            />
            <AiOutlineMail
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-700 pointer-events-none"
              aria-hidden
            />
          </div>

          <div className="relative">
            <input
              type={mostrarSenha ? "text" : "password"}
              name="senha"
              placeholder="Senha"
              value={usuarioLogin.senha}
              onChange={atualizarEstado}
              className="w-full px-4 py-2 pr-10 bg-[#c8cfac] text-sm rounded-full focus:outline-none"
              required
              minLength={6}
            />
            <button
              type="button"
              onClick={() => setMostrarSenha((v) => !v)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-700"
              aria-label={mostrarSenha ? "Ocultar senha" : "Mostrar senha"}
              aria-pressed={mostrarSenha}
            >
              {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {loginError && (
            <p className="text-sm text-[#EAAA00] font-medium">
              {loginError}
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-[#f79009] hover:bg-[#e28200] text-white font-bold py-2 rounded-full transition disabled:opacity-70"
            disabled={isLoading}
          >
            {isLoading ? <PulseLoader color="#fff" size={10} /> : "Logar"}
          </button>
        </form>

        <p className="text-sm mt-4 underline text-[#1e293b] cursor-pointer hover:text-[#f79009]">
          Esqueci a senha
        </p>
      </div>
    </div>
  );
}

export default ModalLogin2;
