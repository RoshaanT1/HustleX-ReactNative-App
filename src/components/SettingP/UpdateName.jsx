import { useStore } from '@/src/store/Store';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const UpdateName = ({ navigation }) => {
  const [fullName, setFullName] = useState('');
  const { token } = useStore();
  const { userId } = useStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateName = async () => {
    if (userId != 0) {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/api/update-name/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: userId,
            full_name: fullName,
          }),
        });

      } catch (error) {
        console.error('Login error:', error);
        Alert.alert('Error', error.message || 'Network error. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
    console.log('Updating name to:', fullName);
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Update your name</Text>
      <Text style={styles.subtitle}>Your name makes it easy for Hustlers to identify you</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter your full name"
        value={fullName}
        onChangeText={setFullName}
      />

      {isLoading ? (
        <ActivityIndicator style={styles.loader} color="#000000" size="large" />
      ) : (
        <TouchableOpacity style={styles.button} onPress={handleUpdateName}>
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

export default UpdateName;
