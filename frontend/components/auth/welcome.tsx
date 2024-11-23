import { StyleSheet, Text, View, TouchableOpacity } from "react-native";

export default function Welcome({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.welcomeText}>Welcome</Text>
      <TouchableOpacity
        style={styles.loginButton}
        onPress={() => navigation.navigate("login")}
      >
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <TouchableOpacity
        style={styles.signupButton}
        onPress={() => navigation.navigate("signup")}
      >
        <Text style={styles.buttonText}>Sign up</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#000",
    alignItems: "center",
    justifyContent: "center",
  },
  welcomeText: {
    color: "#FFF",
    fontSize: 54,
    fontWeight: "bold",
    marginBottom: 90,
  },
  loginButton: {
    backgroundColor: "#00C896",
    paddingVertical: 15,
    paddingHorizontal: 60,
    borderRadius: 25,
    marginBottom: 20,
  },
  signupButton: {
    backgroundColor: "#FF007F",
    paddingVertical: 15,
    paddingHorizontal: 55,
    borderRadius: 25,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
  },
});
