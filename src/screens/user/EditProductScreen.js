import React, { useState, useCallback, useEffect, useRef } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TextInput,
  Alert,
  KeyboardAvoidingView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";

import { createProduct, editProduct } from "../../redux/actions/products";

const INITIAL_FORM = {
  title: "",
  imageUrl: "",
  description: "",
  price: "",
};

const INITIAL_ERROR = {
  titleErr: "",
  imageUrlErr: "",
  priceErr: "",
  descriptionErr: "",
};

const EditProductScreen = ({ navigation, route }) => {
  const dispatch = useDispatch();
  const userProducts = useSelector(
    ({ products: { userProducts } }) => userProducts
  );

  const imageUrlRef = useRef();
  const descriptionRef = useRef();
  const priceRef = useRef();

  // Get current product that is being edited
  const editingProduct =
    route.params && route.params.id
      ? userProducts.find((product) => product.id === route.params.id)
      : null;

  // Set up initial form and error states
  const [formData, setFormData] = useState(
    editingProduct
      ? {
          title: editingProduct.title,
          imageUrl: editingProduct.imageUrl,
          description: editingProduct.description,
          price: `${editingProduct.price}`,
        }
      : INITIAL_FORM
  );
  const [errors, setErrors] = useState(INITIAL_ERROR);

  const { title, imageUrl, description, price } = formData;
  const { titleErr, imageUrlErr, priceErr, descriptionErr } = errors;

  // Handle saving changes and add products
  const handleSubmit = useCallback(() => {
    // Check for input errors
    if (titleErr || imageUrlErr || priceErr || descriptionErr) {
      Alert.alert("Invalid Inputs.", "Please make sure your input is valid.", [
        { text: "Okay", style: "default" },
      ]);
      return;
    }

    if (editingProduct) {
      // Check for empty fields
      if (!(title && imageUrl && description)) {
        Alert.alert("Invalid Inputs.", "All fields are required.", [
          { text: "Okay", style: "default" },
        ]);
        return;
      }

      // Edit product
      dispatch(editProduct(route.params.id, formData));
      navigation.goBack();
    } else {
      // Check for empty fields
      if (!(title && imageUrl && price && description)) {
        Alert.alert("Invalid Inputs.", "All fields are required.", [
          { text: "Okay", style: "default" },
        ]);
        return;
      }

      // Add product
      dispatch(createProduct(formData));
      navigation.goBack();
    }
  }, [formData, errors]);

  useEffect(() => {
    // Set handle submit as nav params to call from header btn
    navigation.setParams({ handleSubmit });
  }, [handleSubmit]);

  return (
    <KeyboardAvoidingView
      behavior="padding"
      keyboardVerticalOffset={100}
      style={{ flex: 1 }}
    >
      <ScrollView>
        <View style={styles.form}>
          <View style={styles.formControl}>
            <Text style={styles.label}>Title</Text>
            <TextInput
              returnKeyType="next"
              onSubmitEditing={() => imageUrlRef.current.focus()}
              autoCapitalize="sentences"
              autoCorrect={false}
              style={styles.input}
              value={title}
              onChangeText={(newVal) => {
                if (newVal.length < 1) {
                  setErrors((prev) => ({
                    ...prev,
                    titleErr: "Please enter a valid title",
                  }));
                } else {
                  setErrors((prev) => ({ ...prev, titleErr: "" }));
                }
                setFormData((prev) => ({ ...prev, title: newVal }));
              }}
            />
            {!!titleErr && <Text style={{ color: "red" }}>{titleErr}</Text>}
          </View>
          <View style={styles.formControl}>
            <Text style={styles.label}>Image URL</Text>
            <TextInput
              ref={imageUrlRef}
              returnKeyType="next"
              onSubmitEditing={() =>
                editingProduct
                  ? descriptionRef.current.focus()
                  : priceRef.current.focus()
              }
              style={styles.input}
              value={imageUrl}
              onChangeText={(newVal) => {
                if (newVal.length < 1) {
                  setErrors((prev) => ({
                    ...prev,
                    imageUrlErr: "Please enter a valid Image Url",
                  }));
                } else {
                  setErrors((prev) => ({ ...prev, imageUrlErr: "" }));
                }
                setFormData((prev) => ({ ...prev, imageUrl: newVal }));
              }}
            />
            {!!imageUrlErr && (
              <Text style={{ color: "red" }}>{imageUrlErr}</Text>
            )}
          </View>
          {!(route.params && route.params.id) && (
            <View style={styles.formControl}>
              <Text style={styles.label}>Price</Text>
              <TextInput
                ref={priceRef}
                onEndEditing={() => descriptionRef.current.focus()}
                style={styles.input}
                keyboardType="decimal-pad"
                value={`${price}`}
                onChangeText={(newVal) => {
                  if (newVal <= 0) {
                    setErrors((prev) => ({
                      ...prev,
                      priceErr: "Price must be greater than 0",
                    }));
                  } else {
                    setErrors((prev) => ({ ...prev, priceErr: "" }));
                  }

                  setFormData((prev) => ({ ...prev, price: newVal }));
                }}
              />
              {!!priceErr && <Text style={{ color: "red" }}>{priceErr}</Text>}
            </View>
          )}
          <View style={styles.formControl}>
            <Text style={styles.label}>Description</Text>
            <TextInput
              multiline
              numberOfLines={3}
              ref={descriptionRef}
              style={styles.input}
              value={description}
              onChangeText={(newVal) => {
                if (newVal <= 0) {
                  setErrors((prev) => ({
                    ...prev,
                    descriptionErr: "A description is required",
                  }));
                } else {
                  setErrors((prev) => ({ ...prev, descriptionErr: "" }));
                }
                setFormData((prev) => ({ ...prev, description: newVal }));
              }}
            />
            {!!descriptionErr && (
              <Text style={{ color: "red" }}>{descriptionErr}</Text>
            )}
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
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
