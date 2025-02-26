import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
} from "@react-navigation/drawer";
import { StyleSheet, View } from "react-native";
import { Linking } from "react-native";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { useNavigation, useTheme } from "@react-navigation/native";
import SettingPage from "../screens/SettingPage";
import Homepage from "../screens/Homepage";
import getCurUser from "../services/GetUser";
import AsyncStorage from "@react-native-async-storage/async-storage";
const Drawer = createDrawerNavigator();

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const auth = useContext(AuthContext);
  const { colors } = useTheme();
  const user = useContext(AuthContext);
  const navigation = useNavigation();
  const visitProfile = async (token: string | null | undefined) => {
    if (!(await AsyncStorage.getItem("userData"))) await getCurUser();
    navigation.navigate("Profile");
  };

  return (
    <View style={styles.container}>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={{ flex: 1, gap: 10 }}
      >
        <View style={styles.grpa}>
          <DrawerItemList {...props} />
        </View>
        <View style={styles.grpb}>
          <DrawerItem
            style={{ backgroundColor: colors.card, borderRadius: 20 }}
            label="Profile"
            labelStyle={{ color: colors.text, fontWeight: "bold" }}
            onPress={() => visitProfile(user?.token)}
          />
          <DrawerItem
            style={{ backgroundColor: colors.card, borderRadius: 20 }}
            label="LogOut"
            labelStyle={{ color: "red", fontWeight: "bold" }}
            onPress={() => auth?.signOut()}
          />
          <DrawerItem
            label="Help"
            labelStyle={{ color: colors.text }}
            style={{ backgroundColor: colors.card, borderRadius: 20 }}
            onPress={() => Linking.openURL("https://google.co.in")}
          />
        </View>
      </DrawerContentScrollView>
    </View>
  );
}

const MyDrawer = () => {
  const { dark, colors } = useTheme();
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
      screenOptions={{
        drawerStyle: {
          backgroundColor: colors.primary,
        },
        drawerItemStyle: {
          backgroundColor: colors.card,
          borderRadius: 10,
        },
        drawerActiveTintColor: colors.primary,
        drawerInactiveTintColor: colors.text,
      }}
    >
      <Drawer.Screen
        name="DashBoard"
        options={{ title: "Dashboard" }}
        component={Homepage}
      />
      <Drawer.Screen
        name="Settings"
        options={{ title: "Settings" }}
        component={SettingPage}
      />
    </Drawer.Navigator>
  );
};

export default function DrawNav() {
  return <MyDrawer />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    flexDirection: "column",
    justifyContent: "space-evenly",
  },
  grpa: { flexGrow: 1, gap: 5 },
  grpb: { gap: 5 },
});
