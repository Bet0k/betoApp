import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    paddingHorizontal: 15,
    backgroundColor: '#f5f5f5',
  },
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 16,
    color: '#555',
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 15,
    textAlign: 'center',
    color: '#1a1a1a',
  },
  pickerContainer: {
    marginVertical: 10,
    paddingBottom: 10,
  },
  categoryButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    backgroundColor: '#fff',
    marginRight: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    elevation: 2,
  },
  categoryButtonActive: {
    backgroundColor: '#007BFF',
  },
  categoryText: {
    color: '#333',
    fontSize: 14,
    fontWeight: '500',
  },
  categoryTextActive: {
    color: '#fff',
    fontWeight: '600',
  },
  list: {
    paddingBottom: 120, // <- dejar espacio suficiente para los botones flotantes
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    position: 'absolute', // <- botones flotando
    bottom: 20,           // <- margen desde el borde inferior
    left: 0,
    right: 0,
    backgroundColor: 'rgba(255,255,255,0.95)', // ligera transparencia
    paddingVertical: 10,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
    elevation: 6, // sombra en Android
    zIndex: 100,
  },
  snackbar: {
    backgroundColor: '#d4edda',
    position: 'absolute',
    top: 40,
    left: 20,
    right: 20,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 1000,
    paddingVertical: 10,
    paddingHorizontal: 15,
  },
  snackbarText: {
    color: '#000',
    textAlign: 'center',
    fontWeight: '600',
  },
});
