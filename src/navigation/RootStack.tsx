import React, { FC, useContext } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Welcome from "../screens/Welcome";
import Explore from "../screens/Explore";
import { RootStackParamList } from "../TypesDefined/NavTypes";
import Signin from "../screens/AuthScreens/Signin";
import AuthContext from "../context/AuthContext";
import DrawNav from "./Drawer";
import Profile from "../screens/userScreens/Profile";
import { RootState, AppDispatch } from "../redux/store";
import { useSelector } from "react-redux";
const RootNav = createNativeStackNavigator<RootStackParamList>();

const RootStack: FC = () => {
  const theme = useSelector((state: RootState) => state.themeHandler.theme);
  const auth = useContext(AuthContext);
  return (
    <NavigationContainer theme={theme}>
      <RootNav.Navigator screenOptions={{ headerShown: false }}>
        {!auth?.token ? (
          <>
            <RootNav.Screen name="Welcome" component={Welcome} />
            <RootNav.Screen name="Explore" component={Explore} />
            <RootNav.Screen name="Signin" component={Signin} />
          </>
        ) : (
          <>
            <RootNav.Screen name="DrawNav" component={DrawNav} />
            <RootNav.Screen name="Profile" component={Profile} />
          </>
        )}
      </RootNav.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
