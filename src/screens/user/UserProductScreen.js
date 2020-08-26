import React from "react";
import { FlatList, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { deleteProduct } from "../../redux/actions/products";
import ProductItem from "../../components/shop/ProductItem";
import Theme from "../../constants/Theme";

const UserProductScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const userProducts = useSelector(
    ({ products: { userProducts } }) => userProducts
  );

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
