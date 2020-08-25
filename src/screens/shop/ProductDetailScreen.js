import React from "react";
import {
  View,
  Text,
  Image,
  Button,
  StyleSheet,
  ScrollView,
} from "react-native";
import Theme from "../../constants/Theme";

const ProductDetailScreen = ({ route, navigation }) => {
  navigation.setOptions({
    headerTitle: route.params.product.title,
  });

  return (
    <ScrollView>
      <Image
        style={styles.image}
        source={{ uri: route.params.product.imageUrl }}
      />
      <View style={styles.action}>
        <Button color={Theme.primary} title="Add to cart" />
      </View>
      <Text style={styles.price}>${route.params.product.price}</Text>
      <Text style={styles.description}>{route.params.product.description}</Text>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  image: {
    width: "100%",
    height: 300,
  },
  price: {
    fontSize: 20,
    color: "#888",
    textAlign: "center",
    marginVertical: 20,
    fontFamily: "open-sans-bold",
  },
  description: {
    fontSize: 14,
    textAlign: "center",
    marginHorizontal: 25,
    fontFamily: "open-sans",
  },
  action: {
    marginVertical: 10,
    alignItems: "center",
  },
});

export default ProductDetailScreen;
