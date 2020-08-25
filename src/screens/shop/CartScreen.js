import React from "react";
import { View, Text, StyleSheet, FlatList, Button } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { removeFromCart } from "../../redux/actions/carts";
import Theme from "../../constants/Theme";
import CartItem from "../../components/shop/CartItem";

const CartScreen = () => {
  const dispatch = useDispatch();
  const totalAmount = useSelector(({ carts: { totalAmount } }) => totalAmount);
  const cartItems = useSelector(({ carts: { items } }) =>
    Object.keys(items).map((key) => ({ productId: key, ...items[key] }))
  );

  return (
    <View style={styles.screen}>
      <View style={styles.summary}>
        <Text style={styles.summaryText}>
          Total:{" "}
          <Text style={styles.amount}>${Math.abs(totalAmount.toFixed(2))}</Text>
        </Text>
        <Button
          disabled={!cartItems.length}
          color={Theme.secondary}
          title="Order Now"
        />
      </View>
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.productId}
        renderItem={({ item }) => (
          <CartItem
            item={item}
            onDelete={() => dispatch(removeFromCart(item.productId))}
          />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  screen: {
    margin: 20,
  },
  summary: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
    padding: 10,
    ...Theme.shadow1,
    borderRadius: 10,
    backgroundColor: "#fff",
  },
  summaryText: {
    fontFamily: "open-sans-bold",
    fontSize: 18,
  },
  amount: {
    color: Theme.primary,
  },
});

export default CartScreen;
