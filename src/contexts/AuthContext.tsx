/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, type ReactNode } from "react";
import { login } from "../services/Service";
import type Usuario from "../models/Usuario";
import type UsuarioLogin from "../models/UsuarioLogin";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate();

  const [usuario, setUsuario] = useState<Usuario>(() => {
    const usuarioSalvo = localStorage.getItem("usuario");
    if (usuarioSalvo) {
      const parsedUsuario = JSON.parse(usuarioSalvo);
      return {
        ...parsedUsuario,
        isMasterAdmin: Boolean(parsedUsuario.isMasterAdmin),
      };
    }
    return {
      id: 0,
      nome: "",
      usuario: "",
      senha: "",
      objetivo: "geral",
      endereco: "",
      token: "",
      foto: "",
      isMasterAdmin: false,
    };
  });

  const [isLoading, setIsLoading] = useState(false);

  async function handleLogin(usuarioLogin: UsuarioLogin) {
    setIsLoading(true);
    try {
      const userData = await login(
        "/usuarios/logar",
        usuarioLogin,
        (userData: Usuario) => {
          const usuarioCompleto: Usuario = {
            ...userData,
            isMasterAdmin: Boolean(userData.isMasterAdmin),
          };

          setUsuario(usuarioCompleto);
          console.log("Login bem-sucedido:", usuarioCompleto);

          // 🔹 Redirecionamento diferenciado
          if (usuarioCompleto.isMasterAdmin) {
            navigate("/home2"); // admin
          } else {
            navigate("/home"); // usuário comum
          }

          return usuarioCompleto;
        }
      );

      return userData; // Retorna os dados do usuário
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      setIsLoading(false);
      throw error;
    } finally {
      setIsLoading(false);
    }
  }

  function handleLogout() {
    setUsuario({
      id: 0,
      nome: "",
      usuario: "",
      senha: "",
      objetivo: "geral",
      endereco: "",
      token: "",
      foto: "",
      isMasterAdmin: false,
    });
    localStorage.removeItem("token");
    localStorage.removeItem("usuario");
    navigate("/home"); // logout sempre leva para home do usuário normal
  }

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
