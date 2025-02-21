import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React, { FC } from "react";
import { WelcomeParams } from "../TypesDefined/NavTypes";
import { useTheme } from "@react-navigation/native";

const Welcome: FC<WelcomeParams> = ({ navigation }) => {
  const { colors } = useTheme();
  return (
    <View style={styles.container}>
      <Text style={[styles.headtext, { color: colors.text }]}>Welcome!</Text>
      <TouchableOpacity
        style={[styles.btn, { backgroundColor: colors.card }]}
        onPress={() => navigation.push("Explore")}
      >
        <Text style={styles.btntxt}>explore</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={[styles.btn, { backgroundColor: colors.card }]}
        onPress={() => navigation.push("Homepage")}
      >
        <Text style={styles.btntxt}>visit home</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Welcome;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
  },
  headtext: {
    fontSize: 32,
    fontWeight: "800",
  },
  btn: {
    height: 40,
    width: 100,
    borderRadius: 20,
    backgroundColor: "#000",
    justifyContent: "center",
    alignItems: "center",
    margin: 5,
  },
  btntxt: {
    textAlign: "center",
    fontWeight: "bold",
    color: "#fff",
  },
});
