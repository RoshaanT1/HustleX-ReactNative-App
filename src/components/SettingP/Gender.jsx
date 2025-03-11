import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  Dimensions,
} from 'react-native';

const Gender = ({ visible, onClose }) => {
  const [selectedGender, setSelectedGender] = useState('');

  const handleGenderSelect = (gender) => {
    setSelectedGender(gender);
  };

  const handleUpdate = () => {
    // Add your update logic here
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
            onPress={() => handleGenderSelect('female')}
          >
            <View
              style={[
                styles.radio,
                selectedGender === 'female' && styles.selectedRadio,
              ]}
            />
            <Text style={styles.optionText}>Female</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.option}
            onPress={() => handleGenderSelect('male')}
          >
            <View
              style={[
                styles.radio,
                selectedGender === 'male' && styles.selectedRadio,
              ]}
            />
            <Text style={styles.optionText}>Male</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.option}
            onPress={() => handleGenderSelect('prefer_not_to_say')}
          >
            <View
              style={[
                styles.radio,
                selectedGender === 'prefer_not_to_say' && styles.selectedRadio,
              ]}
            />
            <Text style={styles.optionText}>Prefer not to specify</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.updateButton} onPress={handleUpdate}>
            <Text style={styles.updateButtonText}>Update</Text>
          </TouchableOpacity>
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
    borderRadius: 20,
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
    height: Dimensions.get('window').height * 0.4,
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