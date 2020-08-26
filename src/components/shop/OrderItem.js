import React, { useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";

import CartItem from "./CartItem";
import Theme from "../../constants/Theme";

const OrderItem = ({ order }) => {
  const [showDetail, setShowDetail] = useState(false);
  return (
    <View style={styles.orderItem}>
      <View style={styles.summary}>
        <Text style={styles.totalAmount}>${order.totalAmount.toFixed(2)}</Text>
        <Text style={styles.date}>{order.readableDate}</Text>
      </View>
      <Button
        color={Theme.primary}
        title={`${showDetail ? "Hide Details" : "Show Details"}`}
        onPress={() => setShowDetail((prev) => !prev)}
      />
      {showDetail && (
        <View>
          {order.items.map((item, idx) => (
            <CartItem
              key={`${item.productTitle}-${idx}-${item.id}`}
              item={item}
            />
          ))}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  orderItem: {
    ...Theme.shadow1,
    borderRadius: 10,
    backgroundColor: "#fff",
    margin: 20,
    padding: 10,
  },
  summary: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    marginBottom: 15,
  },
  totalAmount: {
    fontFamily: "open-sans-bold",
    fontSize: 16,
  },
  date: {
    fontSize: 16,
    fontFamily: "open-sans",
    color: "#888",
  },
});

export default OrderItem;
