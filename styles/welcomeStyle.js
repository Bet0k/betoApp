import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#ffffffff',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 50,
    color: '#1a1a1a',
    textAlign: 'center',
  },
  buttonPrimary: {
    width: '80%',
    marginVertical: 12,
    paddingVertical: 14,
    borderRadius: 12,
    alignItems: 'center',
    backgroundColor: '#3399ff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 5,
  },
buttonSecondary: {
  width: '80%',
  marginVertical: 12,
  paddingVertical: 14,
  borderRadius: 12,
  alignItems: 'center',
  backgroundColor: '#ffffff',
  borderWidth: 2,
  borderColor: '#000000',
  shadowColor: '#000',
  shadowOffset: { width: 0, height: 4 },
  shadowOpacity: 0.1,
  shadowRadius: 6,
  elevation: 3,
},
buttonTextSecondary: {
  color: '#000000',
  fontWeight: '600',
  fontSize: 18,
},

  buttonText: {
    color: '#ffffff',
    fontWeight: '600',
    fontSize: 18,
  },
});
