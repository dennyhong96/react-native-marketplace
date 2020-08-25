import React from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/carts";

import ProductItem from "../../components/shop/ProductItem";
import { add } from "react-native-reanimated";

const ProductsOverviewScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const availableProducts = useSelector(
    ({ products: { availableProducts } }) => availableProducts
  );

  return (
    <FlatList
      data={availableProducts}
      renderItem={({ item }) => (
        <ProductItem
          product={item}
          onDetail={() => {
            navigation.navigate("ProductDetails", { product: item });
          }}
          onAddToCart={() => dispatch(addToCart(item))}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({});

export default ProductsOverviewScreen;
