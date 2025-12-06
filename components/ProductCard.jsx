import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Snackbar } from 'react-native-paper';
import styles from '../styles/productCardStyle';

const ProductCard = ({ product, onAddToCart }) => {
  const [loading, setLoading] = useState(false);
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [quantityAdded, setQuantityAdded] = useState(0);

  const handleAdd = async () => {
    setLoading(true);
    const updatedQuantity = await onAddToCart(product); // ahora devuelve la cantidad
    setQuantityAdded(updatedQuantity);
    setLoading(false);
    setSnackbarVisible(true);
  };

  return (
    <View style={styles.card}>
      <Image source={{ uri: product.image }} style={styles.image} />
      <Text style={styles.name}>{product.name}</Text>
      <Text style={styles.price}>${product.price}</Text>

      <TouchableOpacity
        style={styles.addButton}
        onPress={handleAdd}
        disabled={loading}
      >
        {loading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.addButtonText}>Agregar al carrito</Text>
        )}
      </TouchableOpacity>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000}
        style={styles.snackbar}
      >
        <Text style={styles.snackbarText}>
          Añadiste {product.name} al carrito
        </Text>
      </Snackbar>
    </View>
  );
};

export default ProductCard;
