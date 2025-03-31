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
import Signup from '../components/Signup'
import ForgotPassword from '../components/ForgetPassword';
import Notification from '../components/Notification'
import Order from '../components/Order'
import OrderDetail from '../components/OrderDetail'
import MenuRequest from '../components/MenuRequest'
import Signup2 from '../components/Signup2';
import FirstScreen from '../components/FirstScreen'
const Stack = createStackNavigator();

const App = () => {
    return (

        <Stack.Navigator initialRouteName="FirstScreen">

            <Stack.Screen
                name="Notification"
                component={Notification}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="OrderDetail"
                component={OrderDetail}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Order"
                component={Order}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Signup"
                component={Signup}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Signup2"
                component={Signup2}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="FirstScreen"
                component={FirstScreen}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Password"
                component={ForgotPassword}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Login"
                component={LoginScreen}
                options={{ headerShown: false }}
            />
            {/* Main Screen */}
            <Stack.Screen
                name="Main"
                component={MainScreen}
                options={{ headerShown: false }}
            />
            <Stack.Screen
                name="Setting"
                component={SettingPage}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Navigation"
                component={NavigationBar}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Name"
                component={UpdateName}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="Email"
                component={UpdateEmail}
                options={{ headerShown: false }}
            />

            <Stack.Screen
                name="DOB"
                component={DateOfBirth}
                options={{ headerShown: false }}
            />

<Stack.Screen
    name="Req"
    component={MenuRequest}
    options={{ headerShown: false }}
/>
        </Stack.Navigator>

);
};

export default App;
