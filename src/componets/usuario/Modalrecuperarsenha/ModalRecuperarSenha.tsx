/* eslint-disable @typescript-eslint/no-explicit-any */
// ModalRecuperarSenha.tsx (atualizado)
import { useState, type ChangeEvent, type FormEvent } from "react";
import { IoMdClose } from "react-icons/io";
import { PulseLoader } from "react-spinners";
import { AiOutlineMail } from "react-icons/ai";
import { cadastrar } from "../../../services/Service"; // ou importe sua service

interface ModalRecuperarSenhaProps {
  onClose: () => void;
  onBackToLogin: () => void;
}

function ModalRecuperarSenha({
  onClose,
  onBackToLogin,
}: ModalRecuperarSenhaProps) {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState<{
    type: "success" | "error";
    text: string;
  } | null>(null);

  async function handleRecuperarSenha(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setMessage(null);

    try {
      // Usando a service existente
      const response = await cadastrar("/usuarios/recuperar-senha", { email });

      setMessage({
        type: "success",
        text:
          response.message ||
          "Enviamos um código de recuperação para seu email. Verifique sua caixa de entrada.",
      });
    } catch (error: any) {
      console.error("Erro ao recuperar senha:", error);

      // Se for 404, o endpoint ainda não foi implementado
      if (error.response?.status === 404) {
        setMessage({
          type: "error",
          text: "Funcionalidade em desenvolvimento. Entre em contato com o suporte.",
        });
      } else {
        setMessage({
          type: "error",
          text:
            error.response?.data?.message ||
            "Erro ao enviar código. Tente novamente.",
        });
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-[150] flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl p-8 w-full max-w-md relative text-center shadow-lg">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-black rounded-full w-8 h-8 flex items-center justify-center text-lg"
          aria-label="Fechar"
        >
          <IoMdClose />
        </button>

        <div className="mb-4">
          <img
            src="/LogoDevLivery.png"
            alt="Logo DevLivery"
            className="mx-auto w-48"
          />
        </div>

        <h2 className="text-[#f79009] font-bold text-lg mb-2">
          Recuperar Senha
        </h2>

        <p className="text-sm text-gray-600 mb-6">
          Digite seu email para receber um código de recuperação
        </p>

        <form onSubmit={handleRecuperarSenha} className="space-y-4 text-left">
          <div className="relative">
            <label className="block text-sm font-medium mb-1">Email</label>
            <div className="relative">
              <input
                type="email"
                value={email}
                onChange={(e: ChangeEvent<HTMLInputElement>) =>
                  setEmail(e.target.value)
                }
                placeholder="seu.email@exemplo.com"
                className="w-full px-10 py-2 bg-[#c8cfac] text-sm rounded-full focus:outline-none"
                required
                disabled={isLoading}
              />
              <AiOutlineMail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700" />
            </div>
          </div>

          {message && (
            <div
              className={`p-3 rounded-lg ${
                message.type === "success"
                  ? "bg-green-50 border border-green-200 text-green-600"
                  : "bg-red-50 border border-red-200 text-red-600"
              }`}
            >
              <p className="text-sm font-medium text-center">{message.text}</p>
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-[#f79009] hover:bg-[#e28200] text-white font-bold py-2 rounded-full transition disabled:opacity-70"
            disabled={isLoading}
          >
            {isLoading ? (
              <PulseLoader color="#fff" size={10} />
            ) : (
              "Enviar Código"
            )}
          </button>
        </form>

        <div className="mt-4">
          <button
            type="button"
            onClick={onBackToLogin}
            className="text-sm text-[#1e293b] underline hover:text-[#f79009]"
          >
            Voltar para o login
          </button>
        </div>
      </div>
    </div>
  );
}

export default ModalRecuperarSenha;
