import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import * as api from '../api/api';
import type { UserData } from '../api/types';

interface AuthContextValue {
  user: UserData | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  checkAuth: () => Promise<boolean>;
  loadUser: () => Promise<UserData | null>;
  logout: () => Promise<void>;
  setUser: (user: UserData | null) => void;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<UserData | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = useCallback(async (): Promise<boolean> => {
    try {
      await api.isAuth();
      setIsAuthenticated(true);
      return true;
    } catch {
      setIsAuthenticated(false);
      setUser(null);
      return false;
    }
  }, []);

  const loadUser = useCallback(async (): Promise<UserData | null> => {
    try {
      const data = await api.getUser();
      setUser(data);
      setIsAuthenticated(true);
      return data;
    } catch {
      setUser(null);
      return null;
    }
  }, []);

  const logout = useCallback(async () => {
    await api.logout();
    setUser(null);
    setIsAuthenticated(false);
  }, []);

  useEffect(() => {
    void (async () => {
      const authed = await checkAuth();
      if (authed) {
        await loadUser();
      }
      setIsLoading(false);
    })();
  }, [checkAuth, loadUser]);

  const value = useMemo(
    () => ({
      user,
      isAuthenticated,
      isLoading,
      checkAuth,
      loadUser,
      logout,
      setUser,
    }),
    [user, isAuthenticated, isLoading, checkAuth, loadUser, logout],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
