import {
  StyleSheet,
  Text,
  TouchableOpacity,
  useColorScheme,
  View,
} from "react-native";
import React, { useContext } from "react";
import { useNavigation, useTheme } from "@react-navigation/native";
import AuthContext from "../context/AuthContext";
import ThemeContext from "../context/ThemeContext";

const SettingPage = () => {
  const navigation = useNavigation();
  const auth = useContext(AuthContext);
  const theme = useContext(ThemeContext);
  const deviceTheme = useColorScheme();
  const { colors } = useTheme();
  const handleSystemTheme = () => {
    if (!theme?.useSystem) {
      theme?.setUseSystem(true);
      console.log(`useSystemTheme: ${theme?.useSystem}`);
    }
  };
  const helpToggle = (mode: string) => {
    if (theme?.useSystem) theme?.setUseSystem(false);
    theme?.toggleTheme(mode);
  };
  return (
    <View style={styles.container}>
      <Text style={{ color: colors.text }}>SettingPage</Text>
      <TouchableOpacity
        style={styles.btn}
        onPress={() => {
          navigation.getParent()?.navigate("Profile");
        }}
      >
        <Text style={styles.btntxt}>Visit Profile</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.btn} onPress={() => auth?.signOut()}>
        <Text style={styles.btntxt}>Signout</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.btn, { width: 300 }]}
        onPress={() => {
          if (theme?.dark || (theme?.useSystem && deviceTheme === "dark")) {
            helpToggle("light");
          } else {
            helpToggle("dark");
          }
        }}
      >
        <Text style={styles.btntxt}>
          change to :
          {theme?.dark || (theme?.useSystem && deviceTheme === "dark")
            ? " LIGHT MODE"
            : " DARK MODE"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.btn, { width: 300 }]}
        onPress={() => handleSystemTheme()}
      >
        <Text style={styles.btntxt}>
          use system theme : {JSON.stringify(theme?.useSystem)}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SettingPage;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  btn: {
    height: 40,
    width: 100,
    borderRadius: 20,
    backgroundColor: "#8E6CEF",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 20,
  },
  btntxt: {
    color: "#fff",
    fontWeight: "bold",
  },
});
