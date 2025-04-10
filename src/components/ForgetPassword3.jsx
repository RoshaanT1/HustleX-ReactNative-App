import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert, Keyboard } from 'react-native';
import { API_URL } from './config';
import { useStore } from '../store/Store';
const ForgetPassword3 = ({ navigation }) => {
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const {resetToken} = useStore()

    const [validation, setValidation] = useState({
        hasMinLength: false,
        hasUpperCase: false,
        hasLowerCase: false,
        hasNumber: false,
        hasSpecialChar: false,
        passwordsMatch: false
    });
    const confirmInputRef = useRef();

    // Password complexity regex
    const passwordComplexityRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

    const handlePasswordChange = (text) => {
        setNewPassword(text);
        setValidation({
            hasMinLength: text.length >= 8,
            hasUpperCase: /[A-Z]/.test(text),
            hasLowerCase: /[a-z]/.test(text),
            hasNumber: /\d/.test(text),
            hasSpecialChar: /[@$!%*?&]/.test(text),
            passwordsMatch: text === confirmPassword
        });
    };

    const handleConfirmPasswordChange = (text) => {
        setConfirmPassword(text);
        setValidation(prev => ({
            ...prev,
            passwordsMatch: newPassword === text
        }));
    };

    const handleSubmit = async () => {
        Keyboard.dismiss();

        if (!newPassword || !confirmPassword) {
            Alert.alert('Error', 'Please enter both password fields');
            return;
        }

        if (!passwordComplexityRegex.test(newPassword)) {
            Alert.alert('Error', 'Password does not meet complexity requirements');
            return;
        }

        if (newPassword !== confirmPassword) {
            Alert.alert('Error', 'Passwords do not match');
            return;
        }

        setIsSubmitting(true);

        // Here you would typically send the new password to your backend
        console.log('New password submitted:', newPassword);

        // Simulate API call
            try {
                const response = await fetch(`${API_URL}/api/reset-password/`, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        resetToken: resetToken,
                        newPassword: newPassword
                    }),
                });
                const data = await response.json();
                setResetToken(data.resetCode)
            } catch (error) {
                console.error('Login error:', error);
                Alert.alert('Error', error.message || 'Network error. Please try again.');
            } finally {
                setIsSubmitting(false);
            }
            Alert.alert('Success', 'Password changed successfully');
            navigation.navigate('Login');
        };
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Create New Password</Text>
            <Text style={styles.subtitle}>Please enter your new password</Text>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>New Password</Text>
                <View style={[
                    styles.passwordInputWrapper,
                    newPassword && !passwordComplexityRegex.test(newPassword) && styles.inputError
                ]}>
                    <TextInput
                        style={styles.input}
                        value={newPassword}
                        onChangeText={handlePasswordChange}
                        secureTextEntry={!showPassword}
                        placeholder="Enter new password"
                        placeholderTextColor="#999"
                        returnKeyType="next"
                        onSubmitEditing={() => confirmInputRef.current.focus()}
                        blurOnSubmit={false}
                    />
                </View>
                {newPassword && !passwordComplexityRegex.test(newPassword) && (
                    <View style={styles.validationContainer}>
                        <Text style={[styles.validationText, validation.hasMinLength ? styles.valid : styles.invalid]}>
                            • At least 8 characters
                        </Text>
                        <Text style={[styles.validationText, validation.hasUpperCase ? styles.valid : styles.invalid]}>
                            • At least one uppercase letter
                        </Text>
                        <Text style={[styles.validationText, validation.hasLowerCase ? styles.valid : styles.invalid]}>
                            • At least one lowercase letter
                        </Text>
                        <Text style={[styles.validationText, validation.hasNumber ? styles.valid : styles.invalid]}>
                            • At least one number
                        </Text>
                        <Text style={[styles.validationText, validation.hasSpecialChar ? styles.valid : styles.invalid]}>
                            • At least one special character (@$!%*?&)
                        </Text>
                    </View>
                )}
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Confirm New Password</Text>
                <View style={[
                    styles.passwordInputWrapper,
                    confirmPassword && !validation.passwordsMatch && styles.inputError
                ]}>
                    <TextInput
                        ref={confirmInputRef}
                        style={styles.input}
                        value={confirmPassword}
                        onChangeText={handleConfirmPasswordChange}
                        secureTextEntry={!showPassword}
                        placeholder="Confirm new password"
                        placeholderTextColor="#999"
                        returnKeyType="done"
                        onSubmitEditing={handleSubmit}
                    />
                </View>
                {confirmPassword && !validation.passwordsMatch && (
                    <Text style={styles.errorText}>Passwords do not match</Text>
                )}
            </View>

            <TouchableOpacity
                style={styles.showPasswordButton}
                onPress={() => setShowPassword(!showPassword)}
            >
                <Text style={styles.showPasswordText}>
                    {showPassword ? 'Hide Password' : 'Show Password'}
                </Text>
            </TouchableOpacity>

            <TouchableOpacity
                style={[
                    styles.button,
                    isSubmitting && styles.buttonDisabled,
                    (!passwordComplexityRegex.test(newPassword) || !validation.passwordsMatch) && styles.buttonDisabled
                ]}
                onPress={handleSubmit}
                disabled={isSubmitting || !passwordComplexityRegex.test(newPassword) || !validation.passwordsMatch}
            >
                <Text style={styles.buttonText}>
                    {isSubmitting ? 'Updating...' : 'Update Password'}
                </Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        padding: 20,
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#000',
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 16,
        color: '#555',
        marginBottom: 40,
        textAlign: 'center',
    },
    inputContainer: {
        marginBottom: 20,
    },
    label: {
        fontSize: 14,
        color: '#555',
        marginBottom: 8,
        fontWeight: '500',
    },
    passwordInputWrapper: {
        borderWidth: 1,
        borderColor: '#000',
        borderRadius: 8,
        paddingHorizontal: 15,
    },
    inputError: {
        borderColor: '#ff0000',
    },
    input: {
        height: 50,
        fontSize: 16,
        color: '#000',
    },
    validationContainer: {
        marginTop: 8,
    },
    validationText: {
        fontSize: 12,
        marginBottom: 2,
    },
    valid: {
        color: '#00aa00',
    },
    invalid: {
        color: '#ff0000',
    },
    errorText: {
        color: '#ff0000',
        fontSize: 12,
        marginTop: 4,
    },
    showPasswordButton: {
        alignSelf: 'flex-end',
        marginBottom: 20,
    },
    showPasswordText: {
        color: '#000',
        fontWeight: '500',
        fontSize: 14,
    },
    button: {
        backgroundColor: '#000',
        padding: 15,
        borderRadius: 8,
        alignItems: 'center',
        marginBottom: 20,
    },
    buttonDisabled: {
        backgroundColor: '#cccccc',
    },
    buttonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default ForgetPassword3;