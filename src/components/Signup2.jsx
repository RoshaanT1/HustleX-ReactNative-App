import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    Platform,
    KeyboardAvoidingView,
    ScrollView,
    ActivityIndicator,
    Alert
} from 'react-native';
import Gender from './SettingP/Gender';
import { useStore } from '../store/Store';
import { API_URL } from './config';

const Signup2 = ({ navigation }) => {
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { email, setEmail } = useStore();
    const { password, setPassword } = useStore();
    const { age, setAge } = useStore();
    const { gender, setGender } = useStore();
    const { name, setName } = useStore();
    const { phoneNumber, setPhoneNumber } = useStore();
    const { city, setCity } = useStore();
    const { userId, setUserId } = useStore();

    const validateEmail = (email) => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 6;
    };

    const handleSignup = async () => {
        // Validate inputs
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

        if (!name) {
            setError('Please enter your full name.');
            return;
        }

        setError('');
        setIsLoading(true);

        try {
            const requestBody = {
                email: email,
                password: password,
                confirmPassword: password, // Send the actual confirmation
                age: age ? parseInt(age) : null, // Ensure age is number or null
                gender: gender,
                phone_number: phoneNumber,
                full_name: name,
                city: city,
                address: "" // Default address if not specified
            };

            console.log("Sending:", requestBody, API_URL); // For debugging

            const response = await fetch(`${API_URL}/api/signup/`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(requestBody),
            });

            const data = await response.json();
            // setUserId(data.user.user_id);
            console.log(data)
            if (!response.ok) {
                throw new Error(data.message || 'Signup failed');
            }

            Alert.alert('Success', 'Account created successfully!');
            navigation.navigate('Main');
        } catch (error) {
            console.error('Signup error:', error);
            Alert.alert('Error', error.message || 'Signup failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
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
                <TouchableOpacity
                    style={styles.button}
                    onPress={handleSignup}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <ActivityIndicator color="#FFFFFF" />
                    ) : (
                        <Text style={styles.buttonText}>Sign Up</Text>
                    )}
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