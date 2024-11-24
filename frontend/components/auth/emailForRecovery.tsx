import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from "react-native"
import LoadingScreen from "../utils/loadingScreen";

const EmailForRecovery = ({ navigation }) => {
    const [email, setEmail] = useState("");
    const [isLoadingScreen, setIsLoading] = useState(false);

    const validateEmail = () => {
        const validEmail = "test@gmail.com";
        setIsLoading(true)
        setTimeout(() => {
            if (email === validEmail){
                navigation.navigate("passRecovery", {
                    navigation: navigation,
                    email: email
                });
            } else{
                alert("Invalid email.")
                setIsLoading(false);
            }
        }, 2000);
    }

    return (
        !isLoadingScreen ? <View style={styles.container}>
            <Text style={styles.title}>Forgot password</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={styles.input}
                    value={email}
                    onChangeText={setEmail}
                    placeholder="Enter your email"
                    placeholderTextColor="#aaa"
                />
            </View>

            <View style={styles.buttonContainer}>
                <TouchableOpacity 
                    style={styles.confirmButton}
                    onPress={() => validateEmail()}
                    >
                    <Text style={styles.buttonText}>Confirm</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={styles.backButton}
                    onPress={() => navigation.goBack()}
                >
                    <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
            </View>
        </View> : <LoadingScreen message={"Verifying email..."} />
    )
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#000",
        alignItems: "center",
        justifyContent: 'center',
        paddingHorizontal: 20
    },
    title: {
        color: "#FFF",
        fontSize: 36,
        fontWeight: "bold",
        marginBottom: 40
    },
    inputContainer: {
        width: "100%",
        marginBottom: 20
    },
    label: {
        color: "#FFF",
        fontSize: 16,
        marginBottom: 5
    },
    input: {
        backgroundColor: '#222',
        color: '#FFF',
        borderWidth: 1,
        borderColor: '#444',
        borderRadius: 8,
        padding: 10,
        fontSize: 16
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

export default EmailForRecovery;