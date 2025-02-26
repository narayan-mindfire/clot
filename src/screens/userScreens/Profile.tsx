import { Image, StyleSheet, Text, View } from "react-native";
import React, { FC, useContext, useEffect, useState } from "react";
import { useTheme } from "@react-navigation/native";
import { ProfileParams } from "../../TypesDefined/NavTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";
import AuthContext from "../../context/AuthContext";

const Profile: FC<ProfileParams> = () => {
  const { colors } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  const [firstname, setFirstname] = useState("not found");
  const [lastname, setLastname] = useState("not found");
  useEffect(() => {
    const getData = async () => {
      try {
        const unuserData = await AsyncStorage.getItem("userData");
        if (unuserData) {
          const userData = JSON.parse(unuserData);
          if (userData) {
            if (userData.username) setName(userData.username);
            if (userData.email) setEmail(userData.email);
            if (userData.image) setImage(userData.image);
            if (userData.firstName) setFirstname(userData.firstName);
            if (userData.lastName) setLastname(userData.lastName);
          }
        }
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };
    getData();
  }, []);
  return (
    <View style={[styles.container, { backgroundColor: colors.background }]}>
      <Image
        source={
          image
            ? { uri: image }
            : require("../../assets/images/defaultprofile.png")
        }
        style={styles.profileImage}
      />
      <Text style={[styles.name, { color: colors.text }]}>{name}</Text>
      <Text style={[styles.name, { color: colors.text }]}>
        {firstname} {lastname}
      </Text>
      <Text style={[styles.email, { color: colors.text }]}>{email}</Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f8f8f8",
    padding: 20,
  },
  profileImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginBottom: 10,
  },
  name: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  email: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
