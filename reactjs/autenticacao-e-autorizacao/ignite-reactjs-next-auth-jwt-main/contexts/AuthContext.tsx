import { createContext, ReactNode  } from 'react'

type SignInCredentials = {
  email: string;
  password: string;
}

type AuthContextData = {
  isAuthenticated: boolean;
  signIn: (credentials: SignInCredentials) => Promise<void>;
}

type AuthProviderProps = {
  children: ReactNode; //componentes, textos, números...
}

//Context
export const AuthContext = createContext({} as AuthContextData)

//Provider Context
export function AuthProvider({children}: AuthProviderProps) {
  const isAuthenticated = false;

  async function signIn({email, password}) {
    console.log({ email, password})
  }

  return (
    <AuthContext.Provider value={{isAuthenticated, signIn}}>
      {children}
    </AuthContext.Provider>
  )
}