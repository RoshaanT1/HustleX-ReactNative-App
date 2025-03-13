import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { Feather } from '@expo/vector-icons'; // Make sure you have this installed: `expo install @expo/vector-icons`

const Searchbar = () => {
    const [search, setSearch] = useState('')
  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Category</Text>
      <View style={styles.searchContainer}>
        {/* <Feather name="search" size={20} color="gray" style={styles.searchIcon} /> */}
        <TextInput
          
          style={styles.searchInput}
          placeholder="Search Category"
          placeholderTextColor="gray"
        />
      </View>
      <Text style={styles.lookingForText}>What are you looking for</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    paddingHorizontal: 15,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3, // for Android shadow
  },
  searchIcon: {
    marginRight: 10,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#000',
    height: 40,
  },
  lookingForText: {
    fontSize: 18,
    fontWeight: '600',
  },
});

export default Searchbar;
