import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f0f2f5',
  },
  screenTitle: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 15,
    color: '#000000ff',
  },
  orderCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 15,
    marginBottom: 15,
    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 6,
    elevation: 4,
  },
  orderTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#007acc',
    marginBottom: 3,
  },
  orderDate: {
    fontSize: 12,
    color: '#555',
    marginBottom: 10,
  },
  productsTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333',
    marginBottom: 5,
  },
  orderItem: {
    fontSize: 14,
    color: '#444',
    marginLeft: 10,
    marginBottom: 3,
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 50,
  },
  emptyText: {
    fontSize: 16,
    color: '#555',
  },
});
