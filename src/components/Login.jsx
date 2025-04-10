import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Platform,
  Alert,
  KeyboardAvoidingView,
  ScrollView
} from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { API_URL } from './config'
import { useStore } from '../store/Store';

const LoginScreen = ({ navigation }) => {
  const [numberEmail, setNumberEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { password, setPassword } = useStore();
  const { age, setAge } = useStore();
  const { gender, setGender } = useStore();
  const { name, setName } = useStore();
  const { phoneNumber, setPhoneNumber } = useStore();
  const { city, setCity } = useStore();
  const { email, setEmail } = useStore();
  const { userId, setUserId } = useStore();
  const { token, setToken } = useStore();

  const handleLogin = async () => {
    // Input validation
    if (!numberEmail.trim()) {
      Alert.alert('Error', 'Please enter your email or phone number');
      return;
    }
    if (!password.trim()) {
      Alert.alert('Error', 'Please enter your password');
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/api/login/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          emailOrPhone: numberEmail,
          password: password,
        }),
      });
      setPassword('')
      const data = await response.json();
      console.log(data);

      setName(data.user?.full_name);
      setCity(data.user?.city);
      setGender(data.user?.gender);
      setPhoneNumber(data.user?.phone_number);
      setAge(data.user?.age);
      setUserId(data.user?.user_id);
      setEmail(data.user?.email);
      setToken(data.token)

      if (!response.ok) {
        throw new Error(data.message || 'Login failed. Please try again.');
      }
      
      // Successful login
      console.log(name, age, email, phoneNumber, city, age, userId, gender, token);
      navigation.navigate('Main');
    } catch (error) {
      console.error('Login error:', error);
      Alert.alert('Error', error.message || 'Network error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView
        contentContainerStyle={styles.scrollContainer}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>HustleX</Text>

        <Text style={styles.label}>Email or Phone Number</Text>
        <TextInput
          style={styles.input}
          placeholder="user@example.com or 3331231231"
          placeholderTextColor="#808080"
          value={numberEmail}
          onChangeText={setNumberEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />

        <Text style={styles.label}>Password</Text>
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#808080"
          secureTextEntry={true}
          value={password}
          onChangeText={setPassword}
        />

        {isLoading ? (
          <ActivityIndicator style={styles.loader} color="#000000" size="large" />
        ) : (
          <TouchableOpacity style={styles.button} onPress={handleLogin}>
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
        )}

        <TouchableOpacity
          style={styles.forgotPasswordButton}
          onPress={() => navigation.navigate('Password')}
        >
          <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
        </TouchableOpacity>

        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text style={styles.signupLink}>Sign Up</Text>
          </TouchableOpacity>
        </View>
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
    fontSize: 32,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 30,
    textAlign: 'center',
  },
  label: {
    fontSize: 14,
    color: '#000000',
    marginBottom: 8,
    alignSelf: 'flex-start',
  },
  input: {
    width: '100%',
    backgroundColor: '#F2F2F2',
    padding: Platform.OS === 'ios' ? 14 : 12,
    borderRadius: 5,
    fontSize: 16,
    color: '#000000',
    borderWidth: 1,
    borderColor: '#D3D3D3',
    marginBottom: 20,
  },
  button: {
    width: '100%',
    backgroundColor: '#000000',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold',
  },
  loader: {
    marginTop: 20,
  },
  forgotPasswordButton: {
    marginTop: 15,
    alignSelf: 'center',
  },
  forgotPasswordText: {
    color: '#808080',
    fontSize: 14,
  },
  signupContainer: {
    flexDirection: 'row',
    marginTop: 25,
    justifyContent: 'center',
  },
  signupText: {
    fontSize: 14,
    color: '#000000',
  },
  signupLink: {
    fontSize: 14,
    color: '#000000',
    fontWeight: 'bold',
  },
});

export default LoginScreen;