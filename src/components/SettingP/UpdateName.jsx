import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

const UpdateName = ({navigation}) => {
  const [fullName, setFullName] = useState('');

  const handleUpdateName = () => {
    // Here you would handle the update logic, e.g., sending the new name to an API
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
      <TouchableOpacity style={styles.button} onPress={handleUpdateName}>
        <Text style={styles.buttonText}>Update</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent:'center'
  },
  title: {
    margin:20,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    margin:20,
    fontSize: 16,
    color: 'gray',
    marginBottom: 20,
  },
  input: {
    width:'90%',
    alignSelf:'center',
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginBottom: 20,
    paddingVertical: 10,
    fontSize: 16,
  },
  button: {
    alignSelf:'center',
    bottom:-320,
    width:'90%',
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
