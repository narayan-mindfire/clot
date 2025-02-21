import React from "react";
import RootStack from "./navigation/RootStack";
import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";

export const App = () => {
  return (
    <AuthProvider>
      <ThemeProvider>
        <RootStack />
      </ThemeProvider>
    </AuthProvider>
  );
};

export default App;
