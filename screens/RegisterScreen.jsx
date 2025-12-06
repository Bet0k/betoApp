import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Snackbar } from 'react-native-paper';
import styles from '../styles/registerStyle';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../services/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import { MaterialIcons } from '@expo/vector-icons';

const RegisterScreen = ({ navigation }) => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [loading, setLoading] = useState(false);

  const [errors, setErrors] = useState({
    firstName: '',
    lastName: '',
    birthDate: '',
    email: '',
    password: '',
  });

  // Formateo de fecha dinámico
  const handleBirthDateChange = (text) => {
    let clean = text.replace(/\D/g, '');
    if (clean.length > 8) clean = clean.slice(0, 8);

    let formatted = '';
    if (clean.length > 0) formatted += clean.slice(0, 2);
    if (clean.length >= 3) formatted += '/' + clean.slice(2, 4);
    if (clean.length >= 5) formatted += '/' + clean.slice(4);

    setBirthDate(formatted);
    if (errors.birthDate) setErrors({ ...errors, birthDate: '' });
  };

  const handleChange = (field, value) => {
    setErrors({ ...errors, [field]: '' });
    switch (field) {
      case 'firstName':
        setFirstName(value);
        break;
      case 'lastName':
        setLastName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'birthDate':
        handleBirthDateChange(value);
        break;
    }
  };

  // Validaciones
  const validate = () => {
    let valid = true;
    let newErrors = { firstName: '', lastName: '', birthDate: '', email: '', password: '' };

    // Nombre y apellido solo letras
    if (!firstName) {
      newErrors.firstName = 'Obligatorio';
      valid = false;
    } else if (!/^[a-zA-Z]+$/.test(firstName)) {
      newErrors.firstName = 'Solo letras';
      valid = false;
    }

    if (!lastName) {
      newErrors.lastName = 'Obligatorio';
      valid = false;
    } else if (!/^[a-zA-Z]+$/.test(lastName)) {
      newErrors.lastName = 'Solo letras';
      valid = false;
    }

    // Fecha de nacimiento
    if (!birthDate) {
      newErrors.birthDate = 'Obligatorio';
      valid = false;
    } else if (!/^([0-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/.test(birthDate)) {
      newErrors.birthDate = 'Fecha inválida';
      valid = false;
    } else {
      // Validar fecha no futura
      const parts = birthDate.split('/');
      const day = parseInt(parts[0], 10);
      const month = parseInt(parts[1], 10) - 1;
      const year = parseInt(parts[2], 10);
      const inputDate = new Date(year, month, day);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (inputDate > today) {
        newErrors.birthDate = 'No puede ser futura';
        valid = false;
      }
    }

    // Email válido
    if (!email) {
      newErrors.email = 'Obligatorio';
      valid = false;
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      newErrors.email = 'Email inválido';
      valid = false;
    }

    // Contraseña
    if (!password) {
      newErrors.password = 'Obligatorio';
      valid = false;
    } else if (password.length < 6) {
      newErrors.password = 'Mínimo 6 caracteres';
      valid = false;
    }

    setErrors(newErrors);
    return valid;
  };

  const handleRegister = async () => {
  if (!validate()) return;

  setLoading(true);

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCredential.user.uid;

    await setDoc(doc(db, 'users', uid), {
      firstName,
      lastName,
      birthDate,
      email,
    });

    setSnackbarVisible(true);
  } catch (error) {
    console.log(error.code, error.message);

    // Mapear errores de Firebase
    const newErrors = { ...errors };

    if (error.code === 'auth/email-already-in-use') {
      newErrors.email = 'El email ya está en uso';
    } else if (error.code === 'auth/invalid-email') {
      newErrors.email = 'Email inválido';
    } else if (error.code === 'auth/weak-password') {
      newErrors.password = 'La contraseña es muy débil';
    } else {
      // Para otros errores generales
      newErrors.email = 'Error al registrar';
    }

    setErrors(newErrors);
  } finally {
    setLoading(false);
  }
};


  return (
    <View style={styles.container}>
      <Text style={styles.title}>Registrarse</Text>

      <TextInput
        style={[styles.input, errors.firstName && styles.inputError, loading && { backgroundColor: '#e0e0e0' }]}
        placeholder="Nombre"
        value={firstName}
        onChangeText={(text) => handleChange('firstName', text)}
        editable={!loading}
      />
      {errors.firstName ? <Text style={styles.errorText}>{errors.firstName}</Text> : null}

      <TextInput
        style={[styles.input, errors.lastName && styles.inputError, loading && { backgroundColor: '#e0e0e0' }]}
        placeholder="Apellido"
        value={lastName}
        onChangeText={(text) => handleChange('lastName', text)}
        editable={!loading}
      />
      {errors.lastName ? <Text style={styles.errorText}>{errors.lastName}</Text> : null}

      <TextInput
        style={[styles.input, errors.birthDate && styles.inputError, loading && { backgroundColor: '#e0e0e0' }]}
        placeholder="Fecha de nacimiento (DD/MM/YYYY)"
        value={birthDate}
        onChangeText={(text) => handleChange('birthDate', text)}
        keyboardType="numeric"
        editable={!loading}
      />
      {errors.birthDate ? <Text style={styles.errorText}>{errors.birthDate}</Text> : null}

      <TextInput
        style={[styles.input, errors.email && styles.inputError, loading && { backgroundColor: '#e0e0e0' }]}
        placeholder="Email"
        value={email}
        onChangeText={(text) => handleChange('email', text)}
        editable={!loading}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {errors.email ? <Text style={styles.errorText}>{errors.email}</Text> : null}

      <TextInput
        style={[styles.input, errors.password && styles.inputError, loading && { backgroundColor: '#e0e0e0' }]}
        placeholder="Contraseña"
        value={password}
        onChangeText={(text) => handleChange('password', text)}
        secureTextEntry
        editable={!loading}
      />
      {errors.password ? <Text style={styles.errorText}>{errors.password}</Text> : null}

      <TouchableOpacity
        style={[styles.button, loading && { backgroundColor: '#999' }]}
        onPress={handleRegister}
        disabled={loading}
      >
        {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.buttonText}>Registrarse</Text>}
      </TouchableOpacity>

      <Snackbar
  visible={snackbarVisible}
  onDismiss={() => {
    setSnackbarVisible(false);
    navigation.replace('Main');
  }}
  duration={3000}
  style={styles.snackbar}
>
  <View style={styles.snackbarContent}>
    <MaterialIcons name="check-circle" size={20} color="#fff" style={{ marginRight: 8 }} />
    <Text style={styles.snackbarText}>
      ¡Te registraste correctamente! Ahora podés navegar en la app.
    </Text>
  </View>
</Snackbar>
    </View>
  );
};

export default RegisterScreen;
