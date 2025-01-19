import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { authAPI } from '@/src/utils/api';

const SignUp = ({ navigation }) => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);

  const validateSignUp = () => {
    const data = {
      username: username,
      email: email,
      password: password
    }

    authAPI.signup(data).then(
      (data) => {
        navigation.navigate("login")
      }
    ).catch((error) => {
        console.error('Error creating account:', error);
    });
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Sign up</Text>

      {/* Username Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Username</Text>
        <TextInput
          style={styles.input}
          value={username}
          onChangeText={setUsername}
          placeholder="Enter your username"
          placeholderTextColor="#aaa"
        />
      </View>

      {/* Email Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Email</Text>
        <TextInput
          style={styles.input}
          value={email}
          onChangeText={setEmail}
          placeholder="Enter your email"
          placeholderTextColor="#aaa"
          keyboardType="email-address"
        />
      </View>

      {/* Password Input */}
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Password</Text>
        <TextInput
            style={styles.input}
            value={password}
            onChangeText={setPassword}
            placeholder="Enter your password"
            placeholderTextColor="#aaa"
            secureTextEntry={!passwordVisible}
        />
      </View>
        
      {/* Confirm and Back Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.confirmButton}
          onPress={() => validateSignUp()}
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.backButton} 
          onPress={() => navigation.goBack("welcome")}
        >
          <Text style={styles.buttonText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

export default SignUp;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 20,
  },
  title: {
    color: '#FFF',
    fontSize: 36,
    fontWeight: 'bold',
    marginBottom: 40,
  },
  inputContainer: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 5,
  },
  input: {
    backgroundColor: '#222',
    color: '#FFF',
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 8,
    padding: 10,
    fontSize: 16,
  },
  eyeIcon: {
    marginLeft: 10,
  },
  buttonContainer: {
    marginTop: 30,
    width: '100%',
    alignItems: 'center',
  },
  confirmButton: {
    backgroundColor: '#00C896',
    width: '80%',
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#FF007F',
    width: '80%',
    paddingHorizontal: 60,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
