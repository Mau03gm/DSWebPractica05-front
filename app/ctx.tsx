// Credits to: https://github.com/lumamontes
import React from "react";
import { useStorageState } from "./useStorageState";
import { useRouter } from "expo-router";
import { post } from "../services/httpService";
import { AUTH_LOGIN } from "@env";
import { toast } from "react-toastify";

const AuthContext = React.createContext<{
  signIn: (email: string, password: string) => void;
  signOut: () => void;
  session?: {
    token: string;
    usuario: any;
  } | null;
  isLoading: boolean;
}>({
  signIn: (email: string, password: string) => null,
  signOut: () => null,
  session: null,
  isLoading: false,
});

// This hook can be used to access the user info.
export function useSession() {
  const value = React.useContext(AuthContext);
  if (!value) {
    throw new Error("useSession must be wrapped in a <SessionProvider />");
  }

  return value;
}

const login = async (email: string, password: string) => {
  try {
    const response = await post(AUTH_LOGIN, {
      correo: email,
      contraseña: password,
    });
    return response;
  } catch (error) {
    throw error;
  }
};

export function SessionProvider(props: React.PropsWithChildren) {
  const router = useRouter();
  const [[isLoading, session], setSession] = useStorageState<{
    token: string;
    usuario: any;
  }>("session");

  return (
    <AuthContext.Provider
      value={{
        signIn: (email: string, password: string) => {
          login(email, password)
            .then((sessionData) => {
              setSession(sessionData);
              router.push("/");
            })
            .catch((error) => {
              toast.error(error.error);
            });
        },
        signOut: () => {
          localStorage.removeItem("cart");
          setSession(null);
        },
        session,
        isLoading,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}
