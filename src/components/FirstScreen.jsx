import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView, ScrollView } from 'react-native';
import { Button } from 'react-native-paper';

const FirstScreen = ({navigation}) => {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={styles.container}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Text style={styles.title}>Hustle X</Text>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("Login")}>
            <Text style={styles.buttonText}>User</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={()=>navigation.navigate("Login")}>
            <Text style={styles.buttonText}>Hustler</Text>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
    marginBottom: 30,
    textAlign: 'center',
  },
  textContainer: {
    flex: 1,
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

});

export default FirstScreen