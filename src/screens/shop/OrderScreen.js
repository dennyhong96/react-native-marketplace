import React, { useEffect, useState, useCallback } from "react";
import {
  View,
  Text,
  StyleSheet,
  Button,
  FlatList,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import OrderItem from "../../components/shop/OrderItem";
import { listOrders } from "../../redux/actions/orders";
import Theme from "../../constants/Theme";

const OrderScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const orders = useSelector(({ orders }) => orders);
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState(false);

  const fetchOrders = useCallback(async () => {
    setErr(false);
    setLoading(true);
    try {
      await dispatch(listOrders());
    } catch (error) {
      setErr(true);
    }
    setLoading(false);
  }, [setLoading, setErr, dispatch]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchOrders);
    return unsubscribe;
  });

  if (loading) {
    return (
      <View style={styles.centered}>
        <ActivityIndicator size="large" color={Theme.primary} />
      </View>
    );
  }

  if (err) {
    return (
      <View style={styles.centered}>
        <Text style={{ color: "red", fontFamily: "open-sans-bold" }}>
          Something went wrong while loading your orders.
        </Text>
        <Button
          title="Try again"
          color={Theme.secondary}
          onPress={fetchOrders}
        />
      </View>
    );
  }

  if (!err && !orders.length) {
    return (
      <View style={styles.centered}>
        <Text style={{ fontFamily: "open-sans-bold" }}>
          No orders found, please add some...
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={orders}
      renderItem={({ item }) => <OrderItem order={item} />}
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

export default OrderScreen;
