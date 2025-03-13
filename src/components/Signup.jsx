import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Platform } from 'react-native';

const Signup = ({navigation}) => {
    const [mobileNumber, setMobileNumber] = useState('');
    const [password, setPassword] = useState('');
    const [confpassword, setConfPassword] = useState('');
    const [error, setError] = useState('');
    const handleLogin = () => {
        if(password === confpassword){
            setError('');
            console.log('Login with:', mobileNumber, password);
            navigation.navigate('Main')
        }
        else
        setError('Passwords do not match')
    };

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Signup</Text>

            {/* <Text style={styles.label}>Phone Number</Text> */}
            {/* <View style={styles.mobileInputContainer}>
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
                    </View> */}
            <Text style={styles.label}>Email</Text>
            <View style={styles.mobileInputContainer}>
                <TextInput
                    style={[styles.input]}
                    placeholder="User@gmail.com"
                    placeholderTextColor="#808080"
                    keyboardType="email"
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

            <Text style={styles.label2}>Confirm Password</Text>
            <TextInput
                style={styles.input}
                placeholder="Confirm Password"
                placeholderTextColor="#808080"
                secureTextEntry
                value={confpassword}
                onChangeText={setConfPassword}
            />

            {error ? <Text style={styles.errorText}>{error}</Text> : null}
            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>Signup</Text>
            </TouchableOpacity>

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
        marginBottom: 30, 
    },
    label: {
        fontSize: 14,
        color: '#000000',
        margin: 5, 
        alignSelf: 'flex-start', 
    },
    label2: {
        fontSize: 14,
        color: '#000000',
        margin: 5, 
        alignSelf: 'flex-start', 
        marginTop:20
    },
    input: {
        width: '100%',
        backgroundColor: '#F2F2F2',
        padding: Platform.OS === 'ios' ? 14 : 10, 
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
        height: 45,
        marginBottom: 15, 
        borderColor: '#D3D3D3',
        borderWidth: 1,
        borderRadius: 5,
        backgroundColor: '#F2F2F2',
    },
    countryCodeContainer: {
        paddingHorizontal: 8, 
        borderRightWidth: 1,
        borderColor: '#D3D3D3',
        height: '100%',
        justifyContent: 'center',
        width: 50, 
    },
    countryCode: {
        fontSize: 14, 
        color: '#000000',
        textAlign: 'center',
    },
    mobileInput: {
        flex: 1,
        paddingVertical: 8, 
        fontSize: 16,
        color: '#000000',
        paddingLeft: 8, 
    },
    button: {
        width: '100%',
        backgroundColor: '#000000',
        padding: 14, 
        borderRadius: 5,
        alignItems: 'center',
        marginTop: 20,
        bottom:'-5%'
    },
    buttonText: {
        color: '#FFFFFF',
        fontSize: 18, 
        fontWeight: 'bold',
    },
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: 10,
        alignSelf: 'flex-start',
    },
});

export default Signup;
