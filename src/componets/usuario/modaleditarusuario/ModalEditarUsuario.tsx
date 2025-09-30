/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, type ChangeEvent, type FormEvent, useContext } from "react";
import { FaExclamationTriangle } from "react-icons/fa";
import { PulseLoader } from "react-spinners";
import { AuthContext } from "../../../contexts/AuthContext";
import type Usuario from "../../../models/Usuario";
import { atualizar, deletar } from "../../../services/Service";
import { IoMdClose } from "react-icons/io";

interface ModalEditarUsuarioProps {
  onClose: () => void;
  usuario: Usuario;
}

export default function ModalEditarUsuario({
  onClose,
  usuario,
}: ModalEditarUsuarioProps) {
  const { handleLogout } = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);
  const [erro, setErro] = useState<string | null>(null);
  const [sucesso, setSucesso] = useState<string | null>(null);
  const [mostrarConfirmacaoExclusao, setMostrarConfirmacaoExclusao] =
    useState(false);
  const [confirmacaoTexto, setConfirmacaoTexto] = useState("");

  const [usuarioEditado, setUsuarioEditado] = useState({
    id: usuario.id,
    nome: usuario.nome || "",
    usuario: usuario.usuario || "",
    endereco: usuario.endereco || "",
    cep: usuario.cep || "",
    objetivo: usuario.objetivo || "geral",
    foto: usuario.foto || "",
    senha: "", // Senha em branco - só atualiza se preenchida
  });

  // Função para buscar endereço pelo CEP
  async function buscarEnderecoPorCep(cep: string) {
    try {
      const cepLimpo = cep.replace(/\D/g, "");

      if (cepLimpo.length === 8) {
        setIsLoading(true);
        const response = await fetch(
          `https://viacep.com.br/ws/${cepLimpo}/json/`
        );
        const dados = await response.json();

        if (!dados.erro) {
          setUsuarioEditado((prev) => ({
            ...prev,
            endereco: `${dados.logradouro}, ${dados.bairro}, ${dados.localidade} - ${dados.uf}`,
          }));
          setErro(null);
        } else {
          setErro("CEP não encontrado");
        }
      }
    } catch (error) {
      console.error("Erro ao buscar CEP:", error);
      setErro("Erro ao buscar CEP. Tente novamente.");
    } finally {
      setIsLoading(false);
    }
  }

  // Função para formatar CEP
  function formatarCEP(cep: string) {
    const cepLimpo = cep.replace(/\D/g, "");
    if (cepLimpo.length <= 5) {
      return cepLimpo;
    }
    return `${cepLimpo.slice(0, 5)}-${cepLimpo.slice(5, 8)}`;
  }

  function atualizarEstado(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) {
    const { name, value } = e.target;

    if (name === "cep") {
      const cepFormatado = formatarCEP(value);
      setUsuarioEditado((prev) => ({ ...prev, [name]: cepFormatado }));

      // Busca endereço automaticamente quando CEP estiver completo
      if (cepFormatado.length === 9) {
        buscarEnderecoPorCep(cepFormatado);
      }
    } else {
      setUsuarioEditado((prev) => ({ ...prev, [name]: value }));
    }

    if (erro) setErro(null);
  }

  async function handleEditarUsuario(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Validação do CEP
    if (usuarioEditado.cep.length !== 9) {
      setErro("CEP deve ter 8 dígitos");
      return;
    }

    setIsLoading(true);
    setErro(null);
    setSucesso(null);

    try {
      // Se a senha estiver em branco, remove do objeto para não atualizar
      const dadosParaEnviar = { ...usuarioEditado };
      if (!dadosParaEnviar.senha) {
        delete dadosParaEnviar.senha;
      }

      await atualizar("/usuarios/atualizar", dadosParaEnviar, {
        headers: { Authorization: `Bearer ${usuario.token}` },
      });

      setSucesso("Perfil atualizado com sucesso!");

      // Fecha o modal após 2 segundos e faz logout para atualizar os dados
      setTimeout(() => {
        onClose();
        handleLogout(); // Faz logout para forçar novo login com dados atualizados
      }, 2000);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data ||
        "Erro ao atualizar perfil. Tente novamente.";
      setErro(errorMessage);
    } finally {
      setIsLoading(false);
    }
  }

  async function handleExcluirConta() {
    if (confirmacaoTexto !== "EXCLUIR MINHA CONTA") {
      setErro("Digite 'EXCLUIR MINHA CONTA' para confirmar a exclusão.");
      return;
    }

    setIsLoading(true);
    setErro(null);

    try {
      await deletar(`/usuarios/${usuario.id}`, {
        headers: { Authorization: `Bearer ${usuario.token}` },
      });

      setSucesso("Conta excluída com sucesso!");

      setTimeout(() => {
        onClose();
        handleLogout(); // Faz logout após excluir a conta
      }, 2000);
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.message ||
        error?.response?.data ||
        "Erro ao excluir conta. Tente novamente.";
      setErro(errorMessage);
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

        <div className="mb-4">
          <img src="/LogoDevLivery.png" alt="Logo" className="mx-auto w-48" />
        </div>

        <h2 className="text-[#f79009] font-bold text-xl mb-4">Editar Perfil</h2>

        {sucesso && (
          <div className="p-3 bg-green-50 border border-green-200 rounded-lg mb-4">
            <p className="text-sm text-green-600 font-medium text-center">
              {sucesso}
            </p>
          </div>
        )}

        {erro && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg mb-4">
            <p className="text-sm text-red-600 font-medium text-center">
              {erro}
            </p>
          </div>
        )}

        {!mostrarConfirmacaoExclusao ? (
          <>
            <form
              onSubmit={handleEditarUsuario}
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
                  value={usuarioEditado.nome}
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
                  value={usuarioEditado.usuario}
                  onChange={atualizarEstado}
                  required
                  disabled={isLoading}
                />
              </div>

              {/* Campo CEP */}
              <div>
                <label className="block text-sm font-medium mb-1">CEP</label>
                <input
                  type="text"
                  name="cep"
                  placeholder="00000-000"
                  className="w-full bg-[#fdf1d4] rounded-full px-4 py-2 border border-transparent focus:border-[#f79009] focus:outline-none"
                  value={usuarioEditado.cep}
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
                  value={usuarioEditado.endereco}
                  onChange={atualizarEstado}
                  required
                  disabled={isLoading}
                />
                <p className="text-xs text-gray-500 mt-1 ml-2">
                  {usuarioEditado.cep.length === 9
                    ? "Endereço preenchido automaticamente pelo CEP"
                    : "O endereço será preenchido automaticamente ao digitar o CEP"}
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Nova Senha (opcional)
                </label>
                <input
                  type="password"
                  name="senha"
                  placeholder="Deixe em branco para manter a senha atual"
                  className="w-full bg-[#fdf1d4] rounded-full px-4 py-2 border border-transparent focus:border-[#f79009] focus:outline-none"
                  value={usuarioEditado.senha}
                  onChange={atualizarEstado}
                  disabled={isLoading}
                />
                <p className="text-xs text-gray-500 mt-1 ml-2">
                  Preencha apenas se desejar alterar a senha
                </p>
              </div>

              <div>
                <label className="block text-sm font-medium mb-1">
                  Objetivo
                </label>
                <select
                  name="objetivo"
                  value={usuarioEditado.objetivo}
                  onChange={atualizarEstado}
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
                {isLoading ? (
                  <PulseLoader color="#fff" size={10} />
                ) : (
                  "Atualizar Perfil"
                )}
              </button>
            </form>

            {/* Botão para excluir conta */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <button
                type="button"
                onClick={() => setMostrarConfirmacaoExclusao(true)}
                className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-semibold py-2 rounded-full transition border border-red-200"
                disabled={isLoading}
              >
                Excluir Minha Conta
              </button>
              <p className="text-xs text-gray-500 mt-2 text-center">
                Esta ação não pode ser desfeita
              </p>
            </div>

            <div className="mt-4">
              <button
                type="button"
                onClick={onClose}
                className="text-sm text-[#1e293b] underline hover:text-[#f79009]"
              >
                Cancelar
              </button>
            </div>
          </>
        ) : (
          /* Modal de confirmação de exclusão */
          <div className="text-left">
            <div className="flex items-center gap-3 mb-4 p-3 bg-red-50 rounded-lg">
              <FaExclamationTriangle className="text-red-500 text-xl" />
              <div>
                <h3 className="font-bold text-red-700">
                  Atenção: Exclusão de Conta
                </h3>
                <p className="text-sm text-red-600">
                  Esta ação é irreversível. Todos os seus dados serão
                  permanentemente excluídos.
                </p>
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium mb-2 text-red-700">
                Digite <strong>EXCLUIR MINHA CONTA</strong> para confirmar:
              </label>
              <input
                type="text"
                value={confirmacaoTexto}
                onChange={(e) => setConfirmacaoTexto(e.target.value)}
                placeholder="EXCLUIR MINHA CONTA"
                className="w-full px-4 py-2 border border-red-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-red-500"
                disabled={isLoading}
              />
            </div>

            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleExcluirConta}
                className="flex-1 bg-red-600 hover:bg-red-700 text-white font-bold py-2 rounded-lg transition disabled:opacity-70"
                disabled={
                  isLoading || confirmacaoTexto !== "EXCLUIR MINHA CONTA"
                }
              >
                {isLoading ? (
                  <PulseLoader color="#fff" size={10} />
                ) : (
                  "Confirmar Exclusão"
                )}
              </button>

              <button
                type="button"
                onClick={() => {
                  setMostrarConfirmacaoExclusao(false);
                  setConfirmacaoTexto("");
                  setErro(null);
                }}
                className="flex-1 bg-gray-300 hover:bg-gray-400 text-gray-700 font-bold py-2 rounded-lg transition"
                disabled={isLoading}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
