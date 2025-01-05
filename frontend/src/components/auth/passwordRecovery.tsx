import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import LoadingScreen from '../utils/loadingScreen';
import Toast from 'react-native-toast-message';
import { UserAPI } from '@/src/utils/api';

const PasswordRecovery = ({ route }) => {
  const [code, setCode] = useState(['', '', '', '']); // Code à 4 chiffres
  const [loadingScreen, setLoadingScreen] = useState(false);
  const { navigation, email } = route.params;

  // Create refs for each input
  const inputRefs = useRef([]);

  const handleCodeChange = (value, index) => {
    if (value.length > 1) return; // Ensure single character input

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Move to the next input only if a value is entered
    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleBackspace = (index) => {
    if (index > 0 && code[index] === '') {
      // Move to the previous input if the current one is empty
      inputRefs.current[index - 1].focus();
    }

    // Clear the current input
    const newCode = [...code];
    newCode[index] = '';
    setCode(newCode);
  };

  const validateCode = () => {
    const data = {
      email: email,
      code: code.join('')
    }
    UserAPI.validateVerificationCode(data, setLoadingScreen)
    .then((response) => {
      if (response) {
        navigation.navigate("resetPassword",
          {
            navigation: navigation,
            email: email
          }
        );
      } else {
        Toast.show({
          type: "error",
          text1: "Error",
          text2: "Invalid code. Please try again.",
        });
      }
    })
    .catch((error) => {
      console.error('An error occured', error);
      Toast.show({
        type: "error",
        text1: "Error",
        text2: "System error.",
      });
    })

    // setLoadingScreen(true);
    // setTimeout(() => {
    //   if (code.join('') === validCode) {
    //     navigation.navigate("resetPassword");
    //   } else {
    //     alert("Invalid code, try again.");
    //     setLoadingScreen(false);
    //   }
    // }, 2000);
  };

  return !loadingScreen ? (
    <View style={styles.container}>
      <Text style={styles.title}>
        <Icon name="lock-open-outline" size={30} color="#FF007F" /> Password Recovery
      </Text>
      <Text style={styles.subtitle}>Enter the code sent to {email}</Text>

      {/* Code Input */}
      <View style={styles.codeContainer}>
        {code.map((digit, index) => (
          <TextInput
            key={index}
            ref={(el) => (inputRefs.current[index] = el)} // Assign ref to each input
            style={styles.codeInput}
            value={digit}
            onChangeText={(value) => handleCodeChange(value, index)}
            maxLength={1}
            keyboardType="numeric"
            returnKeyType="next"
            onKeyPress={({ nativeEvent }) => {
              if (nativeEvent.key === 'Backspace') {
                handleBackspace(index); // Handle backspace deletion
              }
            }}
          />
        ))}
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.confirmButton}
          onPress={validateCode}
        >
          <Text style={styles.buttonText}>Confirm</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.newCodeButton}>
          <Icon name="paper-plane-outline" size={20} color="#FFF" />
          <Text style={styles.buttonText}>New code</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cancelButton} onPress={() => navigation.navigate('login')}>
          <Text style={styles.buttonText}>Cancel</Text>
        </TouchableOpacity>
      </View>
    </View>
  ) : (
    <LoadingScreen message={"Verifying code..."} />
  );
};

export default PasswordRecovery;

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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },
  subtitle: {
    color: '#FFF',
    fontSize: 16,
    marginBottom: 30,
  },
  codeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
    width: '80%',
  },
  codeInput: {
    backgroundColor: '#222',
    color: '#FFF',
    fontSize: 18,
    textAlign: 'center',
    borderWidth: 1,
    borderColor: '#444',
    borderRadius: 8,
    width: 50,
    height: 50,
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    marginTop: 40,
  },
  confirmButton: {
    backgroundColor: '#00C896',
    paddingHorizontal: 50,
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 20,
  },
  newCodeButton: {
    backgroundColor: '#FFC107',
    paddingHorizontal: 35,
    paddingVertical: 15,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  cancelButton: {
    backgroundColor: '#FF0000',
    paddingHorizontal: 55,
    paddingVertical: 15,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: '#FFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
