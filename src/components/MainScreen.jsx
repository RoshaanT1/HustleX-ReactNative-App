import { View, Text, StyleSheet } from 'react-native'
import React from 'react'
import SearchBar from './Searchbar'
import Menu from './Menu'
import NavigationBar from './NavigationBar'

const MainScreen = ({navigation}) => {

  return (
 
     <View style={styles.container}>
      <SearchBar/>
      <Menu navigation={navigation}/>
      <NavigationBar navigation={navigation}/>
    </View>
 
  )
}


const styles = StyleSheet.create({
  container: {
      flex: 1, // Ensures the content fills the screen
  },
  content: {
      flex: 1, // Pushes the navigation bar to the bottom
      textAlign: 'center',
      marginTop: 50,
  },
});
export default MainScreen