import {
  Alert,
  BackHandler,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import ProductCard from "../components/ProductCard";
import { useFocusEffect, useTheme } from "@react-navigation/native";
import { useCallback, useEffect, useState } from "react";
import SearchBar from "../components/SearchBar";
import { fetchProducts } from "../services/GetProducts";

export default function Home() {
  type Product = {
    id: number;
    title: string;
    price: number;
    images: string[];
  };

  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    let isMounted = true;
    const getProducts = async () => {
      try {
        const prod = await fetchProducts();
        if (isMounted) setProducts(prod);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    getProducts();
    return () => {
      isMounted = false;
    };
  }, []);

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert("Exit App", "Are you sure you want to exit the app?", [
          {
            text: "Cancle",
            onPress: () => null,
          },
          {
            text: "Yes",
            onPress: () => BackHandler.exitApp(),
          },
        ]);
        return true;
      };
      const backHandler = BackHandler.addEventListener(
        "hardwareBackPress",
        onBackPress
      );
      return () => backHandler.remove();
    }, [])
  );
  const { dark, colors } = useTheme();
  return (
    <SafeAreaView>
      <StatusBar
        backgroundColor={colors.background}
        barStyle={dark ? "light-content" : "dark-content"}
      />
      <ScrollView>
        <View style={styles.container}>
          <View style={{ width: "100%", alignItems: "center" }}>
            <SearchBar height={40} width={342} />
          </View>
          <View style={styles.catBox}>
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <Text style={[styles.heading, { color: colors.text }]}>
                Categories
              </Text>
              <TouchableOpacity>
                <Text
                  style={{ fontSize: 16, paddingRight: 3, color: colors.text }}
                >
                  See All
                </Text>
              </TouchableOpacity>
            </View>
            <View style={styles.categories}>
              <View style={styles.category}>
                <Image
                  resizeMode="contain"
                  source={require("../assets/images/hoodie.png")}
                />
                <Text style={[styles.cattxt, { color: colors.text }]}>
                  Hoodies
                </Text>
              </View>
              <View style={styles.category}>
                <Image
                  resizeMode="contain"
                  source={require("../assets/images/Shorts.png")}
                />
                <Text style={[styles.cattxt, { color: colors.text }]}>
                  Shorts
                </Text>
              </View>
              <View style={styles.category}>
                <Image
                  resizeMode="contain"
                  source={require("../assets/images/Shoes.png")}
                />
                <Text style={[styles.cattxt, { color: colors.text }]}>
                  Shoes
                </Text>
              </View>
              <View style={styles.category}>
                <Image
                  resizeMode="contain"
                  source={require("../assets/images/Bags.png")}
                />
                <Text style={[styles.cattxt, { color: colors.text }]}>Bag</Text>
              </View>
              <View style={styles.category}>
                <Image
                  resizeMode="contain"
                  source={require("../assets/images/Accessories.png")}
                />
                <Text style={[styles.cattxt, { color: colors.text }]}>
                  Accessories
                </Text>
              </View>
            </View>
          </View>
          <View style={styles.topList}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 24,
              }}
            >
              <Text style={[styles.heading, { color: colors.text }]}>
                Top Selling
              </Text>
              <TouchableOpacity>
                <Text
                  style={{ fontSize: 16, paddingRight: 3, color: colors.text }}
                >
                  See All
                </Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={products.slice(0, 10)}
              horizontal={true}
              renderItem={({ item }) => (
                <ProductCard
                  name={item.title ? item.title : "default"}
                  price={item.price ? item.price : 0}
                  image={
                    item.images
                      ? item.images[0]
                      : "https://assets.dummyjson.com/public/qr-code.png"
                  }
                />
              )}
              ItemSeparatorComponent={() => {
                return (
                  <View
                    style={{
                      height: "100%",
                      width: 10,
                    }}
                  />
                );
              }}
            />
          </View>
          <View style={[styles.newList, { marginBottom: 15 }]}>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
                marginTop: 24,
              }}
            >
              <Text style={[styles.heading, { color: colors.primary }]}>
                New In
              </Text>
              <TouchableOpacity>
                <Text
                  style={{ fontSize: 16, paddingRight: 3, color: colors.text }}
                >
                  See All
                </Text>
              </TouchableOpacity>
            </View>
            <FlatList
              nestedScrollEnabled={true}
              data={products.slice(14, 28)}
              horizontal={true}
              renderItem={({ item }) => (
                <ProductCard
                  name={item.title ? item.title : "default"}
                  price={item.price ? item.price : 0}
                  image={
                    item.images
                      ? item.images[0]
                      : "https://assets.dummyjson.com/public/qr-code.png"
                  }
                />
              )}
              ItemSeparatorComponent={() => {
                return (
                  <View
                    style={{
                      height: "100%",
                      width: 10,
                    }}
                  />
                );
              }}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 13,
    justifyContent: "center",
    marginBottom: 35,
  },
  catBox: {
    paddingHorizontal: 24,
    marginTop: 24,
    height: 116,
    width: "100%",
  },
  heading: {
    fontWeight: "700",
    fontSize: 16,
    marginBottom: 10,
  },
  categories: {
    top: 13,
    width: "100%",
    height: 80,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  category: {
    width: 56,
    height: 80,
    // borderColor : 'black',
    // borderWidth : 3,
    flexDirection: "column",
    alignItems: "center",
  },
  cattxt: {
    fontSize: 12,
    lineHeight: 19.2,
    fontWeight: "300",
  },
  topList: {
    height: 282,
    width: "100%",
    paddingHorizontal: 24,
    // borderColor : 'black',
    // borderWidth : 3,
  },
  newList: {
    paddingHorizontal: 24,
    width: "100%",
    height: 300,
  },
});
