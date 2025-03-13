import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import NavigationBar from './NavigationBar';

const Order = ({ navigation }) => {
  const orders = [
    {
      id: 1,
      title: 'Mover',
      amount: 'Rs 25,000',
      status: 'Completed',
      timestamp: '15 Mar 2024',
      statusColor: '#4CAF50' // Green
    },
    {
      id: 2,
      title: 'Maid',
      amount: 'Rs 15,500',
      status: 'In Progress',
      timestamp: '20 Mar 2024',
      statusColor: '#2196F3' // Blue
    },
    {
      id: 3,
      title: 'Electric Service',
      amount: 'Rs 42,000',
      status: 'Pending',
      timestamp: '25 Mar 2024',
      statusColor: '#FF9800' // Orange
    },
    {
      id: 4,
      title: 'Electric Service',
      amount: 'Rs 42,000',
      status: 'Pending',
      timestamp: '25 Mar 2024',
      statusColor: '#FF9800' // Orange
    },
  ];

  const getStatusStyle = (status) => {
    switch (status.toLowerCase()) {
      case 'completed':
        return { backgroundColor: '#e8f5e9', color: '#4CAF50' };
      case 'in progress':
        return { backgroundColor: '#e3f2fd', color: '#2196F3' };
      case 'pending':
        return { backgroundColor: '#fff3e0', color: '#FF9800' };
      default:
        return { backgroundColor: '#f5f5f5', color: '#666' };
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerText}>Orders</Text>
        <TouchableOpacity style={styles.headerAction}>
          <MaterialCommunityIcons name="filter-variant" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Orders List */}
      <ScrollView contentContainerStyle={styles.scrollContainer} onPress={()=>navigation.navigate('OrderDetail')}>
        {orders.map((order) => {
          const statusStyle = getStatusStyle(order.status);
          
          return (
            <TouchableOpacity 
              key={order.id}
              style={styles.orderCard}
              onPress={() => navigation.navigate('OrderDetail', { orderId: order.id })}
            >
              <View style={styles.cardHeader}>
                <Text style={styles.orderTitle}>{order.title}</Text>
                <View style={[styles.statusBadge, { backgroundColor: statusStyle.backgroundColor }]}>
                  <Text style={[styles.statusText, { color: statusStyle.color }]}>
                    {order.status}
                  </Text>
                </View>
              </View>

              <View style={styles.cardBody}>
                <View style={styles.amountContainer}>
                  <Text style={styles.amountLabel}>Amount</Text>
                  <Text style={styles.amountValue}>{order.amount}</Text>
                </View>

                <View style={styles.timelineContainer}>
                  <MaterialCommunityIcons 
                    name="calendar-clock" 
                    size={18} 
                    color="#666" 
                  />
                  <Text style={styles.timestamp}>{order.timestamp}</Text>
                </View>
              </View>

              <MaterialCommunityIcons 
                name="chevron-right" 
                size={20} 
                color="#888" 
                style={styles.chevron}
              />
            </TouchableOpacity>
          );
        })}
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
    padding: 24,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  headerText: {
    fontSize: 28,
    fontWeight: '800',
    color: '#000',
  },
  headerAction: {
    padding: 8,
  },
  scrollContainer: {
    padding: 16,
  },
  orderCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  orderTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    flex: 1,
    marginRight: 12,
  },
  statusBadge: {
    borderRadius: 8,
    paddingVertical: 4,
    paddingHorizontal: 12,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'uppercase',
  },
  cardBody: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
  },
  amountContainer: {
    flex: 1,
  },
  amountLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  amountValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  timelineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  timestamp: {
    fontSize: 12,
    color: '#666',
    marginLeft: 8,
  },
  chevron: {
    position: 'absolute',
    right: 16,
    top: '50%',
    marginTop: -10,
  },
});

export default Order;