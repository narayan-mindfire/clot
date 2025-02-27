import React from "react";
import RootStack from "./navigation/RootStack";
// import { ThemeProvider } from "./context/ThemeContext";
import { AuthProvider } from "./context/AuthContext";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import Demo from "./screens/Demo";
export const App = () => {
  return (
    <Provider store={store}>
      <AuthProvider>
        {/* <ThemeProvider> */}
        <RootStack />
        {/* <Demo /> */}
        {/* </ThemeProvider> */}
      </AuthProvider>
    </Provider>
  );
};

export default App;
