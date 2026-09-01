import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import api from '../api/client.js';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('devbybaraka_token'));
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const response = await api.get('/auth/me');
        setUser(response.data);
      } catch (error) {
        localStorage.removeItem('devbybaraka_token');
        setToken(null);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token]);

  const login = async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    const authToken = response.data.token;

    localStorage.setItem('devbybaraka_token', authToken);
    setToken(authToken);
    setUser(response.data);

    return response.data;
  };

  const logout = () => {
    localStorage.removeItem('devbybaraka_token');
    setToken(null);
    setUser(null);
  };

  const value = useMemo(() => ({
    user,
    token,
    loading,
    login,
    logout,
    isAuthenticated: Boolean(user),
  }), [user, token, loading]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);
