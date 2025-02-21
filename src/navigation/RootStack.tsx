import React, { FC } from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Welcome from "../screens/Welcome";
import Explore from "../screens/Explore";
import { RootStackParamList } from "../TypesDefined/NavTypes";
import darkTheme from "../Themes/dark";
import Homepage from "../screens/Homepage";
const RootNav = createNativeStackNavigator<RootStackParamList>();
const RootStack: FC = () => {
  return (
    <NavigationContainer theme={darkTheme}>
      <RootNav.Navigator screenOptions={{ headerShown: false }}>
        <RootNav.Screen name="Welcome" component={Welcome} />
        <RootNav.Screen name="Explore" component={Explore} />
        <RootNav.Screen name="Homepage" component={Homepage} />
      </RootNav.Navigator>
    </NavigationContainer>
  );
};
export default RootStack;
