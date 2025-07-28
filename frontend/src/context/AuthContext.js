import { createContext, useState, useEffect } from "react";
import { loginUser, registerUser } from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load user from localStorage on app start
  useEffect(() => {
    const token = localStorage.getItem("token");
    const userData = localStorage.getItem("user");
    if (token && userData) {
      setUser({ token, ...JSON.parse(userData) });
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (credentials) => {
    try {
      setLoading(true);
      setError(null);
      
      const data = await loginUser(credentials);
      
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      setUser({ token: data.token, ...data.user });
      
      return true;
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Login failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      setLoading(true);
      setError(null);
      
      await registerUser(userData);
      
      return true;
    } catch (err) {
      setError(err.response?.data?.message || err.message || "Registration failed");
      return false;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, error, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;