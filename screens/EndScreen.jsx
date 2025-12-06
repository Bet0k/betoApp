import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import styles from '../styles/endStyle';
import { useNavigation } from '@react-navigation/native';

const EndScreen = () => {
  const navigation = useNavigation();

const deliveryLocation = { latitude: -34.782286, longitude: -58.399508, latitudeDelta: 0.01, longitudeDelta: 0.01, };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>¡Pedido Finalizado!</Text>
      <Text style={styles.subtitle}>Tu pedido estará listo en 3 días en:</Text>

      <MapView
        style={styles.map}
        initialRegion={deliveryLocation}
      >
        <Marker
          coordinate={deliveryLocation}
          title="Entrega"
          description="Estadio Alfredo Beranger"
        />
      </MapView>

      <TouchableOpacity
        style={styles.button}
        onPress={() => navigation.navigate('Main')}
      >
        <Text style={styles.buttonText}>Regresar a la tienda</Text>
      </TouchableOpacity>
    </View>
  );
};

export default EndScreen;
