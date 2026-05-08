// Portions of this where gotten from expo authentication guide (https://docs.expo.dev/router/advanced/authentication/)
import { createContext, PropsWithChildren, useContext } from "react";

import { useStorageState } from "../hooks/useStorageState";

const AuthContext = createContext<{
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
  session?: string | null;
  isLoading: boolean;
}>({
  signIn: () => Promise.resolve(),
  signOut: () => Promise.resolve(),
  session: null,
  isLoading: false,
});

// Use this hook to access the user info.
export function useAuthSession() {
  const context = useContext(AuthContext);
  // The if statement conditional might never be true, but I still put it there.
  if (!context) {
    throw new Error("[useAuthContext] AuthProvider context is required");
  }
  return context;
}

export function AuthSessionProvider({ children }: PropsWithChildren) {
  const [[isLoading, session], setSession] = useStorageState("AUTH_SESSION");

  return (
    <AuthContext.Provider
      value={{
        signIn: async (token) => {
          await setSession(token);
        },
        signOut: async () => {
          await setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
