import { useStore } from '@/src/store/Store';
import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
} from 'react-native';
import { API_URL } from '../config';
import { ActivityIndicator } from 'react-native-paper';

const Gender = ({ setGender, visible, onClose }) => {
  const [selectedGender, setSelectedGender] = useState('');
  const { token } = useStore();
  const { userId } = useStore();
  const [isLoading, setIsLoading] = useState(false);

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };

  const handleUpdate = async () => {
    if (userId != 0) {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/api/update-gender/`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
          body: JSON.stringify({
            userId: userId,
            gender: selectedGender,
          }),
        });

      } catch (error) {
        console.error('Login error:', error);
        Alert.alert('Error', error.message || 'Network error. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
    setGender(selectedGender)
    onClose(); // Close the modal
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible} // Use the `visible` prop
      onRequestClose={onClose} // Use the `onClose` prop
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.title}>Your gender</Text>

          <TouchableOpacity
            style={styles.option}
            onPress={() => handleGenderSelect('Female')}
          >
            <View
              style={[
                styles.radio,
                selectedGender === 'Female' && styles.selectedRadio,
              ]}
            />
            <Text style={styles.optionText}>Female</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.option}
            onPress={() => handleGenderSelect('Male')}
          >
            <View
              style={[
                styles.radio,
                selectedGender === 'Male' && styles.selectedRadio,
              ]}
            />
            <Text style={styles.optionText}>Male</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.option}
            onPress={() => handleGenderSelect('Unspecified')}
          >
            <View
              style={[
                styles.radio,
                selectedGender === 'Unspecified' && styles.selectedRadio,
              ]}
            />
            <Text style={styles.optionText}>Prefer not to specify</Text>
          </TouchableOpacity>

          {isLoading ? (
            <ActivityIndicator style={styles.loader} color="#000000" size="large" />
          ) : (
            <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
              <Text style={styles.updateButtonText}>Update</Text>
            </TouchableOpacity>)}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalView: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
    width: '100%',
    height: Dimensions.get('window').height * 0.35,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  radio: {
    height: 20,
    width: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: 'gray',
    marginRight: 10,
  },
  selectedRadio: {
    backgroundColor: 'black',
    borderWidth: 0,
  },
  optionText: {
    fontSize: 16,
  },
  updateButton: {
    width: '60%',
    backgroundColor: 'black',
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  updateButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default Gender;