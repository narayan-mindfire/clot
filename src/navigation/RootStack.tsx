import React, { FC, useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Welcome from "../screens/Welcome";
import Explore from "../screens/Explore";
import { RootStackParamList } from "../TypesDefined/NavTypes";
import Homepage from "../screens/Homepage";
import Signin from "../screens/AuthScreens/Signin";
import ThemeContext from "../context/ThemeContext";
import AuthContext from "../context/AuthContext";
const RootNav = createNativeStackNavigator<RootStackParamList>();
const RootStack: FC = () => {
  const theme = useContext(ThemeContext);
  const auth = useContext(AuthContext);
  return (
    <NavigationContainer theme={theme?.appTheme}>
      <RootNav.Navigator screenOptions={{ headerShown: false }}>
        {!auth?.token ? (
          <>
            <RootNav.Screen name="Welcome" component={Welcome} />
            <RootNav.Screen name="Explore" component={Explore} />
            <RootNav.Screen name="Signin" component={Signin} />
          </>
        ) : (
          <>
            <RootNav.Screen name="Homepage" component={Homepage} />
          </>
        )}
      </RootNav.Navigator>
    </NavigationContainer>
  );
};
export default RootStack;
