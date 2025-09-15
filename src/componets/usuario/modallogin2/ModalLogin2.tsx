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
}

export default function ModalLogin2({ onClose }: ModalLogin2Props) {
  const { usuario, handleLogin, isLoading, erro } = useContext(AuthContext);
  const [usuarioLogin, setUsuarioLogin] = useState({
    email: "",
    senha: "",
  });
  const [mostrarSenha, setMostrarSenha] = useState(false);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuarioLogin({ ...usuarioLogin, [e.target.name]: e.target.value });
  }

  function login(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    handleLogin(usuarioLogin);
  }

  useEffect(() => {
    if (usuario.token !== "") {
      onClose(); 
    }
  }, [usuario]);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
      <div className="bg-white rounded-xl p-8 w-full max-w-md relative text-center shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-black rounded-full w-8 h-8 flex items-center justify-center text-lg"
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

        <h2 className="text-[#f79009] font-bold text-lg mb-4">
          Bem vindo de volta
        </h2>

        <form onSubmit={login} className="space-y-4">
          <div className="relative">
            <input
              type="text"
              name="email"
              placeholder="Email"
              value={usuarioLogin.email} // ✅ correto
              onChange={atualizarEstado}
            />

            <AiOutlineMail className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-700" />
          </div>

          <div className="relative">
            <input
              type={mostrarSenha ? "text" : "password"}
              name="senha"
              placeholder="Senha"
              value={usuarioLogin.senha}
              onChange={atualizarEstado}
              className="w-full px-4 py-2 pr-10 bg-[#c8cfac] text-sm rounded-full focus:outline-none"
            />
            <button
              type="button"
              onClick={() => setMostrarSenha(!mostrarSenha)}
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-700"
            >
              {mostrarSenha ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {erro && (
            <p className="text-sm text-[#EAAA00] font-medium">
              Usuário ou senha incorreto!
            </p>
          )}

          <button
            type="submit"
            className="w-full bg-[#f79009] hover:bg-[#e28200] text-white font-bold py-2 rounded-full transition"
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
