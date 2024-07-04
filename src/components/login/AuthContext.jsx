import React, { createContext, useState, useEffect, useContext } from 'react';

// Crear el contexto de autenticación
const authContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [role, setRole] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Estado de carga

  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    const storedToken = localStorage.getItem('token');
    const storedRole = localStorage.getItem('role');

    if (storedUser) {
      setUser(storedUser);
    }

    if (storedToken) {
      setToken(storedToken);
    }

    if (storedRole) {
      setRole(storedRole);
    }

    // Simulamos un tiempo de carga de 1 segundo (ajusta según tus necesidades)
    const timer = setTimeout(() => {
      setIsLoading(false); 
    }, 1000);

    return () => clearTimeout(timer); // Limpiamos el temporizador al desmontar
  }, []);

  const logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    setUser(null);
    setToken(null);
    setRole(null);
  };

  return (
    <authContext.Provider value={{ user, token, role, isLoading, setUser, setToken, setRole, logout }}>
      {children}
    </authContext.Provider>
  );
};

// Exporta la función useAuth
export function useAuth() {
  return useContext(authContext);
}
