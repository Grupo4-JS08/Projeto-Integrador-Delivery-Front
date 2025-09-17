/* eslint-disable react-refresh/only-export-components */
// AuthContext.tsx (atualizado para garantir que isMasterAdmin seja tratado corretamente)
import { createContext, useState, useEffect, type ReactNode } from "react";
import { login } from "../services/Service";
import type Usuario from "../models/Usuario";
import type UsuarioLogin from "../models/UsuarioLogin";

interface AuthContextProps {
  usuario: Usuario;
  handleLogout(): void;
  handleLogin(usuarioLogin: UsuarioLogin): Promise<void>;
  isLoading: boolean;
}

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthContext = createContext({} as AuthContextProps);

export function AuthProvider({ children }: AuthProviderProps) {
  const [usuario, setUsuario] = useState<Usuario>(() => {
    // Recupera dados do usuário do localStorage se disponível
    const usuarioSalvo = localStorage.getItem("usuario");
    if (usuarioSalvo) {
      const parsedUsuario = JSON.parse(usuarioSalvo);
      return {
        ...parsedUsuario,
        // Garante que isMasterAdmin seja um booleano
        isMasterAdmin: Boolean(parsedUsuario.isMasterAdmin),
      };
    }
    return {
      id: 0,
      nome: "",
      email: "",
      senha: "",
      objetivo: "geral",
      endereco: "",
      token: "",
      isMasterAdmin: false,
    };
  });

  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(usuarioLogin: UsuarioLogin) {
    setIsLoading(true);
    try {
      // Mude para o endpoint CORRETO: "/usuarios/logar"
      await login("/usuarios/logar", usuarioLogin, (userData: Usuario) => {
        const usuarioCompleto = {
          ...userData,
          isMasterAdmin: Boolean(userData.isMasterAdmin),
        };
        setUsuario(usuarioCompleto);
      });
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      throw error;
    }
    setIsLoading(false);
  }

  function handleLogout() {
    setUsuario({
      id: 0,
      nome: "",
      email: "",
      senha: "",
      objetivo: "geral",
      endereco: "",
      token: "",
      isMasterAdmin: false,
    });
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    window.location.href = "/home"; // Redireciona para a página inicial após logout
  }

  // Salva dados do usuário no localStorage quando mudam
  useEffect(() => {
    if (usuario.token) {
      localStorage.setItem("usuario", JSON.stringify(usuario));
      localStorage.setItem("token", usuario.token);
    }
  }, [usuario]);

  return (
    <AuthContext.Provider
      value={{ usuario, handleLogin, handleLogout, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
}
