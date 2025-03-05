import React from "react";
import { View, Text, FlatList, SafeAreaView } from "react-native";
import { useSelector } from "react-redux";
import { selectWishlistItems } from "../redux/slices/wishList";
import ProductCard from "../components/ProductCard";

export default function Wishlist() {
  const wishlist = useSelector(selectWishlistItems);

  return (
    <SafeAreaView>
      <View style={{ padding: 20, paddingHorizontal: 30 }}>
        <Text style={{ fontSize: 24, fontWeight: "bold" }}>My Wishlist</Text>
        {wishlist.length === 0 ? (
          <Text style={{ marginTop: 20 }}>No items in wishlist</Text>
        ) : (
          <FlatList
            data={wishlist}
            keyExtractor={(item) => item.id.toString()}
            columnWrapperStyle={{
              justifyContent: "space-between",
              marginBottom: 10,
            }}
            numColumns={2}
            renderItem={({ item }) => (
              <ProductCard
                id={item.id}
                name={item.name}
                price={item.price}
                image={item.image}
              />
            )}
            // ItemSeparatorComponent={() => <View style={{ margin: 10 }} />}
          />
        )}
      </View>
    </SafeAreaView>
  );
}
