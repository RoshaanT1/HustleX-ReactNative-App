import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Platform } from 'react-native';

const LoginScreen = ({navigation}) => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = () => {
        // Implement your login logic here
        console.log('Login with:', mobileNumber, password);
        navigation.navigate('Main')
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>HustleX</Text>

            <Text style={styles.label}>Phone Number</Text>
            <View style={styles.mobileInputContainer}>
                <View style={styles.countryCodeContainer}>
                    <Text style={styles.countryCode}>+92</Text>
                </View>
                <TextInput
                    style={[styles.input, styles.mobileInput]}
                    placeholder="3331231231"
                    placeholderTextColor="#808080"
                    keyboardType="phone-pad"
                    value={mobileNumber}
                    onChangeText={setMobileNumber}
                    maxLength={10}
                />
            </View>

            <Text style={styles.label}>Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#808080"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
            />

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Login</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.forgotPasswordButton}>
                <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
            </TouchableOpacity>

            <View style={styles.signupContainer}>
                <Text style={styles.signupText}>Don't have an account? </Text>
                <TouchableOpacity>
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
        padding: Platform.OS === 'ios' ? 14 : 10, // Adjusted padding
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
    countryCodeContainer: {
        paddingHorizontal: 8, // Further reduced padding
        borderRightWidth: 1,
        borderColor: '#D3D3D3',
        height: '100%',
        justifyContent: 'center',
        width: 50, // Further reduced width
    },
    countryCode: {
        fontSize: 14, // Further reduced font
        color: '#000000',
        textAlign: 'center',
    },
    mobileInput: {
        flex: 1,
        paddingVertical: 8, // Further adjusted padding
        fontSize: 16,
        color: '#000000',
        paddingLeft: 8, // Further reduced padding
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
    forgotPasswordButton: {
        marginTop: 20, // Adjusted margin
    },
    forgotPasswordText: {
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

export default LoginScreen;
