import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Alert
} from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import NavigationBar from './NavigationBar';
import { MaterialIcons } from '@expo/vector-icons';
import Gender from './SettingP/Gender';


const SettingPage = ({navigation}) => {
  const [genderVisible, setVisible] = useState(false)
  return (
    <View>
      <Text style={styles.headerText}>Account</Text>
      <View style={styles.big}>

        <TouchableOpacity style={styles.container} onPress={()=>navigation.navigate('Name')}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="person" size={24} color="black" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.name}>Name</Text>
            <Text style={styles.label}>Roshaan Tahir</Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="gray" />
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.container}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="phone-android" size={24} color="black" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.name}>Phone</Text>
            <Text style={styles.label}>Roshaan Tahir</Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="gray" />
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.container} onPress={()=>{
          navigation.navigate('Email')}
          }>
          <View style={styles.iconContainer}>
            <MaterialIcons name="email" size={24} color="black" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.name}>Email</Text>
            <Text style={styles.label}>R@gmail.com</Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.container} onPress={()=>setVisible(true)}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="person" size={24} color="black" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.name}>Gender</Text>
            <Text style={styles.label}>Unspecified</Text>
          </View>
        <Gender visible={genderVisible} onClose={()=>setVisible(false)}/>
          <MaterialIcons name="chevron-right" size={24} color="gray" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.container} onPress={()=>navigation.navigate('DOB')}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="calendar-today" size={24} color="black" />
          </View>
          <View style={styles.textContainer}>
            <Text style={styles.name}>Date of Birth</Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="gray" />
        </TouchableOpacity>
      </View>
      <View style={styles.bottomComponent}>
        <NavigationBar navigation={navigation}/>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({

  bottomComponent: {
    // bottom: -100,
    bottom:"-78%",
    backgroundColor: 'lightblue',
    padding: 20,
    alignItems: 'center',
  },
  headerText: {
    margin:20,
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },

  big: {
    alignContent: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    gap: 20
  },
  container: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 12,
    backgroundColor: 'white',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    elevation: 5
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

export default SettingPage;