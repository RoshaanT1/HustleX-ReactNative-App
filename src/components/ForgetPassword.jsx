import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity } from 'react-native';

const ForgotPassword = ({ navigation }) => {
    const [email, setEmail] = useState('');

    const handleForgotPassword = () => {
        console.log('Forgot password for:', email);
        // Implement logic to send reset password email or link
        navigation.navigate('Login'); // Navigate back to login after sending reset link
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>HustleX</Text>

            <Text style={styles.label}>Email</Text>
            <View style={styles.mobileInputContainer}>
                <TextInput
                    style={[styles.input]}
                    placeholder="User@gmail.com"
                    placeholderTextColor="#808080"
                    keyboardType="email"
                    value={email}
                    onChangeText={setEmail}
                />
            </View>

            <TouchableOpacity style={styles.button} onPress={handleForgotPassword}>
                <Text style={styles.buttonText}>Send Reset Link</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.backToLoginButton} onPress={()=>navigation.navigate('Login')}>
                <Text style={styles.backToLoginText}>Back to Login</Text>
            </TouchableOpacity>

            <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Don't have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
                    <Text style={styles.signupLink}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        padding: 20,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 30, // Adjusted margin
    },
    label: {
        fontSize: 14,
        color: '#000000',
        marginBottom: 5, // Spacing between label and input
        alignSelf: 'flex-start', // Align label to the left
    },
    input: {
        width: '100%',
        backgroundColor: '#F2F2F2',
        padding: 11,
        borderRadius: 5,
        fontSize: 16,
        color: '#000000',
        borderColor: '#D3D3D3',
        borderWidth: 1,
    },
    mobileInputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 45, // Further reduced height
        marginBottom: 15, // Adjusted margin
        borderColor: '#D3D3D3',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#F2F2F2',
    },
    button: {
        width: '100%',
        backgroundColor: '#000000',
        padding: 14, // Adjusted padding
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18, // Adjusted font
        fontWeight: 'bold',
    },
    backToLoginButton: {
        marginTop: 20, // Adjusted margin
    },
    backToLoginText: {
        color: '#808080',
        fontSize: 14, // Adjusted font
    },
    signupContainer: {
        flexDirection: 'row',
        marginTop: 25, // Adjusted margin
    },
    signupText: {
        fontSize: 14, // Adjusted font
        color: '#000000',
    },
    signupLink: {
        fontSize: 14, // Adjusted font
        color: '#000000',
        fontWeight: 'bold',
    },
});

export default ForgotPassword;
