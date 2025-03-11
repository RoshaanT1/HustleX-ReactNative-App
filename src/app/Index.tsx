import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from '../components/Login';
import MainScreen from '../components/MainScreen';
import { Settings, Text, View } from 'react-native';
import SettingPage from '../components/SettingPage'
import Test from '../components/Test'
import UpdateName from '../components/SettingP/UpdateName'
import UpdateEmail from '../components/SettingP/UpdateEmail'
import DateOfBirth from '../components/SettingP/DateOfBirth'
import Gender from '../components/SettingP/Gender'
import NavigationBar from '../components/NavigationBar';
// Create a stack navigator
const Stack = createStackNavigator();

const App = () => {
    return (
      
      <Stack.Navigator initialRouteName="Login">
              {/* // <View> */}
                {/* <Gender/> */}
               {/* <Test/> */}
              {/* <SettingPage/> */}
              {/* <UpdateName/> */}
              {/* <UpdateEmail/> */}
              {/* <DateOfBirth/> */}
              {/* </View> */}
                {/* Login Screen */}
                <Stack.Screen
                    name="Login"
                    component={LoginScreen}
                    options={{ headerShown: false }} 
                />
                {/* Main Screen */}
                <Stack.Screen
                    name="Main"
                    component={MainScreen}
                    options={{  headerShown: false }} 
                />
                <Stack.Screen
                    name="Setting"
                    component={SettingPage}
                    options={{  headerShown: false }} 
                />

                <Stack.Screen
                    name="Navigation"
                    component={NavigationBar}
                    options={{  headerShown: false }} 
                />

                <Stack.Screen
                    name="Name"
                    component={UpdateName}
                    options={{  headerShown: false }} 
                />

                <Stack.Screen
                    name="Email"
                    component={UpdateEmail}
                    options={{  headerShown: false }} 
                />

                <Stack.Screen
                    name="DOB"
                    component={DateOfBirth}
                    options={{  headerShown: false }} 
                />

                <Stack.Screen
                    name="Gender"
                    component={Gender}
                    options={{  headerShown: false }} 
                />
            </Stack.Navigator>

    );
};

export default App;
