import React, { useEffect, useState, useCallback } from "react";
import {
  FlatList,
  Button,
  ActivityIndicator,
  View,
  Text,
  StyleSheet,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/carts";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { listProducts } from "../../redux/actions/products";
import Theme from "../../constants/Theme";
import HeaderButton from "../../components/ui/HeaderButton";
import ProductItem from "../../components/shop/ProductItem";

const ProductsOverviewScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); // For useEffects
  const [refreshing, setRefreshing] = useState(false); // For FlatList pull to refresh
  const [err, setErr] = useState(false);

  const availableProducts = useSelector(
    ({ products: { availableProducts } }) => availableProducts
  );

  // For page to load first time
  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetchProducts();
      setLoading(false);
    })();
  }, [fetchProducts]);

  // For screen re-focus from other screens
  useEffect(() => {
    const unSubscribe = navigation.addListener("focus", async () => {
      setLoading(true);
      await fetchProducts();
      setLoading(false);
    });
    return unSubscribe;
  }, [fetchProducts]);

  // Fetch a list of products
  const fetchProducts = useCallback(async () => {
    setRefreshing(true);
    setErr(false);
    try {
      await dispatch(listProducts());
    } catch (error) {
      console.log("dfjslf");
      setErr(true);
    }
    setRefreshing(false);
  }, [setErr, setLoading, dispatch]);

  navigation.setOptions({
    headerRight: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="add to cart"
          iconName="shopping-cart"
          onPress={() => navigation.navigate("Cart")}
        />
      </HeaderButtons>
    ),
    headerLeft: () => (
      <HeaderButtons HeaderButtonComponent={HeaderButton}>
        <Item
          title="open menu"
          iconName="menu"
          onPress={() => navigation.openDrawer()}
        />
      </HeaderButtons>
    ),
  });

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={Theme.primary} />
      </View>
    );
  }

  if (!loading && err) {
    return (
      <View style={styles.center}>
        <Text style={{ fontFamily: "open-sans-bold", color: "red" }}>
          Something went wrong.
        </Text>
        <Button
          title="Try again"
          color={Theme.secondary}
          onPress={fetchProducts}
        />
      </View>
    );
  }

  if (!loading && !availableProducts.length) {
    return (
      <View style={styles.center}>
        <Text style={{ fontFamily: "open-sans-bold" }}>
          No products found, please add some...
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      onRefresh={fetchProducts} // Function called when pull to refresh, returns promise
      refreshing={refreshing} // Set to true when waiting for data
      data={availableProducts}
      renderItem={({ item }) => (
        <ProductItem
          product={item}
          onSelect={() => {
            navigation.navigate("ProductDetails", { product: item });
          }}
        >
          <Button
            color={Theme.primary}
            title="Details"
            onPress={() => {
              navigation.navigate("ProductDetails", { product: item });
            }}
          />
          <Button
            color={Theme.primary}
            title="Add To Cart"
            onPress={() => dispatch(addToCart(item))}
          />
        </ProductItem>
      )}
    />
  );
};

const styles = StyleSheet.create({
  center: { flex: 1, alignItems: "center", justifyContent: "center" },
});

export default ProductsOverviewScreen;
