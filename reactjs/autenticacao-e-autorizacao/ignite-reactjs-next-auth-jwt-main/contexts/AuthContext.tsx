import { error } from 'console'
import { createContext, ReactNode  } from 'react'
import { api } from '../services/api'

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
    try {
      const response = await api.post('sessions', {
        email,
        password
      })
      console.log(response.data)
    } catch (err) {
      console.log(err)
      
    }

  }

  return (
    <AuthContext.Provider value={{isAuthenticated, signIn}}>
      {children}
    </AuthContext.Provider>
  )
}