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
import darkT from "../Themes/dark";

const SettingPage = () => {
  const navigation = useNavigation();
  const auth = useContext(AuthContext);
  const themeContext = useContext(ThemeContext);
  const { colors } = useTheme();

  if (!themeContext) return null;

  const toggleTheme = () => {
    const newTheme = themeContext.appTheme === "dark" ? "light" : "dark";
    themeContext.setAppTheme(newTheme);
  };

  const setAuto = () => {
    themeContext.setAppTheme("auto");
  };

  return (
    <View style={styles.container}>
      <Text style={{ color: colors.text }}>Setting Page</Text>

      <TouchableOpacity
        style={styles.btn}
        onPress={() => navigation.getParent()?.navigate("Profile")}
      >
        <Text style={styles.btntxt}>Visit Profile</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.btn} onPress={() => auth?.signOut()}>
        <Text style={styles.btntxt}>Sign Out</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.btn, { width: 300 }]}
        onPress={toggleTheme}
      >
        <Text style={styles.btntxt}>
          use Light mode :{" "}
          {themeContext.appTheme === "light" ? "True" : "False"}
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.btn, { width: 300 }]}
        onPress={toggleTheme}
      >
        <Text style={styles.btntxt}>
          use Dark mode : {themeContext.appTheme === "dark" ? "True" : "False"}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={[styles.btn, { width: 300 }]} onPress={setAuto}>
        <Text style={styles.btntxt}>
          use System theme :{" "}
          {themeContext.appTheme === "auto" ? "True" : "False"}
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
