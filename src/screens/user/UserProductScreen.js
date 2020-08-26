import React, { useState } from "react";
import {
  FlatList,
  Button,
  Alert,
  ActivityIndicator,
  View,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { deleteProduct } from "../../redux/actions/products";
import ProductItem from "../../components/shop/ProductItem";
import Theme from "../../constants/Theme";

const UserProductScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

  const userProducts = useSelector(
    ({ products: { userProducts } }) => userProducts
  );

  const handleDelete = (item) => {
    Alert.alert("Are you sure?", "Do you really want to delete this item?", [
      { text: "No", style: "default" },
      {
        text: "Yes",
        style: "destructive",
        onPress: async () => {
          setLoading(true);
          try {
            await dispatch(deleteProduct(item.id));
          } catch (error) {
            setErr(true);
          }
          setLoading(false);
        },
      },
    ]);
  };

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Theme.primary} />
      </View>
    );
  }

  if (err) {
    Alert.alert(
      "Someting went wrong",
      "Error deleting product, please try again.",
      [{ text: "Okay", style: "default" }]
    );
    return setErr(false);
  }

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

const styles = StyleSheet.create({
  centered: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default UserProductScreen;
