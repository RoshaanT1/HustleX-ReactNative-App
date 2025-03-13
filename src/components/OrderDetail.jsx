import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, View, TouchableOpacity, StatusBar } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

const OrderDetail = ({navigation}) => {
  const order = {
    id: '#ORD-789012',
    supplier: 'Ahmed Ali',
    rating: 4.5,
    price: 'Rs 12,499',
    status: 'Accepted',
    orderDate: '2024-03-25 14:30',
    details: [
      { label: 'Work', value: 'Movers' },
      { label: 'Location', value: 'Gulshan e Iqbal' },
      { label: 'Payment', value: 'Credit Card' },
    ],
    supplierContact: '+92 98765 43210'
  };

  const renderStars = (rating) => {
    return Array(5).fill().map((_, index) => (
      <MaterialCommunityIcons
        key={index}
        name={index < Math.floor(rating) ? 'star' : 'star-outline'}
        size={20}
        color="#FFD700"
      />
    ));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}>
          <MaterialCommunityIcons name="arrow-left" size={24} color="#000" onPress={()=>navigation.goBack()}/>
        </TouchableOpacity>
        <Text style={styles.headerText}>Order Details</Text>
        <TouchableOpacity style={styles.headerAction}>
          <MaterialCommunityIcons name="printer" size={24} color="#000" />
        </TouchableOpacity>
      </View>

      {/* Main Content */}
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        {/* Order Status */}
        <View style={styles.statusContainer}>
          <Text style={styles.orderId}>{order.id}</Text>
          <View style={[
            styles.statusBadge,
            order.status === 'Accepted' ? styles.acceptedBadge : styles.findingBadge
          ]}>
            <Text style={styles.statusText}>{order.status}</Text>
          </View>
        </View>

        {/* Supplier Info */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Worker Information</Text>
          <View style={styles.supplierInfo}>
            <View>
              <Text style={styles.supplierName}>{order.supplier}</Text>
              <View style={styles.ratingContainer}>
                {renderStars(order.rating)}
                <Text style={styles.ratingText}>({order.rating})</Text>
              </View>
            </View>
            <MaterialCommunityIcons 
              name="account-circle" 
              size={40} 
              color="#666" 
            />
          </View>
        </View>

        {/* Order Details */}
        <View style={styles.card}>
          <Text style={styles.sectionTitle}>Order Summary</Text>
          <View style={styles.detailsContainer}>
            {order.details.map((item, index) => (
              <View key={index} style={styles.detailRow}>
                <Text style={styles.detailLabel}>{item.label}</Text>
                <Text style={styles.detailValue}>{item.value}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Price & Timeline */}
        <View style={styles.card}>
          <View style={styles.priceContainer}>
            <Text style={styles.priceLabel}>Total Amount</Text>
            <Text style={styles.priceValue}>{order.price}</Text>
          </View>
          <View style={styles.timelineContainer}>
            <MaterialCommunityIcons name="clock-outline" size={20} color="#666" />
            <Text style={styles.timelineText}>{order.orderDate}</Text>
          </View>
        </View>
      </ScrollView>

      {/* Action Bar */}
      <View style={styles.actionBar}>
        <TouchableOpacity style={styles.actionButton}>
          <MaterialCommunityIcons name="phone" size={20} color="#fff" />
          <Text style={styles.actionButtonText}>Contact Supplier</Text>
        </TouchableOpacity>
      </View>
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
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    padding: 8,
  },
  headerText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  scrollContainer: {
    padding: 16,
    paddingBottom: 100,
  },
  statusContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  orderId: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  statusBadge: {
    borderRadius: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
  },
  acceptedBadge: {
    backgroundColor: '#e8f5e9',
  },
  findingBadge: {
    backgroundColor: '#fff3e0',
  },
  statusText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#000',
  },
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#000',
    marginBottom: 12,
  },
  supplierInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  supplierName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ratingText: {
    marginLeft: 8,
    color: '#666',
    fontSize: 14,
  },
  detailsContainer: {
    marginTop: 8,
  },
  detailRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 6,
  },
  detailLabel: {
    color: '#666',
    fontSize: 14,
  },
  detailValue: {
    color: '#000',
    fontSize: 14,
    fontWeight: '500',
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  priceLabel: {
    fontSize: 16,
    color: '#666',
  },
  priceValue: {
    fontSize: 20,
    fontWeight: '700',
    color: '#000',
  },
  timelineContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  timelineText: {
    marginLeft: 8,
    color: '#666',
    fontSize: 14,
  },
  actionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#2196F3',
    padding: 16,
  },
  actionButton: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  actionButtonText: {
    color: '#fff',
    fontWeight: '600',
    marginLeft: 8,
    fontSize: 16,
  },
});

export default OrderDetail;