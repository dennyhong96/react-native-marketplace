import React from "react";
import { View, Text, Button, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

import ProductItem from "../../components/shop/ProductItem";

const ProductsOverviewScreen = () => {
  const availableProducts = useSelector(
    ({ products: { availableProducts } }) => availableProducts
  );
  return (
    <FlatList
      data={availableProducts}
      renderItem={({ item }) => (
        <ProductItem
          product={item}
          onDetail={() => {}}
          onAddToCart={() => {}}
        />
      )}
    />
  );
};

const styles = StyleSheet.create({});

export default ProductsOverviewScreen;
