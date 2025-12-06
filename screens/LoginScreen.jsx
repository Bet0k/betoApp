import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';
import styles from '../styles/loginStyle';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../services/firebaseConfig';

const LoginScreen = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleLogin = async () => {
    setLoading(true);
    setError(false);

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigation.replace('Main');
    } catch (err) {
      console.log(err.code, err.message);
      setError(true);
    } finally {
      setLoading(false);
    }
  };

  const handleEmailChange = (text) => {
    if (error) setError(false);
    setEmail(text);
  };

  const handlePasswordChange = (text) => {
    if (error) setError(false);
    setPassword(text);
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView
        contentContainerStyle={{ flexGrow: 1 }}
        keyboardShouldPersistTaps="handled"
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View style={styles.container}>
            <Text style={styles.title}>Iniciar Sesión</Text>

            <TextInput
              style={[styles.input, error && styles.inputError, loading && { backgroundColor: '#e0e0e0' }]}
              placeholder="Email"
              value={email}
              onChangeText={handleEmailChange}
              editable={!loading}
              keyboardType="email-address"
              autoCapitalize="none"
            />
            {error && <Text style={styles.errorText}>Los datos ingresados son incorrectos</Text>}

            <TextInput
              style={[styles.input, error && styles.inputError, loading && { backgroundColor: '#e0e0e0' }]}
              placeholder="Contraseña"
              value={password}
              onChangeText={handlePasswordChange}
              secureTextEntry
              editable={!loading}
            />
            {error && <Text style={styles.errorText}>Los datos ingresados son incorrectos</Text>}

            <TouchableOpacity
              style={[styles.button, loading && { backgroundColor: '#999' }]}
              onPress={handleLogin}
              disabled={loading}
            >
              {loading ? (
                <ActivityIndicator color="#fff" />
              ) : (
                <Text style={styles.buttonText}>Iniciar Sesión</Text>
              )}
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default LoginScreen;
