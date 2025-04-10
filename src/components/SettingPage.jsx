import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import NavigationBar from './NavigationBar';
import Gender from './SettingP/Gender';
import { useStore } from '../store/Store';

const SettingPage = ({ navigation }) => {
  const [genderVisible, setVisible] = useState(false);
  const { age, setAge } = useStore();
  const { gender, setGender } = useStore();
  const { name, setName } = useStore();
  const { city, setCity } = useStore();
  const { email, setEmail } = useStore();
  
  return (
    <View style={styles.mainContainer}>
      <View style={styles.container}>
        <Text style={styles.headerText}>Account</Text>
        <View style={styles.settingsContainer}>
          <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('Name')}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="person" size={24} color="#000000" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.settingName}>Name</Text>
              <Text style={styles.settingLabel}>{name}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#000000" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('Email')}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="email" size={24} color="#000000" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.settingName}>Email</Text>
              <Text style={styles.settingLabel}>{email}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#000000" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('Password')}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="lock" size={24} color="#000000" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.settingName}>Password</Text>
              <Text style={styles.settingLabel}>••••••••</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#000000" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={() => setVisible(true)}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="person" size={24} color="#000000" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.settingName}>Gender</Text>
              <Text style={styles.settingLabel}>{gender}</Text>
            </View>
            <Gender setGender={setGender} visible={genderVisible} onClose={() => setVisible(false)} />
            <MaterialIcons name="chevron-right" size={24} color="#000000" />
          </TouchableOpacity>

          <TouchableOpacity style={[styles.settingItem, styles.dobItem]} onPress={() => navigation.navigate('DOB')}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="calendar-today" size={24} color="#000000" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.settingName}>Date of Birth</Text>
              <Text style={styles.settingLabel}>{age ? `${age} years old` : ''}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#000000" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={() => navigation.navigate('City')}>
            <View style={styles.iconContainer}>
              <MaterialIcons name="location-city" size={24} color="#000000" />
            </View>
            <View style={styles.textContainer}>
              <Text style={styles.settingName}>City</Text>
              <Text style={styles.settingLabel}>{city}</Text>
            </View>
            <MaterialIcons name="chevron-right" size={24} color="#000000" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.bottomComponent}>
        <NavigationBar navigation={navigation} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    justifyContent: 'space-between',
  },
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    paddingHorizontal: 16,
  },
  headerText: {
    marginTop: 40,
    marginBottom: 20,
    fontSize: 28,
    fontWeight: 'bold',
    color: '#000000',
  },
  settingsContainer: {
    marginTop: 10,
  },
  settingItem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 2,
    marginBottom: 12,
    minHeight: 56,
  },
  dobItem: {
    paddingVertical: 15,
    minHeight: 60,
  },
  iconContainer: {
    marginRight: 16,
    width: 24,
    alignItems: 'center',
  },
  textContainer: {
    flex: 1,
  },
  settingLabel: {
    fontSize: 14,
    color: '#000000',
    marginTop: 2,
  },
  settingName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000000',
  },
  bottomComponent: {
    bottom: -5,
    paddingVertical: 20,
    alignItems: 'center',
    backgroundColor: '#E3F2FD',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
});

export default SettingPage;