import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, TextInput } from "react-native";
import LoadingScreen from '../utils/loadingScreen';
import Toast from 'react-native-toast-message';
import { UserAPI } from '@/src/utils/api';

const ResetPassword = ({ route }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { navigation, email } = route.params;

    const handleConfirm = () => {
      setIsLoading(true);
      if (newPassword !== confirmNewPassword || newPassword === "") {
        Toast.show({
          type: 'error',
          text1: 'Invalid password'
        });
        setIsLoading(false);
      } else {
        const data = {
          password: newPassword
        }
        UserAPI.updateUser(email, data)
        .then((response) => {
          setIsLoading(false);
          navigation.navigate("login");
        })
        .catch((error) => {
          console.error('An error occured', error);
          Toast.show({
            type: 'error',
            text1: 'An error occured'
          });
        })
      }
    };
  
    return (
      !isLoading ? <View style={styles.container}>
        <Text style={styles.title}>Reset Password</Text>
  
        <View style={styles.inputContainer}>
          <Text style={styles.label}>New Password</Text>
          <TextInput
            style={styles.input}
            onChangeText={setNewPassword}
            placeholder="Enter your new password"
            placeholderTextColor="#aaa"
            secureTextEntry={true}
          />
        </View>
  
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Confirm new password</Text>
          <View>
            <TextInput
              style={styles.input}
              onChangeText={setConfirmNewPassword}
              placeholder="Enter your new password again"
              placeholderTextColor="#aaa"
              secureTextEntry={true}
            />
          </View>
        </View>
  
        {/* Confirm and Back Buttons */}
        <View style={styles.buttonContainer}>
          <TouchableOpacity 
            style={styles.confirmButton}
            onPress={handleConfirm}
            >
            <Text style={styles.buttonText}>Confirm</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.backButton}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>
      </View> : <LoadingScreen message={"Reseting password..."} />
    );
};

export default ResetPassword;
  
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