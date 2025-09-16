/* eslint-disable react-hooks/exhaustive-deps */
import {
  useEffect,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import { IoMdClose } from "react-icons/io";
import { PulseLoader } from "react-spinners";
import { cadastrarUsuario } from "../../../services/Service";
import type Usuario from "../../../models/Usuario";

interface ModalCadastroProps {
  onClose: () => void;
}

export default function ModalCadastro({ onClose }: ModalCadastroProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const [usuario, setUsuario] = useState<Usuario>({
    id: 0,
    nome: "",
    email: "",
    senha: "",
    objetivo: "geral", // Valor padrão
    endereco: "",
    token: "",
  });

  useEffect(() => {
    if (usuario.id !== 0) {
      onClose();
    }
  }, [usuario]);

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    setUsuario({
      ...usuario,
      [e.target.name]: e.target.value,
    });
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value);
  }

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    // Garante que o valor seja um dos tipos permitidos
    const value = e.target.value as "emagrecer" | "hipertrofia" | "geral";
    setUsuario({
      ...usuario,
      objetivo: value,
    });
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (confirmarSenha === usuario.senha && usuario.senha.length >= 8) {
      setIsLoading(true);
      try {
        await cadastrarUsuario("/usuarios/cadastrar", usuario, setUsuario);
      } catch (error) {
        console.error("Erro ao cadastrar:", error);
      }
      setIsLoading(false);
    } else {
      setUsuario({ ...usuario, senha: "" });
      setConfirmarSenha("");
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 bg-opacity-60">
      <div className="bg-white rounded-xl p-8 w-full max-w-lg relative text-center shadow-xl overflow-y-auto max-h-[95vh]">

        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-black rounded-full w-8 h-8 flex items-center justify-center text-lg"
        >
          <IoMdClose />
        </button>

        <div className="mb-2">
          <img src="/LogoDevLivery.png" alt="Logo" className="mx-auto w-40" />
        </div>

        <h2 className="text-[#f79009] font-bold text-xl mb-4">Crie seu cadastro</h2>

        <form onSubmit={cadastrarNovoUsuario} className="space-y-4 text-left font-medium">
          <div>
            <label htmlFor="nome">Nome Completo</label>
            <input
              type="text"
              id="nome"
              name="nome"
              placeholder="Nome"
              className="w-full bg-[#fdf1d4] rounded-full px-4 py-2 mt-1"
              value={usuario.nome}
              onChange={atualizarEstado}
              required
            />
          </div>

          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              className="w-full bg-[#fdf1d4] rounded-full px-4 py-2 mt-1"
              value={usuario.email}
              onChange={atualizarEstado}
              required
            />
          </div>

          <div>
            <label htmlFor="senha">Senha</label>
            <input
              type="password"
              id="senha"
              name="senha"
              placeholder="Senha"
              className="w-full bg-[#fdf1d4] rounded-full px-4 py-2 mt-1"
              value={usuario.senha}
              onChange={atualizarEstado}
              required
              minLength={8}
            />
            <p className="text-xs text-gray-500 mt-1 ml-2">
              A senha deve conter no mínimo 8 dígitos
            </p>
          </div>

          <div>
            <label htmlFor="confirmarSenha">Confirme sua senha</label>
            <input
              type="password"
              id="confirmarSenha"
              name="confirmarSenha"
              placeholder="Confirmar senha"
              className="w-full bg-[#fdf1d4] rounded-full px-4 py-2 mt-1"
              value={confirmarSenha}
              onChange={handleConfirmarSenha}
              required
            />
          </div>

          <div>
            <label htmlFor="endereco">Endereço/Número</label>
            <input
              type="text"
              id="endereco"
              name="endereco"
              placeholder="Rua Exemplo, 123"
              className="w-full bg-[#fdf1d4] rounded-full px-4 py-2 mt-1"
              value={usuario.endereco}
              onChange={atualizarEstado}
              required
            />
          </div>

          <div className="flex gap-2">
            <div className="w-1/2">
              <label htmlFor="cep">CEP</label>
              <input
                type="text"
                id="cep"
                name="cep"
                placeholder="CEP"
                className="w-full bg-[#fdf1d4] rounded-full px-4 py-2 mt-1"
              />
            </div>

            <div className="w-1/2">
              <label htmlFor="complemento">Complemento</label>
              <input
                type="text"
                id="complemento"
                name="complemento"
                placeholder="Complemento"
                className="w-full bg-[#fdf1d4] rounded-full px-4 py-2 mt-1"
              />
            </div>
          </div>

          <div>
            <label htmlFor="objetivo">Objetivo</label>
            <select
              id="objetivo"
              name="objetivo"
              value={usuario.objetivo}
              onChange={handleChange}
              className="w-full bg-[#fdf1d4] rounded-full px-4 py-2 mt-1"
              required
            >
              <option value="emagrecer">Emagrecer</option>
              <option value="hipertrofia">Hipertrofia</option>
              <option value="geral">Geral</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#f79009] hover:bg-[#e28200] text-white font-bold py-2 rounded-full transition mt-4"
            disabled={isLoading}
          >
            {isLoading ? <PulseLoader color="#fff" size={10} /> : "Cadastrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
