import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from "react-native";
import LoadingScreen from '../utils/loadingScreen';
import { useAuth } from '@/hooks/useAuth';
import Toast from 'react-native-toast-message';

const Login = ({ navigation }) => {
    const [passwordVisible, setPasswordVisible] = useState(false);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [actualUserEmail, setActualUserEmail] = useState("email@gmail.com");
    const [isLoading, setLoading] = useState(false);
    const { login, isAuthenticated, user } = useAuth();

    const handleLogin = async () => {
      try {
        const success = await login(username, password, setLoading);
        if (success) {
          navigation.navigate("home");
        } else {
          Toast.show({
            type: 'error',
            text1: 'Authentication Failed',
            text2: 'Incorrect username or password. Please try again.',
          });
        }
      } catch (error) {
        // console.error('An error occured', error)
        Toast.show({
          type: 'error',
          text1: 'Authentication Failed',
          text2: 'An error occured.',
        });
      }
    };
  
    return (
      !isLoading ? <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
  
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
  
        {/* Password Input */}
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Password</Text>
          {/* <View style={styles.passwordWrapper}> */}
          <View>
            <TextInput
              style={styles.input}
              value={password}
              onChangeText={setPassword}
              placeholder="Enter your password"
              placeholderTextColor="#aaa"
              secureTextEntry={!passwordVisible}
            />
            {/* <TouchableOpacity
              onPress={() => setPasswordVisible(!passwordVisible)}
              style={styles.eyeIcon}
            >
              <Icon
                name={passwordVisible ? 'eye-off' : 'eye'}
                size={20}
                color="#FF007F"
              />
            </TouchableOpacity> */}
          </View>
        </View>
  
        {/* Forgot Password */}
        <TouchableOpacity>
          <Text style={styles.forgotPassword}
            onPress={() => navigation.navigate("emailForRecovery", {
              navigation: navigation,
              email: actualUserEmail
            })}
          >Forgot password?</Text>
        </TouchableOpacity>
  
        {/* Confirm and Back Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.confirmButton}
            onPress={() => handleLogin()}
            >
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.backButton}
            onPress={() => navigation.popToTop()}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>: <LoadingScreen message={"Loging in..."} />
    );
};

export default Login;
  
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
    passwordWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    eyeIcon: {
      position: 'absolute',
      right: 10,
    },
    forgotPassword: {
      color: '#FF007F',
      fontSize: 14,
      marginTop: 10,
      textDecorationLine: 'underline',
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