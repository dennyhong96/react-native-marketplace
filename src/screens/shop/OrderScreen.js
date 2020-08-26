import React from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import { useSelector } from "react-redux";

import OrderItem from "../../components/shop/OrderItem";

const OrderScreen = ({ navigation, route }) => {
  const orders = useSelector(({ orders }) => orders);

  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderItem order={item} />}
    />
  );
};

const styles = StyleSheet.create({});

export default OrderScreen;
