import React, { useState } from "react";
import {
  TextInput,
  View,
  Text,
  ScrollView,
  KeyboardAvoidingView,
  StyleSheet,
  Button,
  Alert,
  ActivityIndicator,
} from "react-native";

import Theme from "../../constants/Theme";
import { LinearGradient } from "expo-linear-gradient";
import { useDispatch } from "react-redux";
import { signup, signin } from "../../redux/actions/auth";

const AuthScreen = ({ navigation }) => {
  const [isSignupMode, setIsSignupMode] = useState(true);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailErr, setEmailErr] = useState("");
  const [passwordErr, setPasswordErr] = useState("");
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState("");

  const dispatch = useDispatch();

  navigation.setOptions({
    headerTitle: isSignupMode ? "Please Sign Up" : "Please log In",
    headerTitleStyle: {
      color: Theme.primary,
    },
  });

  const hadleEmail = (newVal) => {
    if (
      !/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i.test(
        newVal
      )
    ) {
      setEmailErr("Please enter a valid email.");
    } else {
      setEmailErr("");
    }
    setEmail(newVal);
  };

  const handlePassword = (newVal) => {
    if (newVal.length < 6) {
      setPasswordErr("Password must be at least 6 characters long.");
    } else {
      setPasswordErr("");
    }
    setPassword(newVal);
  };

  const handleAuth = async () => {
    if (!(email && password && !emailErr && !passwordErr)) {
      return Alert.alert(
        "Invalid Inputs",
        "Please make sure your inputs are valid",
        [{ text: "Okay", style: "default" }]
      );
    }

    setLoading(true);
    try {
      await dispatch(
        isSignupMode ? signup(email, password) : signin(email, password)
      );
    } catch (error) {
      setErr(error.message);
      setLoading(false);
    }
  };

  if (err) {
    Alert.alert("Somthing went wrong", err, [
      { text: "Okay", style: "default" },
    ]);
    return setErr("");
  }

  return (
    <KeyboardAvoidingView
      style={styles.screen}
      behavior="padding"
      keyboardVerticalOffset={50}
    >
      <LinearGradient colors={["#845EC2", "#008F7A"]} style={styles.gradient}>
        <View style={styles.container}>
          <ScrollView>
            <View style={styles.formControl}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                keyboardType="email-address"
                autoCapitalize="none"
                onChangeText={hadleEmail}
                value={email}
                style={styles.input}
              />
              {!!emailErr && <Text style={styles.error}>{emailErr}</Text>}
            </View>
            <View style={styles.formControl}>
              <Text style={styles.label}>Password</Text>
              <TextInput
                keyboardType="default"
                secureTextEntry
                autoCapitalize="none"
                onChangeText={handlePassword}
                value={password}
                style={styles.input}
              />
              {!!passwordErr && <Text style={styles.error}>{passwordErr}</Text>}
            </View>
            <View style={styles.action}>
              {loading ? (
                <ActivityIndicator size="small" color={Theme.primary} />
              ) : (
                <Button
                  title={isSignupMode ? "Sign up" : "Log in"}
                  color={Theme.primary}
                  onPress={handleAuth}
                />
              )}
            </View>
            <View style={styles.action}>
              <Button
                disabled={loading}
                title={isSignupMode ? "Swich to Sign in" : "Swich to Sign up"}
                color={Theme.secondary}
                onPress={() => setIsSignupMode((prev) => !prev)}
              />
            </View>
          </ScrollView>
        </View>
      </LinearGradient>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  gradient: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    ...Theme.shadow1,
    borderRadius: 10,
    backgroundColor: "#fff",
    padding: 20,
    width: "85%",
    maxWidth: 400,
    maxHeight: 400,
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
  error: {
    color: "red",
    fontSize: 12,
    fontFamily: "open-sans",
  },
  action: {
    marginTop: 10,
  },
});

export default AuthScreen;
