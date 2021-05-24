import { createContext, ReactNode, useEffect, useState } from "react";
import Router from "next/router";
import { api } from "../services/api";
import { setCookie, parseCookies, destroyCookie } from "nookies";

type User = {
  email: string;
  permissions: string[];
  roles: string[];
};

type SignInCredentials = {
  email: string;
  password: string;
};

type AuthContextData = {
  isAuthenticated: boolean;
  signIn: (credentials: SignInCredentials) => Promise<void>;
  user: User;
};

type AuthProviderProps = {
  children: ReactNode; //componentes, textos, números...
};

//Context
export const AuthContext = createContext({} as AuthContextData);

export function signOut() {
  //undefined, pois está sendo setado pelo lado do browser
  destroyCookie(undefined, "nextauth.token");
  destroyCookie(undefined, "nextauth.refreshToken");

  Router.push("/");
}

//Provider Context
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User>();
  const isAuthenticated = !!user;

  useEffect(() => {
    const cookies = parseCookies();
    const token = cookies["nextauth.token"];

    if (token) {
      api
        .get("/me")
        .then((response) => {
          const { email, permissions, roles } = response.data;
          setUser({
            email,
            permissions,
            roles,
          });
        })
        .catch(() => {
          signOut();
        });
    }
  }, []);

  async function signIn({ email, password }) {
    try {
      const response = await api.post("sessions", {
        email,
        password,
      });

      const { token, refreshToken, permissions, roles } = response.data;

      //undefined, pois está sendo setado pelo lado do browser
      setCookie(undefined, "nextauth.token", token, {
        //por quanto tempo manter o cookie salvo no navegador, porem a renovação ou controle mesmo antes de expirar é feita pelo back-end
        maxAge: 60 * 60 * 24 * 30, //30 days
        // quais caminhos da aplicação vão ter acesso a esse cookie, colocando '/', voce informa que todos os endereços vao ter acesso. Uma forma de utilizar o cookie globalmente na aplicação
        path: "/",
      });

      setCookie(undefined, "nextauth.refreshToken", refreshToken, {
        maxAge: 60 * 60 * 24 * 30, //30 days
        path: "/",
      });

      setUser({
        email,
        permissions,
        roles,
      });

      api.defaults.headers["Authorization"] = `Bearer ${token}`;

      Router.push("/dashboard");
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, signIn, user }}>
      {children}
    </AuthContext.Provider>
  );
}
