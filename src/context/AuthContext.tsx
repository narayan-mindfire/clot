import AsyncStorage from "@react-native-async-storage/async-storage";
import React, {
  createContext,
  FC,
  ReactNode,
  useEffect,
  useState,
} from "react";
import * as SecureStore from "expo-secure-store";
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

  useEffect(() => {
    const loadStored = async () => {
      try {
        const storedUser = await SecureStore.getItemAsync("storedUser");
        const storedToken = await SecureStore.getItemAsync("storedToken");
        if (storedUser) setUser(JSON.parse(storedUser));
        if (storedToken) setToken(JSON.parse(storedToken));
      } catch (error) {
        console.log("no user in the store");
      }
    };
    loadStored();
  }, []);

  useEffect(() => {
    const storeUserData = async () => {
      try {
        if (user)
          await SecureStore.setItemAsync("storedUser", JSON.stringify(user));
        if (token)
          await SecureStore.setItemAsync("storedToken", JSON.stringify(token));
      } catch (error) {
        console.log(`facing error while storing data: ${error}`);
      }
    };
    storeUserData();
  }, [token, user]);
  const signIn = (userData: userDataTypes) => {
    setToken(userData.accessToken);
    setUser(userData);
  };
  const signOut = async () => {
    console.log("signing out");
    setUser(null);
    setToken(null);
    try {
      await AsyncStorage.clear();
      await SecureStore.deleteItemAsync("storedUser");
      await SecureStore.deleteItemAsync("storedToken");
    } catch (error) {
      console.log(`facing issues in signing out: ${error}`);
    }
  };
  return (
    <AuthContext.Provider value={{ signIn, signOut, token, user }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
