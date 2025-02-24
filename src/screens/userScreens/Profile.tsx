// import { Image, StyleSheet, Text, View } from "react-native";
// import React, { useContext } from "react";
// import { ThemeContext, useRoute } from "@react-navigation/native";
// import { RouteProp } from "@react-navigation/native";
// import { DrawerNavigationProp } from "@react-navigation/drawer";
// import { useNavigation } from "@react-navigation/native";
// import { DrawerParamList } from "../../TypesDefined/NavTypes";

// type ProfileScreenNavigationProp = DrawerNavigationProp<DrawerParamList, "Profile">;

// const Profile = () => {
//   const theme = useContext(ThemeContext);
//   const route = useRoute<RouteProp<DrawerParamList, "Profile">>();
//   const { image, firstname, lastname, email } = route.params;

//   return (
//     <View
//       style={[styles.container, { backgroundColor: theme?.colors.background }]}
//     >
//       <Text style={styles.title}>Profile</Text>
//       <Image source={{ uri: image }} style={styles.userimg} />
//       <Text style={styles.username}>
//         {firstname} {lastname}
//       </Text>
//       <Text style={styles.email}>{email}</Text>
//     </View>
//   );
// };

// export default Profile;

// const styles = StyleSheet.create({
//   container: {
//     justifyContent: "center",
//     alignItems: "center",
//     flex: 1,
//   },
//   title: {
//     fontSize: 20,
//     fontWeight: "bold",
//   },
//   userimg: {
//     height: 80,
//     width: 80,
//     borderRadius: 40,
//   },
//   username: {
//     fontSize: 18,
//     fontWeight: "bold",
//   },
//   email: {
//     fontSize: 14,
//     color: "gray",
//   },
// });

import { Image, StyleSheet, Text, View } from "react-native";
import React, { FC } from "react";
import { useTheme } from "@react-navigation/native";
import { ProfileParams } from "../../TypesDefined/NavTypes";

const Profile: FC<ProfileParams> = ({ route }) => {
  const { colors } = useTheme();
  const { username, email, image } = route.params;
  console.log(`username: ${username}`);
  return (
    <View style={styles.container}>
      <Text style={{ color: colors.text }}>Profile</Text>
      <Image resizeMode="contain" source={{ uri: image }} style={styles.img} />
      <Text style={{ color: colors.text }}>username: {username}</Text>
      <Text style={{ color: colors.text }}>registered email id: {email}</Text>
    </View>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  img: {
    height: 40,
    width: 40,
    borderRadius: 10,
  },
});
