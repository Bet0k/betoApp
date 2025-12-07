import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, ActivityIndicator, TouchableOpacity } from 'react-native';
import { collection, getDocs, setDoc, doc, getDoc } from 'firebase/firestore';
import { db, auth } from '../services/firebaseConfig';
import { signOut } from 'firebase/auth';
import ProductCard from '../components/ProductCard';
import styles from '../styles/mainStyle';
import { IconButton } from 'react-native-paper';

const MainScreen = ({ navigation }) => {
  const [products, setProducts] = useState([]);
  const [filteredCategory, setFilteredCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      const productsCol = collection(db, 'products');
      const productsSnapshot = await getDocs(productsCol);
      const productsList = productsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setProducts(productsList);

      const cats = [...new Set(productsList.map(p => p.category))];
      setCategories(cats);

      setLoading(false);
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (product) => {
    const userId = auth.currentUser.uid;
    const cartDocRef = doc(db, 'carts', `${userId}_${product.id}`);

    const cartDoc = await getDoc(cartDocRef);

    let newQuantity = 1;
    if (cartDoc.exists()) {
      const currentQuantity = cartDoc.data().quantity || 1;
      newQuantity = currentQuantity + 1;
    }

    await setDoc(cartDocRef, {
      userId,
      productId: product.id,
      quantity: newQuantity,
    }, { merge: true });

    return newQuantity;
  };

  const handleLogout = async () => {
    await signOut(auth);
    navigation.replace('Welcome');
  };

  const displayedProducts = filteredCategory
    ? products.filter(p => p.category === filteredCategory)
    : products;

  if (loading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color="#4db8ff" />
        <Text style={styles.loadingText}>Cargando productos...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Productos</Text>

      <View style={styles.pickerContainer}>
        <FlatList
          horizontal
          showsHorizontalScrollIndicator={false}
          data={['Todas las categorías', ...categories]}
          keyExtractor={(item) => item}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.categoryButton,
                (filteredCategory === item || (item === 'Todas las categorías' && filteredCategory === '')) && styles.categoryButtonActive
              ]}
              onPress={() => setFilteredCategory(item === 'Todas las categorías' ? '' : item)}
            >
              <Text
                style={[
                  styles.categoryText,
                  (filteredCategory === item || (item === 'Todas las categorías' && filteredCategory === '')) && styles.categoryTextActive
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <FlatList
        data={displayedProducts}
        keyExtractor={(item) => item.id}
        numColumns={2}
        renderItem={({ item }) => (
          <ProductCard product={item} onAddToCart={handleAddToCart} />
        )}
        contentContainerStyle={styles.list}
      />

      <View style={styles.buttonRow}>
        <IconButton icon="logout" size={28} onPress={handleLogout} />
        <IconButton icon="history" size={28} onPress={() => navigation.navigate('Orders')} />
        <IconButton icon="cart" size={28} onPress={() => navigation.navigate('Cart')} />
      </View>
    </View>
  );
};

export default MainScreen;
