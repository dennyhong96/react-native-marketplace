import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";

const CartItem = ({ item, onDelete }) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemData}>
        <Text style={styles.quantity}>{item.quantity} x </Text>
        <Text style={styles.mainTxt}>{item.productTitle}</Text>
      </View>
      <View style={styles.itemData}>
        <Text style={styles.mainTxt}>${item.sum.toFixed(2)}</Text>
        {onDelete && (
          <TouchableOpacity onPress={onDelete} style={styles.deleteBtn}>
            <Feather name="trash-2" size={23} color="red" />
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  cartItem: {
    padding: 10,
    backgroundColor: "#fff",
    flexDirection: "row",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginBottom: 10,
    borderRadius: 5,
  },
  itemData: {
    flexDirection: "row",
    alignContent: "center",
  },
  quantity: {
    fontFamily: "open-sans",
    color: "#888",
    fontSize: 16,
  },
  mainTxt: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  deleteBtn: {
    marginLeft: 5,
  },
});

export default CartItem;
