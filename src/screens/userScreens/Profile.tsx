import { Image, StyleSheet, Text, View } from "react-native";
import React, { FC, useEffect, useState } from "react";
import { useTheme } from "@react-navigation/native";
import { ProfileParams } from "../../TypesDefined/NavTypes";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile: FC<ProfileParams> = () => {
  const { colors } = useTheme();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState("");
  useEffect(() => {
    const getData = async () => {
      try {
        const username = await AsyncStorage.getItem("username");
        const email = await AsyncStorage.getItem("email");
        const image = await AsyncStorage.getItem("image");
        if (username) setName(username);
        if (email) setEmail(email);
        if (image) setImage(image);
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
      <Text style={[styles.name, { color: colors.text }]}>
        {name || "Guest User"}
      </Text>
      <Text style={[styles.email, { color: colors.text }]}>
        {email || "No email available"}
      </Text>
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
