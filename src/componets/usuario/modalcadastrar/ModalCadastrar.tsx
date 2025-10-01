/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, type ChangeEvent, type FormEvent } from "react";
import { IoMdClose } from "react-icons/io";
import { PulseLoader } from "react-spinners";
import { cadastrarUsuario } from "../../../services/Service";
import type Usuario from "../../../models/Usuario";

interface ModalCadastroProps {
  onClose: () => void;
  onOpenLogin: () => void;
}

export default function ModalCadastro({
  onClose,
  onOpenLogin,
}: ModalCadastroProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [cadastroError, setCadastroError] = useState<string | null>(null);
  const [cadastroSuccess, setCadastroSuccess] = useState<string | null>(null);

  const [usuario, setUsuario] = useState<Usuario>({
    nome: "",
    usuario: "",
    senha: "",
    objetivo: "geral",
    endereco: "",
    cep: "",
    token: "",
    foto: "teste.jpg",
  });

  // Função para buscar endereço pelo CEP
  async function buscarEnderecoPorCep(cep: string) {
    try {
      const cepLimpo = cep.replace(/\D/g, '');

      if (cepLimpo.length === 8) {
        setIsLoading(true);
        const response = await fetch(`https://viacep.com.br/ws/${cepLimpo}/json/`);
        const dados = await response.json();

        if (!dados.erro) {
          setUsuario(prev => ({
            ...prev,
            endereco: `${dados.logradouro}, ${dados.bairro}, ${dados.localidade} - ${dados.uf}`
          }));
          setCadastroError(null);
        } else {
          setCadastroError("CEP não encontrado");
        }
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      setCadastroError("Erro ao buscar CEP. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  // Função para formatar CEP
  function formatarCEP(cep: string) {
    const cepLimpo = cep.replace(/\D/g, '');
    if (cepLimpo.length <= 5) {
      return cepLimpo;
    }
    return `${cepLimpo.slice(0, 5)}-${cepLimpo.slice(5, 8)}`;
  }

  function atualizarEstado(e: ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;

    if (name === 'cep') {
      const cepFormatado = formatarCEP(value);
      setUsuario((prev) => ({ ...prev, [name]: cepFormatado }));

      // Busca endereço automaticamente quando CEP estiver completo
      if (cepFormatado.length === 9) {
        buscarEnderecoPorCep(cepFormatado);
      }
    } else {
      setUsuario((prev) => ({ ...prev, [name]: value }));
    }

    if (cadastroError) setCadastroError(null);
  }

  function handleConfirmarSenha(e: ChangeEvent<HTMLInputElement>) {
    setConfirmarSenha(e.target.value);
    if (cadastroError) setCadastroError(null);
  }

  function handleChange(e: ChangeEvent<HTMLSelectElement>) {
    const value = e.target.value as "emagrecer" | "hipertrofia" | "geral";
    setUsuario((prev) => ({ ...prev, objetivo: value }));
  }

  async function cadastrarNovoUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Validação do CEP
    if (usuario.cep && usuario.cep.length !== 9) {
      setCadastroError("CEP deve ter 8 dígitos");
      return;
    }

    if (usuario.senha.length < 8) {
      setCadastroError("A senha deve conter no mínimo 8 dígitos");
      return;
    }
    if (confirmarSenha !== usuario.senha) {
      setCadastroError("As senhas não coincidem");
      return;
    }

    setIsLoading(true);
    setCadastroError(null);
    setCadastroSuccess(null);

    try {
      await cadastrarUsuario("/usuarios/cadastrar", usuario, () => {});

      setCadastroSuccess("Cadastro realizado com sucesso! Abrindo login...");

      setUsuario({
        nome: "",
        usuario: "",
        senha: "",
        objetivo: "geral",
        endereco: "",
        cep: "",
        token: "",
        foto: "teste.jpg",
      });
      setConfirmarSenha("");

      setTimeout(() => {
        onClose();
        onOpenLogin();
      }, 600);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data ||
        "Erro ao cadastrar usuário. Verifique os dados e tente novamente.";
      setCadastroError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-xl p-8 w-full max-w-lg relative text-center shadow-xl overflow-y-auto max-h-[95vh]">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white bg-black rounded-full w-8 h-8 flex items-center justify-center text-lg"
        >
          <IoMdClose />
        </button>

        <div className="mb-2">
          <img src="/LogoDevLivery.png" alt="Logo" className="mx-auto w-60" />
        </div>

        <h2 className="text-[#f79009] font-bold text-xl mb-4">
          Crie seu cadastro
        </h2>

        {cadastroSuccess && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg mb-4">
            <p className="text-sm text-green-600 font-medium text-center">
              {cadastroSuccess}
            </p>
          </div>
        )}

        {cadastroError && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
            <p className="text-sm text-red-600 font-medium text-center">
              {cadastroError}
            </p>
          </div>
        )}

        <form
          onSubmit={cadastrarNovoUsuario}
          className="space-y-4 text-left font-medium"
        >
          <div>
            <label className="block text-sm font-medium mb-1">
              Nome Completo
            </label>
            <input
              type="text"
              name="nome"
              placeholder="Seu nome completo"
              className="w-full bg-[#fdf1d4] rounded-full px-4 py-2 border border-transparent focus:border-[#f79009] focus:outline-none"
              value={usuario.nome}
              onChange={atualizarEstado}
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="usuario"
              placeholder="seu.email@exemplo.com"
              className="w-full bg-[#fdf1d4] rounded-full px-4 py-2 border border-transparent focus:border-[#f79009] focus:outline-none"
              value={usuario.usuario}
              onChange={atualizarEstado}
              required
              disabled={isLoading}
            />
          </div>

          {/* CAMPO CEP */}
          <div>
            <label className="block text-sm font-medium mb-1">CEP</label>
            <input
              type="text"
              name="cep"
              placeholder="00000-000"
              className="w-full bg-[#fdf1d4] rounded-full px-4 py-2 border border-transparent focus:border-[#f79009] focus:outline-none"
              value={usuario.cep}
              onChange={atualizarEstado}
              required
              disabled={isLoading}
              maxLength={9}
            />
            <p className="text-xs text-gray-500 mt-1 ml-2">
              Digite o CEP para preencher automaticamente o endereço
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Endereço Completo
            </label>
            <input
              type="text"
              name="endereco"
              placeholder="Rua, número, bairro, cidade - estado"
              className="w-full bg-[#fdf1d4] rounded-full px-4 py-2 border border-transparent focus:border-[#f79009] focus:outline-none"
              value={usuario.endereco}
              onChange={atualizarEstado}
              required
              disabled={isLoading}
            />
            <p className="text-xs text-gray-500 mt-1 ml-2">
              {usuario.cep.length === 9 ? "Endereço preenchido automaticamente pelo CEP" : "O endereço será preenchido automaticamente ao digitar o CEP"}
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Senha</label>
            <input
              type="password"
              name="senha"
              placeholder="Mínimo 8 caracteres"
              className="w-full bg-[#fdf1d4] rounded-full px-4 py-2 border border-transparent focus:border-[#f79009] focus:outline-none"
              value={usuario.senha}
              onChange={atualizarEstado}
              required
              minLength={8}
              disabled={isLoading}
            />
            <p className="text-xs text-gray-500 mt-1 ml-2">
              A senha deve conter no mínimo 8 dígitos
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Confirme sua senha
            </label>
            <input
              type="password"
              placeholder="Digite a senha novamente"
              className="w-full bg-[#fdf1d4] rounded-full px-4 py-2 border border-transparent focus:border-[#f79009] focus:outline-none"
              value={confirmarSenha}
              onChange={handleConfirmarSenha}
              required
              disabled={isLoading}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Objetivo</label>
            <select
              value={usuario.objetivo}
              onChange={handleChange}
              className="w-full bg-[#fdf1d4] rounded-full px-4 py-2 border border-transparent focus:border-[#f79009] focus:outline-none"
              required
              disabled={isLoading}
            >
              <option value="emagrecer">Emagrecer</option>
              <option value="hipertrofia">Hipertrofia</option>
              <option value="geral">Geral</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-[#f79009] hover:bg-[#e28200] text-white font-bold py-2 rounded-full transition mt-4 disabled:opacity-70"
            disabled={isLoading}
          >
            {isLoading ? <PulseLoader color="#fff" size={10} /> : "Cadastrar"}
          </button>
        </form>

        <p className="text-sm mt-4 text-[#1e293b]">
          Já tem conta?{" "}
          <button
            type="button"
            className="underline hover:text-[#f79009]"
            onClick={() => {
              onClose();
              onOpenLogin();
            }}
          >
            Faça login
          </button>
        </p>
      </div>
    </div>
  );
}
