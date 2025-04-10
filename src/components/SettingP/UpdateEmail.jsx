import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';
import { API_URL } from '../config';
import { useStore } from '@/src/store/Store';

const UpdateEmail = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const { token } = useStore();
  const { userId } = useStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateEmail = async () => {
    // Here you would handle the update logic, e.g., sending the new name to an API
    if (userId != 0) {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/api/update-email/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: userId,
            email: email,
          }),
        });

      } catch (error) {
        console.error('Login error:', error);
        Alert.alert('Error', error.message || 'Network error. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
    console.log('Updating name to:', email);
    navigation.goBack();
  };


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update your email</Text>
      <Text style={styles.subtitle}>Recieve Updates and confirmation of order in your inbox</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your new email address"
        value={email}
        onChangeText={setEmail}
      />

      {isLoading ? (
        <ActivityIndicator style={styles.loader} color="#000000" size="large" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleUpdateEmail}>
          <Text style={styles.buttonText}>Update</Text>
        </TouchableOpacity>)}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center'
  },
  title: {
    margin: 20,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    margin: 20,
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  input: {
    width: '90%',
    alignSelf: 'center',
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    paddingVertical: 10,
    fontSize: 16,
  },
  button: {
    alignSelf: 'center',
    bottom: "-170%",
    width: '90%',
    backgroundColor: 'black',
    padding: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default UpdateEmail;
