import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Provider as PaperProvider } from 'react-native-paper'; // <-- IMPORTANTE

// Importamos las pantallas
import WelcomeScreen from './screens/WelcomeScreen';
import LoginScreen from './screens/LoginScreen';
import RegisterScreen from './screens/RegisterScreen';
import MainScreen from './screens/MainScreen';
import CartScreen from './screens/CartScreen';
import OrderScreen from './screens/OrderScreen';
import EndScreen from './screens/EndScreen';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <PaperProvider> {/* <-- ENVOLVER TODO EL NAVIGATION */}
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Welcome">
          <Stack.Screen 
            name="Welcome" 
            component={WelcomeScreen} 
            options={{ headerShown: false }}
          />
          <Stack.Screen 
            name="Login" 
            component={LoginScreen} 
            options={{ title: '' }}
          />
          <Stack.Screen 
            name="Register" 
            component={RegisterScreen} 
            options={{ title: '' }}
          />
          <Stack.Screen
            name="Main"
            component={MainScreen}
            options={{ title: 'BetoApp', headerBackVisible: false }}
          />
          <Stack.Screen
            name="Cart"
            component={CartScreen}
            options={{ title: 'Carrito' }}
          />
          <Stack.Screen
            name="Orders"
            component={OrderScreen}
            options={{ title: 'Historial de pedidos'}}
          />
          <Stack.Screen
            name="End"
            component={EndScreen}
            options={{ title: 'Checkout', headerBackVisible: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </PaperProvider>
  );
}
