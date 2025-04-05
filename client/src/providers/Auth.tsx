import { createContext, useState, useContext, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router";

interface TokenPayload {
  iss: string;
  sub: string;
  exp: number;
  iat: number;
}

interface AuthContextType {
  username: string | null;
  token: string | null;
  login: (formData: FormData) => Promise<{ success: boolean; data?: unknown }>;
  logout: () => void;
  validateToken: () => void;
}

const defaultContextValue: AuthContextType = {
  username: null,
  token: null,
  login: (_formData: FormData) => Promise.resolve({ success: false }),
  logout: () => { },
  validateToken: () => {}
}

const AuthContext = createContext(defaultContextValue);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const navigate = useNavigate();
  const [token, setToken] = useState(() => sessionStorage.getItem("token") || null);
  const [username, setUsername] = useState<string | null>(null);

  const login = async (formData: FormData) => {
    try {
      const response = await fetch(import.meta.env.VITE_API_URL, {
        method: "POST",
        body: formData,
      });

      if (response?.status !== 200) {
        throw new Error(JSON.stringify(await response.json()));
      };

      const json = await response.json();

      setUsername(jwtDecode<TokenPayload>(json.data).sub);
      setToken(json.data);

      sessionStorage.setItem("token", json.data);
    } catch (error) {
      console.error(error);
      return { success: false, data: error };
    }

    return { success: true };
  };

  const logout = () => {
    setToken(null);
    sessionStorage.removeItem("token");

    navigate('/');
  };

  const validateToken = () => {
    if (!token) return;

    const payload = jwtDecode<TokenPayload>(token);

    if (payload.exp < Date.now() / 1000) {
      logout();
    }
  }

  useEffect(() => {
    if (token) {
      setUsername(jwtDecode<TokenPayload>(token).sub);
    } else {
      setUsername(null);
    }
  }, [token]);

  return (
    <AuthContext.Provider value={{ username, token, login, logout, validateToken }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);