import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native";
import LoadingScreen from "../utils/loadingScreen";
import { UserAPI } from "@/src/utils/api";
import Toast from "react-native-toast-message";

const EmailForRecovery = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const sendCode = async () => {
    if (!email.trim()) {
      Toast.show({
        type: "error",
        text1: "Invalid Email",
        text2: "Please enter a valid email address.",
      });
      return;
    }

    try {
      setIsLoading(true); // Start loading
      const response = await UserAPI.sendVerificationCode(email)
      setIsLoading(false); // Stop loading after API call

      if (response) {
        navigation.navigate("passRecovery", {
            navigation: navigation,
            email: email
        });
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Invalid email. Please try again.",
        });
      }
    } catch (error) {
      console.error("Error sending code:", error);
      setIsLoading(false); // Ensure loading stops even on error
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "Something went wrong. Please try again.",
      });
    }
  };

  return isLoading ? (
    <LoadingScreen message={"Sending email..."} />
  ) : (
    <View style={styles.container}>
      <Text style={styles.title}>Forgot Password</Text>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
          autoCapitalize="none"
        />
      </View>

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={sendCode}
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.backButton}
          onPress={navigation.goBack}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
  },
  title: {
    color: "#FFF",
    fontSize: 36,
    fontWeight: "bold",
    marginBottom: 40,
  },
  inputContainer: {
    width: "100%",
    marginBottom: 20,
  },
  label: {
    color: "#FFF",
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    backgroundColor: "#222",
    color: "#FFF",
    borderWidth: 1,
    borderColor: "#444",
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  buttonContainer: {
    marginTop: 30,
    width: "100%",
    alignItems: "center",
  },
  confirmButton: {
    backgroundColor: "#00C896",
    width: "80%",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: "#FF007F",
    width: "80%",
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default EmailForRecovery;
