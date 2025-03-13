import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Searchbar from './Searchbar';
import NavigationBar from './NavigationBar';

const Notification = ({navigation}) => {
  const notifications = [
    {
      id: 1,
      title: 'New Message',
      message: 'You have received a new message from John Doe',
      timestamp: '2h ago',
      read: false
    },
    {
      id: 2,
      title: 'Meeting Reminder',
      message: 'Daily standup meeting starts in 15 minutes',
      timestamp: '1d ago',
      read: true
    },
    // Add more notifications...
  ];

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Notifications</Text>
        {/* <TouchableOpacity style={styles.headerAction}>
          <MaterialCommunityIcons name="dots-horizontal" size={24} color="#000" />
        </TouchableOpacity> */}
      </View>

      {/* Notifications List */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {notifications.map((notification) => (
          <TouchableOpacity 
            key={notification.id}
            style={[
              styles.notificationCard,
              !notification.read && styles.unreadCard
            ]}
          >
            {/* Unread Indicator */}
            {!notification.read && <View style={styles.unreadIndicator} />}

            <View style={styles.content}>
              <Text style={styles.title}>{notification.title}</Text>
              <Text style={styles.message} numberOfLines={2}>{notification.message}</Text>
              
              <View style={styles.footer}>
                <Text style={styles.timestamp}>{notification.timestamp}</Text>
                <MaterialCommunityIcons 
                  name="chevron-right" 
                  size={20} 
                  color="#888" 
                />
              </View>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
      <NavigationBar navigation={navigation}/>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerText: {
    fontSize: 24,
    fontWeight: '800',
    color: '#000',
  },
  headerAction: {
    padding: 8,
  },
  scrollContainer: {
    padding: 16,
  },
  notificationCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
    flexDirection: 'row',
    overflow: 'hidden',
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#000',
  },
  unreadIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#000',
    position: 'absolute',
    top: 20,
    right: 10,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 8,
  },
  message: {
    fontSize: 14,
    color: '#666',
    lineHeight: 15,
    marginBottom: 12,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timestamp: {
    fontSize: 12,
    color: '#888',
    fontWeight: '500',
  },
});

export default Notification;