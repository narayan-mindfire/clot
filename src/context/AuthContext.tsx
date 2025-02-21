import React, {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useState,
} from "react";

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
  demofunction: () => void;
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
  const demofunction = () => {
    console.log("demo function called for testing");
  };
  const signIn = (userData: userDataTypes) => {
    console.log("signing in is called");
    console.log("printing userdata: ", userData);
    setToken(userData.accessToken);
    setUser(userData);
    console.log(user?.firstName);
    console.log(user?.lastName);
    console.log(user?.email);
    console.log(user?.gender);
    console.log(user?.username);
  };
  const signOut = () => {
    console.log("signing out");
    setToken(null);
  };
  return (
    <AuthContext.Provider
      value={{ signIn, signOut, token, user, demofunction }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
