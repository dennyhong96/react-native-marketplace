import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useSelector } from "react-redux";

import ProductItem from "../../components/shop/ProductItem";

const UserProductScreen = () => {
  const userProducts = useSelector(
    ({ products: { userProducts } }) => userProducts
  );
  return (
    <FlatList
      data={userProducts}
      renderItem={({ item }) => <ProductItem product={item} />}
    />
  );
};

export default UserProductScreen;
