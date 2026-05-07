import {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
  useState,
} from "react";

type TAuthStateContext = {
  token?: string;
  setToken: (tk: string) => void;
  clearToken: () => void;
};

const AuthContext = createContext<TAuthStateContext | null>(null);

export function AuthProvider({ children }: PropsWithChildren) {
  const [authToken, setAuthToken] = useState<string | undefined>(undefined);

  const setTk = useCallback((tk: string) => {
    setAuthToken(tk);
  }, []);

  const clearTk = useCallback(() => {
    setAuthToken(undefined);
  }, []);
  return (
    <AuthContext.Provider
      value={{
        token: authToken,
        setToken: setTk,
        clearToken: clearTk,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useRoutePath() {
  const context = useContext(AuthContext);
  // The if statement conditional might never be true, but I still put it there.
  if (!context) {
    throw new Error("[useAuthContext] AuthContextProvider context is required");
  }
  return context;
}
