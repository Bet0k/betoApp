import React, { useEffect, useState } from 'react';
import { View, Text, FlatList } from 'react-native';
import { db, auth } from '../services/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';
import styles from '../styles/orderStyle';

const OrderScreen = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!auth.currentUser) return;
      const userId = auth.currentUser.uid;
      const ordersCol = collection(db, 'orders');
      const q = query(ordersCol, where('userId', '==', userId));
      const snapshot = await getDocs(q);
      const orderList = snapshot.docs
        .map(doc => ({ id: doc.id, ...doc.data() }))
        .sort((a, b) => b.createdAt?.seconds - a.createdAt?.seconds);
      setOrders(orderList);
    };
    fetchOrders();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.screenTitle}>Mis Pedidos</Text>

      {orders.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>No tienes pedidos aún</Text>
        </View>
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.orderCard}>
              <Text style={styles.orderTitle}>Pedido: #{item.id.slice(-5)}</Text>
              <Text style={styles.orderDate}>
                {item.createdAt
                  ? new Date(item.createdAt.seconds * 1000).toLocaleString()
                  : 'Fecha no disponible'}
              </Text>

              <Text style={styles.productsTitle}>Productos:</Text>
              {item.items.map((prod, idx) => (
                <Text key={idx} style={styles.orderItem}>
                  {prod.name} × {prod.quantity}
                </Text>
              ))}
            </View>
          )}
          contentContainerStyle={{ paddingBottom: 20 }}
        />
      )}
    </View>
  );
};

export default OrderScreen;
