import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, TouchableOpacity, ActivityIndicator } from 'react-native';
import { db, auth } from '../services/firebaseConfig';
import { collection, getDocs, setDoc, doc, deleteDoc, addDoc, serverTimestamp } from 'firebase/firestore';
import styles from '../styles/cartStyle';

const CartScreen = ({ navigation }) => {
  const [cartItems, setCartItems] = useState([]);
  const [total, setTotal] = useState(0);
  const [loadingItems, setLoadingItems] = useState({});
  const [checkoutLoading, setCheckoutLoading] = useState(false);

  const fetchCart = async () => {
    const userId = auth.currentUser.uid;

    const productsSnapshot = await getDocs(collection(db, 'products'));
    const productsMap = {};
    productsSnapshot.docs.forEach(doc => {
      productsMap[doc.id] = doc.data();
    });

    const cartSnapshot = await getDocs(collection(db, 'carts'));
    const items = cartSnapshot.docs
      .map(doc => doc.data())
      .filter(item => item.userId === userId)
      .map(item => ({
        ...item,
        productName: productsMap[item.productId]?.name,
        price: productsMap[item.productId]?.price,
      }));

    setCartItems(items);

    const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);
    setTotal(totalPrice);
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const changeQuantity = async (item, delta) => {
    setLoadingItems(prev => ({ ...prev, [item.productId]: true }));

    const userId = auth.currentUser.uid;
    const cartRef = doc(db, 'carts', `${userId}_${item.productId}`);
    const newQuantity = item.quantity + delta;

    if (newQuantity <= 0) {
      await deleteDoc(cartRef);
    } else {
      await setDoc(cartRef, { quantity: newQuantity }, { merge: true });
    }

    await fetchCart();
    setLoadingItems(prev => ({ ...prev, [item.productId]: false }));
  };

  // ----------------------- VERSIÓN SEGURA -----------------------
  const handleCheckout = async () => {
    if (cartItems.length === 0) return;

    setCheckoutLoading(true);
    const userId = auth.currentUser.uid;

    try {
      // Crear pedido
      await addDoc(collection(db, 'orders'), {
        userId,
        items: cartItems.map(item => ({
          productId: item.productId,
          name: item.productName,
          price: item.price,
          quantity: item.quantity
        })),
        total,
        createdAt: serverTimestamp()
      });

      // Borrar carrito
      const cartSnapshot = await getDocs(collection(db, 'carts'));
      const userCartDocs = cartSnapshot.docs.filter(docItem => docItem.data().userId === userId);
      await Promise.all(userCartDocs.map(docItem => deleteDoc(doc(db, 'carts', docItem.id))));

      // Actualizar estado
      setCartItems([]);
      setTotal(0);
      setCheckoutLoading(false);

      // Navegar con pequeño delay y try/catch
      setTimeout(() => {
        try {
          navigation.navigate('End');
        } catch (navError) {
          console.log('Error navigating to End:', navError);
        }
      }, 50); // 50ms es suficiente
    } catch (error) {
      console.log('Checkout error:', error);
      setCheckoutLoading(false);
    }
  };
  // ----------------------------------------------------------------

  const renderItem = ({ item }) => (
    <View style={styles.itemContainer}>
      <View style={styles.itemLeft}>
        <Text style={styles.productName}>{item.productName}</Text>
        <Text style={styles.productPrice}>${item.price}</Text>
      </View>
      <View style={styles.itemRight}>
        <TouchableOpacity
          onPress={() => changeQuantity(item, -1)}
          style={styles.qtyButton}
          disabled={loadingItems[item.productId]}
        >
          {loadingItems[item.productId] ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.qtyButtonText}>-</Text>
          )}
        </TouchableOpacity>

        <Text style={styles.qtyText}>{item.quantity}</Text>

        <TouchableOpacity
          onPress={() => changeQuantity(item, 1)}
          style={styles.qtyButton}
          disabled={loadingItems[item.productId]}
        >
          {loadingItems[item.productId] ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Text style={styles.qtyButtonText}>+</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      {cartItems.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Text style={styles.emptyText}>Tu carrito está vacío</Text>
        </View>
      ) : (
        <>
          <FlatList
            data={cartItems}
            keyExtractor={(item) => item.productId}
            renderItem={renderItem}
            contentContainerStyle={{ paddingBottom: 20 }}
          />
          <View style={styles.totalContainer}>
            <Text style={styles.totalText}>Total: ${total}</Text>
          </View>
        </>
      )}

      <TouchableOpacity
        style={[
          styles.checkoutButton,
          (cartItems.length === 0 || checkoutLoading) && styles.checkoutButtonDisabled
        ]}
        disabled={cartItems.length === 0 || checkoutLoading}
        onPress={handleCheckout}
      >
        {checkoutLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.checkoutButtonText}>Finalizar compra</Text>
        )}
      </TouchableOpacity>
    </View>
  );
};

export default CartScreen;
