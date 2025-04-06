import { MaterialIcons } from '@expo/vector-icons';
import React, { useState } from 'react';
import { View, StyleSheet, Text, TextInput, TouchableOpacity, Platform, KeyboardAvoidingView, ScrollView, Modal } from 'react-native';
import Gender from './SettingP/Gender';
import { useStore } from '../store/Store';

const Signup = ({ navigation }) => {
    const [error, setError] = useState('');
    const [genderModalVisible, setGenderModalVisible] = useState(false);
    const [cityModalVisible, setCityModalVisible] = useState(false);
    const {gender, setGender} = useStore();
    const {name, setName} = useStore();
    const {phoneNumber, setPhoneNumber} = useStore();
    const {city, setCity} = useStore();

    const pakistaniCities = [
        'Karachi',
        'Islamabad',
        'Lahore',
        'Rawalpindi',
        'Peshawar',
        'Quetta',
        'Faisalabad',
        'Multan',
        'Hyderabad',
        'Gujranwala'
    ];

    const handleSignup = () => {
        // Basic validation
        if (!name) {
            setError('Please enter your name');
            return;
        }
        
        if (!phoneNumber || phoneNumber.length < 10) {
            setError('Please enter a valid phone number (at least 10 digits)');
            return;
        }
        
        if (!city) {
            setError('Please select your city');
            return;
        }
        
        setError('');
        navigation.navigate('Signup2');
    };

    const handleCitySelect = (selectedCity) => {
        setCity(selectedCity);
        setCityModalVisible(false);
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <ScrollView contentContainerStyle={styles.scrollContainer}>
                <Text style={styles.title}>Sign Up</Text>

                <Text style={styles.label}>Name</Text>
                <TextInput
                    style={[styles.inputName, error && !name && styles.inputError]}
                    placeholder="Roshaan Tahir"
                    placeholderTextColor="#808080"
                    keyboardType="ascii-capable"
                    value={name}
                    onChangeText={setName}
                />

                <Text style={styles.label}>Phone Number</Text>
                <TextInput
                    style={[styles.inputNumber, error && (!phoneNumber || phoneNumber.length < 10) && styles.inputError]}
                    placeholder="03001234567"
                    placeholderTextColor="#808080"
                    keyboardType="phone-pad"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    maxLength={11}
                />

                {/* City Selection */}
                <Text style={styles.label}>City</Text>
                <TouchableOpacity
                    style={[styles.input, styles.cityInput, error && !city && styles.inputError]}
                    onPress={() => setCityModalVisible(true)}
                >
                    <Text style={city ? styles.cityText : styles.cityPlaceholder}>
                        {city || 'Select your city'}
                    </Text>
                    <MaterialIcons name="arrow-drop-down" size={24} color="#808080" />
                </TouchableOpacity>

                {/* City Selection Modal */}
                <Modal
                    visible={cityModalVisible}
                    transparent={true}
                    animationType="slide"
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.modalContent}>
                            <Text style={styles.modalTitle}>Select Your City</Text>
                            <ScrollView>
                                {pakistaniCities.map((cityItem) => (
                                    <TouchableOpacity
                                        key={cityItem}
                                        style={styles.cityItem}
                                        onPress={() => handleCitySelect(cityItem)}
                                    >
                                        <Text style={styles.cityItemText}>{cityItem}</Text>
                                    </TouchableOpacity>
                                ))}
                            </ScrollView>
                            <TouchableOpacity
                                style={styles.modalCloseButton}
                                onPress={() => setCityModalVisible(false)}
                            >
                                <Text style={styles.modalCloseText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>

                {/* Gender Selection */}
                <TouchableOpacity
                    style={styles.Container2}
                    onPress={() => setGenderModalVisible(true)}
                >
                    <View style={styles.iconContainer}>
                        <MaterialIcons name="person" size={24} color="#000000" />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.Label2}>Gender</Text>
                        <Text style={styles.genderValue}>{gender || 'Select gender'}</Text>
                    </View>
                    <MaterialIcons name="chevron-right" size={24} color="#808080" />
                </TouchableOpacity>
                <Gender setGender={setGender} visible={genderModalVisible} onClose={() => setGenderModalVisible(false)} />

                <TouchableOpacity style={styles.Container2} onPress={() => navigation.navigate('DOB')}>
                    <View style={styles.iconContainer}>
                        <MaterialIcons name="calendar-today" size={24} color="black" />
                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.Label2}>Date of Birth</Text>
                    </View>
                    <MaterialIcons name="chevron-right" size={24} color="gray" />
                </TouchableOpacity>

                {/* Error Message */}
                {error ? <Text style={styles.errorText}>{error}</Text> : null}

                <TouchableOpacity style={styles.button} onPress={handleSignup}>
                    <Text style={styles.buttonText}>Next</Text>
                </TouchableOpacity>
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
    label: {
        fontSize: 14,
        color: '#000000',
        marginBottom: 5, 
    },
    inputName: {
        width: '100%',
        backgroundColor: '#F2F2F2',
        paddingVertical: 10, // Use paddingVertical for better control
        paddingHorizontal: 14,
        borderRadius: 8,
        fontSize: 16,
        color: '#000000',
        borderWidth: 1,
        borderColor: '#D3D3D3',
        marginBottom: 10, // Adjust this for more space
    },
    input: {
        width: '100%',
        backgroundColor: '#F2F2F2',
        paddingVertical: 10, // Use paddingVertical for better control
        paddingHorizontal: 14,
        borderRadius: 8,
        fontSize: 16,
        color: '#000000',
        borderWidth: 1,
        borderColor: '#D3D3D3',
        marginBottom: 18, // Adjust this for more space
    },
    inputNumber: {
        width: '100%',
        backgroundColor: '#F2F2F2',
        paddingVertical: 12, // Use paddingVertical for better control
        paddingHorizontal: 14,
        borderRadius: 8,
        fontSize: 16,
        color: '#000000',
        borderWidth: 1,
        borderColor: '#D3D3D3',
        marginBottom: 8, // Adjust this for more space
    },
    cityInput: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    cityText: {
        color: '#000000',
    },
    cityPlaceholder: {
        color: '#808080',
    },
    inputError: {
        borderColor: 'red',
    },
    Container2: {
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        backgroundColor: '#F2F2F2',
        padding: 14,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#D3D3D3',
        marginBottom: 20,
    },
    iconContainer: {
        marginRight: 16,
    },
    textContainer: {
        flex: 1,
    },
    Label2: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#000000',
    },
    genderValue: {
        fontSize: 14,
        color: '#808080',
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
    errorText: {
        color: 'red',
        fontSize: 14,
        marginTop: 10,
        alignSelf: 'flex-start',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContent: {
        width: '80%',
        backgroundColor: 'white',
        borderRadius: 10,
        maxHeight: '60%',
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: 'bold',
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
        textAlign: 'center',
    },
    cityItem: {
        padding: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#eee',
    },
    cityItemText: {
        fontSize: 16,
    },
    modalCloseButton: {
        padding: 15,
        backgroundColor: '#000000',
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
    },
    modalCloseText: {
        color: 'white',
        textAlign: 'center',
        fontWeight: 'bold',
    },
});

export default Signup;