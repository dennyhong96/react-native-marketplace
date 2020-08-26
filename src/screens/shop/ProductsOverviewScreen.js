import React from "react";
import { FlatList, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { addToCart } from "../../redux/actions/carts";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import Theme from "../../constants/Theme";
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

  return (
    <FlatList
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

export default ProductsOverviewScreen;
