import React from "react";
import { FlatList, Button, Alert } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { deleteProduct } from "../../redux/actions/products";
import ProductItem from "../../components/shop/ProductItem";
import Theme from "../../constants/Theme";

const UserProductScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const userProducts = useSelector(
    ({ products: { userProducts } }) => userProducts
  );

  const handleDelete = (item) => {
    Alert.alert("Are you sure?", "Do you really want to delete this item?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: () => dispatch(deleteProduct(item.id)),
      },
    ]);
  };

  return (
    <FlatList
      data={userProducts}
      renderItem={({ item }) => (
        <ProductItem
          product={item}
          onSelect={() => {
            navigation.navigate("EditProducts", { id: item.id });
          }}
        >
          <Button
            title="Edit"
            color={Theme.primary}
            onPress={() => {
              navigation.navigate("EditProducts", { id: item.id });
            }}
          />
          <Button
            title="Delete"
            color={Theme.primary}
            onPress={handleDelete.bind(this, item)}
          />
        </ProductItem>
      )}
    />
  );
};

export default UserProductScreen;
