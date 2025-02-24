import React, { createContext, FC, ReactNode, useState } from "react";

interface userDataTypes {
  accessToken: string;
  email: string;
  firstName: string;
  gender: string;
  id: number;
  image: string;
  lastName: string;
  refreshToken: string;
  username: string;
}

interface AuthContextType {
  token: string | null;
  signIn: (dtype: userDataTypes) => void;
  signOut: () => void;
  user: userDataTypes | null;
}

export const AuthContext = createContext<AuthContextType | undefined>(
  undefined
);

interface AuthProviderProps {
  children: ReactNode;
}
export const AuthProvider: FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<userDataTypes | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const signIn = (userData: userDataTypes) => {
    setToken(userData.accessToken);
    setUser(userData);
  };
  const signOut = () => {
    console.log("signing out");
    setUser(null);
    setToken(null);
  };
  return (
    <AuthContext.Provider value={{ signIn, signOut, token, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
