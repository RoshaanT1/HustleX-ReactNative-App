import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, View, Modal, TouchableOpacity } from 'react-native';
import { Button, Text, TextInput, Card, Portal, Provider } from 'react-native-paper';
import MapView, { Marker } from 'react-native-maps';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const cities = ['Karachi', 'Lahore', 'Islamabad', 'Rawalpindi', 'Faisalabad', 'Peshawar'];


const MenuRequest = ({ navigation }) => {
  const { category } = 'Movers';
  const [visible, setVisible] = useState(false);
  const [mapVisible, setMapVisible] = useState(false);
  const [formData, setFormData] = useState({
    city: '',
    location: '',
    coordinates: null,
    description: '',
    minPrice: '',
    maxPrice: ''
  });

  const handleMapSelect = (coordinate) => {
    setFormData({...formData, coordinates: coordinate});
    setMapVisible(false);
  };

  return (
    <Provider>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.formContainer}>
          <Text variant="headlineSmall" style={styles.formTitle}>{category} Request</Text>

          {/* City Dropdown */}
          <TouchableOpacity onPress={() => setVisible(true)}>
            <TextInput
              label="City"
              value={formData.city}
              editable={false}
              theme={{ colors: { primary: '#000' } }}
              right={<TextInput.Icon icon="menu-down" color="#000" />}
              style={styles.input}
            />
          </TouchableOpacity>

          {/* Location Picker */}
          <TouchableOpacity onPress={() => setMapVisible(true)}>
            <TextInput
              label="Location Coordinates"
              value={formData.coordinates ? 
                `${formData.coordinates.latitude.toFixed(4)}, ${formData.coordinates.longitude.toFixed(4)}` : ''
              }
              editable={false}
              theme={{ colors: { primary: '#000' } }}
              right={<TextInput.Icon icon="map-marker" color="#000" />}
              style={styles.input}
            />
          </TouchableOpacity>

          <TextInput
            label="Service Description"
            multiline
            numberOfLines={4}
            value={formData.description}
            onChangeText={text => setFormData({...formData, description: text})}
            style={styles.input}
            theme={{ colors: { primary: '#000' } }}
          />

          <View style={styles.priceContainer}>
            <TextInput
              label="Minimum Price (Rs)"
              value={formData.minPrice}
              onChangeText={text => setFormData({...formData, minPrice: text})}
              keyboardType="numeric"
              style={styles.priceInput}
              theme={{ colors: { primary: '#000' } }}
            />
            <TextInput
              label="Maximum Price (Rs)"
              value={formData.maxPrice}
              onChangeText={text => setFormData({...formData, maxPrice: text})}
              keyboardType="numeric"
              style={styles.priceInput}
              theme={{ colors: { primary: '#000' } }}
            />
          </View>

          <Button 
            mode="contained" 
            onPress={() => {
              navigation.goBack();
              console.log(formData);
            }
            }
            style={styles.submitButton}
            textColor="white" 

          >
            Submit Request
          </Button>

          {/* City Selection Modal */}
          <Portal>
            <Modal visible={visible} onDismiss={() => setVisible(false)}>
              <View style={styles.modalContainer}>
                <Card style={styles.modalCard}>
                  <Card.Title title="Select City" titleStyle={styles.modalTitle} />
                  <Card.Content>
                    {cities.map((city, index) => (
                      <Button
                      labelStyle={{ color: "black" }}
                        key={index}
                        mode="text"
                        onPress={() => {
                          setFormData({...formData, city});
                          setVisible(false);
                        }}
                      >
                        {city}
                      </Button>
                    ))}
                  </Card.Content>
                </Card>
              </View>
            </Modal>
          </Portal>

          {/* Map Modal */}
          <Modal visible={mapVisible} animationType="slide">
            <SafeAreaView style={styles.mapContainer}>
              <MapView
                style={styles.map}
                initialRegion={{
                  latitude: 24.8607,
                  longitude: 67.0011,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421,
                }}
                onPress={(e) => handleMapSelect(e.nativeEvent.coordinate)}
              >
                {formData.coordinates && (
                  <Marker coordinate={formData.coordinates} />
                )}
              </MapView>
              <Button 
                mode="contained"
                style={styles.mapConfirmButton}
                onPress={() =>{
                navigation.goBack()
                setMapVisible(false)
                }
              }
              >
                Confirm Location
              </Button>
            </SafeAreaView>
          </Modal>
        </ScrollView>
      </SafeAreaView>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    color: '#000',
    fontWeight: '700',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    padding: 8,
  },
  categoryCard: {
    width: '48%',
    margin: 4,
    borderRadius: 8,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cardContent: {
    alignItems: 'center',
    padding: 16,
  },
  categoryText: {
    color: '#000',
    marginTop: 8,
    textAlign: 'center',
  },
  formContainer: {
    padding: 16,
  },
  formTitle: {
    color: '#000',
    marginBottom: 24,
    fontWeight: '700',
  },
  input: {
    backgroundColor: '#fff',
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 8,
    gap: 16,
  },
  priceInput: {
    flex: 1,
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
  },
  submitButton: {
    marginTop: 24,
    borderRadius: 8,
    paddingVertical: 8,
    backgroundColor: 'black',
    fontSize:20,

  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
  },
  modalCard: {
    margin: 20,
    borderRadius: 8,
    backgroundColor: '#fff',
  },
  modalTitle: {
    color: '#000',
  },
  mapContainer: {
    flex: 1,
  },
  map: {
    flex: 1,
  },
  mapConfirmButton: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    borderRadius: 8,
    backgroundColor:'black'
  },
});

export default MenuRequest;