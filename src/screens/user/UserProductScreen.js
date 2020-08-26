import React from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { deleteProduct } from "../../redux/actions/products";
import ProductItem from "../../components/shop/ProductItem";
import Theme from "../../constants/Theme";

const UserProductScreen = () => {
  const dispatch = useDispatch();
  const userProducts = useSelector(
    ({ products: { userProducts } }) => userProducts
  );
  return (
    <FlatList
      data={userProducts}
      renderItem={({ item }) => (
        <ProductItem product={item} onSelect={() => {}}>
          <Button title="Edit" color={Theme.primary} onPress={() => {}} />
          <Button
            title="Delete"
            color={Theme.primary}
            onPress={() => {
              dispatch(deleteProduct(item.id));
            }}
          />
        </ProductItem>
      )}
    />
  );
};

export default UserProductScreen;
