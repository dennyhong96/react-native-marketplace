import React from "react";
import { View, Text, StyleSheet, Button, FlatList } from "react-native";
import { useSelector } from "react-redux";

const OrderScreen = ({ navigation, route }) => {
  const orders = useSelector(({ orders }) => orders);

  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => (
        <View>
          <Text>
            {item.id}-{item.totalAmount}
          </Text>
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({});

export default OrderScreen;
