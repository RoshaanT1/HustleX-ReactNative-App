import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text, Image, Platform } from 'react-native';

const NavigationBar = ( {navigation} ) => {
    const home = require('../assets/mainMenu/home.png');
    const notification = require('../assets/mainMenu/notification.png');
    const mainMenu = require('../assets/mainMenu/menu.png');
    const order = require('../assets/mainMenu/order.png');
    const account = require('../assets/mainMenu/account.png');

    return (
        <View style={styles.container}>
            <TouchableOpacity style={styles.item} onPress={()=>navigation.navigate('Main')}>
                <Image source={home} style={styles.icon} />
                <Text style={styles.text}>Home</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item}>
                <Image source={notification} style={styles.icon} />
                <Text style={styles.text}>Notification</Text>
            </TouchableOpacity>

            {/* Invisible Spacer to Maintain Even Spacing */}
            <View style={styles.spacer} />

            {/* Center Floating Button */}
            <View style={styles.middleButtonContainer}>
                <TouchableOpacity style={styles.middleButton} onPress={()=>navigation.goBack()}>
                    <Image source={mainMenu} style={styles.middleIcon} />
                </TouchableOpacity>
            </View>

            {/* Invisible Spacer to Maintain Even Spacing */}
            <View style={styles.spacer} />

            <TouchableOpacity style={styles.item}>
                <Image source={order} style={styles.icon} />
                <Text style={styles.text}>My Orders</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.item} onPress={()=>navigation.navigate('Setting')}>
                <Image source={account} style={styles.icon} />
                <Text style={styles.text}>Account</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#fff', // White background
        height: Platform.OS === 'ios' ? 80 : 70,
        paddingBottom: Platform.OS === 'ios' ? 20 : 10,
        borderTopLeftRadius: 25,
        borderTopRightRadius: 25,
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        elevation: 10,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: -3 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
    },
    item: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    middleButtonContainer: {
        position: 'absolute',
        top: -25, // Lowered from -30 for better alignment
        left: '50%',
        transform: [{ translateX: -30 }],
    },
    middleButton: {
        width: 60,
        height: 60,
        backgroundColor: '#000', // Black button background
        borderRadius: 30,
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 5,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 4 },
        shadowOpacity: 0.3,
        shadowRadius: 5,
    },
    middleIcon: {
        width: 30,
        height: 30,
        tintColor: '#fff', // White icon
    },
    icon: {
        width: 24,
        height: 24,
        tintColor: '#000', // Black icons
    },
    text: {
        color: '#000', // Black text
        fontSize: 12,
        marginTop: 3,
    },
    spacer: {
        flex: 0.4, // Adjusted to balance spacing
    },
});

export default NavigationBar;
