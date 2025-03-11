import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'


const Menu = () => {
  const categories = [
    { name: 'Electric Service', image: require('../assets/electrician.png') },
    { name: 'Plumber Services', image: require('../assets/plumber.png') },
    { name: 'Maid Service', image: require('../assets/housekeeper.png') },
    { name: 'AC Service', image: require('../assets/air-conditioner.png') },
    { name: 'Movers', image: require('../assets/delivery.png') },
    { name: 'Carpenter', image: require('../assets/carpenter.png') },
    { name: 'Other', image: require('../assets/plus.png') },
    // { name: 'Pet Care', image: require('./assets/pet.png') },
    // { name: 'Deep Cleaning', image: require('./assets/deep.png') },
    // { name: 'Laundry & Dry...', image: require('./assets/laundry.png') },
    // { name: 'Beauty Salon', image: require('./assets/beauty.png') },
  ];
  return (
    <View>
      <View style={styles.categoriesContainer}>
        {categories.map((category, index) => (
          <TouchableOpacity key={index} style={styles.categoryButton}>
            <Image source={category.image} style={styles.categoryImage} />
            <Text style={styles.categoryText}>{category.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </View>
  )
}
const styles = StyleSheet.create({
  categoriesContainer: {
    margin: 10,
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',

  },
  categoryButton: {
    width: '20%', // Adjust as needed
    backgroundColor: '#f9f9f9',
    borderRadius: 10,
    padding: 10,
    marginLeft: 5,
    marginBottom: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4, // for Android shadow
  },
  categoryImage: {
    width: 45,
    height: 45,
    marginBottom: 5,
  },
  categoryText: {
    fontSize: 11,
    textAlign: 'center',
  },
});
export default Menu