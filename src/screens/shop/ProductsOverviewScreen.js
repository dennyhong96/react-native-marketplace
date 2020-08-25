import React from "react";
import { FlatList, StyleSheet } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/carts";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import HeaderButton from "../../components/ui/HeaderButton";
import ProductItem from "../../components/shop/ProductItem";

const ProductsOverviewScreen = ({ navigation }) => {
  const dispatch = useDispatch();
  const availableProducts = useSelector(
    ({ products: { availableProducts } }) => availableProducts
  );

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
  });

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
