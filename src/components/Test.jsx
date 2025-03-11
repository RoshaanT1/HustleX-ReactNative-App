import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const Test = () => {
  return (
    <View style={styles.big}>

      <TouchableOpacity style={styles.container}>
        <View style={styles.iconContainer}>
          <MaterialIcons name="person" size={24} color="black" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.name}>Name</Text>
          <Text style={styles.label}>Roshaan Tahir</Text>
        </View>
        <MaterialIcons name="chevron-right" size={24} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.container}>
        <View style={styles.iconContainer}>
          <MaterialIcons name="phone-android" size={24} color="black" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.name}>Phone</Text>
          <Text style={styles.label}>Roshaan Tahir</Text>
        </View>
        <MaterialIcons name="chevron-right" size={24} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.container}>
        <View style={styles.iconContainer}>
          <MaterialIcons name="email" size={24} color="black" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.name}>Email</Text>
          <Text style={styles.label}>R@gmail.com</Text>
        </View>
        <MaterialIcons name="chevron-right" size={24} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.container}>
        <View style={styles.iconContainer}>
          <MaterialIcons name="person" size={24} color="black" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.name}>Gender</Text>
          <Text style={styles.label}>Unspecified</Text>
        </View>
        <MaterialIcons name="chevron-right" size={24} color="gray" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.container}>
        <View style={styles.iconContainer}>
          <MaterialIcons name="calendar-today" size={24} color="black" />
        </View>
        <View style={styles.textContainer}>
          <Text style={styles.name}>Date of Birth</Text>
        </View>
        <MaterialIcons name="chevron-right" size={24} color="gray" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  big:{
    alignContent:'center',
    alignItems:'center',
    justifyContent:'center',
    flexDirection:'column',
    gap:20
  },
  container: {
    width:'90%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    elevation:5
  },
  iconContainer: {
    marginRight: 16,
  },
  textContainer: {
    flex: 1,
  },
  label: {
    fontSize: 12,
    color: 'black',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
  },
});

export default Test;