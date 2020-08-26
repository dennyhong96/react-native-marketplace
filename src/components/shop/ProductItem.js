import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  TouchableNativeFeedback,
  Platform,
} from "react-native";

import Theme from "../../constants/Theme";

const ProductItem = ({ product, onSelect, children }) => {
  // For android ripple effect
  let TouchableCmp = TouchableOpacity;
  if (Platform.OS === "android" && Platform.Version >= 21) {
    TouchableCmp = TouchableNativeFeedback;
  }

  return (
    <View style={styles.product}>
      <View style={styles.touchable}>
        <TouchableCmp onPress={onSelect} useForeground>
          <View style={styles.imgContainer}>
            <Image source={{ uri: product.imageUrl }} style={styles.image} />
          </View>
          <View style={styles.details}>
            <Text style={styles.title}>{product.title}</Text>
            <Text style={styles.price}>${product.price.toFixed(2)}</Text>
          </View>
          <View style={styles.actions}>{children}</View>
        </TouchableCmp>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  imgContainer: {
    width: "100%",
    height: "60%",
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    overflow: "hidden",
  },
  touchable: {
    overflow: "hidden",
    borderRadius: 10,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  details: {
    alignItems: "center",
    height: "15%",
    padding: 10,
  },
  title: {
    fontSize: 18,
    marginVertical: 2,
    fontFamily: "open-sans-bold",
  },
  price: {
    fontFamily: "open-sans",
    fontSize: 14,
    color: 888,
  },
  product: {
    ...Theme.shadow1,
    borderRadius: 10,
    backgroundColor: "#fff",
    height: 300,
    margin: 20,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-between",
    height: "25%",
    paddingHorizontal: 20,
  },
});

export default ProductItem;
