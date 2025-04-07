import React, { useState, useEffect, createContext, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";
import { throwOnAPIError, unknownToError } from "../error";

export interface TokenPayload {
  iss: string;
  sub: string;
  exp: number;
  iat: number;
}

export interface AuthContextType {
  username: string | null;
  token: string | null;
  hydrated: boolean;
  login: (formData: FormData) => Promise<{ success: boolean; error?: Error }>;
  logout: () => void;
  validateToken: () => void;
}

const outOfContextError = () => console.error("useAuth called outside of <AuthProvider>");

const defaultContextValue: AuthContextType = {
  username: null,
  token: null,
  hydrated: false,
  login: async () => { outOfContextError(); return { success: false }; },
  logout: () => outOfContextError(),
  validateToken: () => outOfContextError(),
};

const AuthContext = createContext<AuthContextType>(defaultContextValue);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(() => sessionStorage.getItem("token") || null);
  const [username, setUsername] = useState<string | null>(null);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const storedToken = sessionStorage.getItem("token");
    if (storedToken) {
      const decoded = jwtDecode<TokenPayload>(storedToken);
      setToken(storedToken);
      setUsername(decoded.sub);
    }
    setHydrated(true);
  }, []);

  const login = async (formData: FormData) => {
    try {
      const encodedCredentials = btoa(`${formData.get("username")}:${formData.get("password")}`);

      const response = await fetch("http://localhost:8000/admin/login", {
        method: "POST",
        headers: {
          "Authorization": `Basic ${encodedCredentials}`
        }
      });
      await throwOnAPIError('Login', response);

      const json = await response.json();

      setUsername(jwtDecode<TokenPayload>(json.token).sub);
      setToken(json.token);

      sessionStorage.setItem("token", json.token);

      return { success: true };
    } catch (error) {
      return unknownToError('Login', error);
    }
  };

  const logout = () => {
    setToken(null);
    setUsername(null);
    sessionStorage.removeItem("token");
    navigate('/login');
  };

  const validateToken = () => {
    if (!token) return;
    const payload = jwtDecode<TokenPayload>(token);
    if (payload.exp < Date.now() / 1000) {
      logout();
    }
  };

  return (
    <AuthContext.Provider value={{ username, token, hydrated, login, logout, validateToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);