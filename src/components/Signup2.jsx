import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import Gender from './SettingP/Gender';

const Signup2 = ({ navigation }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [genderModalVisible, setGenderModalVisible] = useState(false);
    const [age, setAge] = useState('')
    const [gender, setGender] = useState('Unspecified')
    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 6; // Minimum 6 characters
    };

    const handleSignup = () => {
        if (!validateEmail(email)) {
            setError('Please enter a valid email address.');
            return;
        }

        if (!validatePassword(password)) {
            setError('Password must be at least 6 characters long.');
            return;
        }

        if (password !== confirmPassword) {
            setError('Passwords do not match.');
            return;
        }

        setError('');
        console.log('Signup with:', email, password);
        navigation.navigate('Main');
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Sign Up</Text>

                {/* Email Input */}
                <Text style={styles.label}>Email</Text>
                <TextInput
                    style={[styles.input, error && !validateEmail(email) && styles.inputError]}
                    placeholder="Enter your email"
                    placeholderTextColor="#808080"
                    keyboardType="email-address"
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                />



                {/* Password Input */}
                {/* <Text style={styles.label}>Age</Text>
                <TextInput
                    style={[styles.input, error && !validatePassword(password) && styles.inputError]}
                    placeholder="25"
                    placeholderTextColor="#808080"
                    keyboardType="phone-pad"
                    maxLength={3}
                    value={age}
                    onChangeText={setAge}
                /> */}
                {/* Password Input */}
                <Text style={styles.label}>Password</Text>
                <TextInput
                    style={[styles.input, error && !validatePassword(password) && styles.inputError]}
                    placeholder="Enter your password"
                    placeholderTextColor="#808080"
                    secureTextEntry
                    value={password}
                    onChangeText={setPassword}
                />

                {/* Confirm Password Input */}
                <Text style={styles.label}>Confirm Password</Text>
                <TextInput
                    style={[styles.input, error && password !== confirmPassword && styles.inputError]}
                    placeholder="Confirm your password"
                    placeholderTextColor="#808080"
                    secureTextEntry
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                />

                {/* Error Message */}
                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                {/* Signup Button */}
                <TouchableOpacity style={styles.button} onPress={handleSignup}>
                    <Text style={styles.buttonText}>Sign Up</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    scrollContainer: {
        flexGrow: 1,
        justifyContent: 'center',
        padding: 20,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000000',
        marginBottom: 30,
        textAlign: 'center',
    },
    label: {
        fontSize: 16,
        color: '#000000',
        marginBottom: 10,
    },
    input: {
        width: '100%',
        backgroundColor: '#F2F2F2',
        padding: 14,
        borderRadius: 8,
        fontSize: 16,
        color: '#000000',
        borderWidth: 1,
        borderColor: '#D3D3D3',
        marginBottom: 20,
    },
    inputError: {
        borderColor: 'red',
    },
    genderContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#F2F2F2',
        padding: 14,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#D3D3D3',
        marginBottom: 20,
    },
    iconContainer: {
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    genderLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000',
    },
    genderValue: {
        fontSize: 14,
        color: '#808080',
    },
    button: {
        width: '100%',
        backgroundColor: '#000000',
        padding: 16,
        borderRadius: 8,
        alignItems: 'center',
        marginTop: 20,
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

export default Signup2;