import React, { useState, useCallback, useEffect } from "react";
import { View, Text, StyleSheet, ScrollView, TextInput } from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { createProduct, editProduct } from "../../redux/actions/products";

const INITIAL_STATE = {
  title: "",
  imageUrl: "",
  description: "",
  price: "",
};

const EditProductScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const userProducts = useSelector(
    ({ products: { userProducts } }) => userProducts
  );
  const editingProduct =
    route.params && route.params.id
      ? userProducts.find((product) => product.id === route.params.id)
      : null;

  const [formData, setFormData] = useState(
    editingProduct
      ? {
          title: editingProduct.title,
          imageUrl: editingProduct.imageUrl,
          description: editingProduct.description,
          price: `${editingProduct.price}`,
        }
      : INITIAL_STATE
  );

  const handleSubmit = useCallback(() => {
    if (editingProduct) {
      dispatch(editProduct(route.params.id, formData));
      navigation.goBack();
    } else {
      dispatch(createProduct(formData));
      navigation.goBack();
    }
  }, [formData]);

  useEffect(() => {
    navigation.setParams({ handleSubmit });
  }, [handleSubmit]);

  const { title, imageUrl, description, price } = formData;

  return (
    <ScrollView>
      <View style={styles.form}>
        <View style={styles.formControl}>
          <Text style={styles.label}>Title</Text>
          <TextInput
            style={styles.input}
            value={title}
            onChangeText={(newVal) =>
              setFormData((prev) => ({ ...prev, title: newVal }))
            }
          />
        </View>
        <View style={styles.formControl}>
          <Text style={styles.label}>Image URL</Text>
          <TextInput
            style={styles.input}
            value={imageUrl}
            onChangeText={(newVal) =>
              setFormData((prev) => ({ ...prev, imageUrl: newVal }))
            }
          />
        </View>
        {!(route.params && route.params.id) && (
          <View style={styles.formControl}>
            <Text style={styles.label}>Price</Text>
            <TextInput
              style={styles.input}
              value={`${price}`}
              onChangeText={(newVal) =>
                setFormData((prev) => ({ ...prev, price: newVal }))
              }
            />
          </View>
        )}
        <View style={styles.formControl}>
          <Text style={styles.label}>Description</Text>
          <TextInput
            style={styles.input}
            value={description}
            onChangeText={(newVal) =>
              setFormData((prev) => ({ ...prev, description: newVal }))
            }
          />
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 20,
  },
  formControl: {
    width: "100%",
  },
  label: {
    fontFamily: "open-sans-bold",
    marginVertical: 8,
  },
  input: {
    paddingHorizontal: 2,
    paddingVertical: 5,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
});

export default EditProductScreen;
