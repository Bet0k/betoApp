import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#f0f4f8',
  },
  itemContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    marginVertical: 6,
    borderRadius: 12,
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOpacity: 0.05,
    shadowRadius: 8,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  itemLeft: { flex: 1 },
  itemRight: { flexDirection: 'row', alignItems: 'center' },
  productName: { fontSize: 16, fontWeight: '600', color: '#333' },
  productPrice: { fontSize: 14, color: '#777', marginTop: 4 },
  qtyButton: {
    width: 36,
    height: 36,
    borderRadius: 8,
    backgroundColor: '#4db8ff', // azul/celeste
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 5,
  },
  qtyButtonText: { fontSize: 18, fontWeight: 'bold', color: '#fff' },
  qtyText: { fontSize: 16, fontWeight: '600', marginHorizontal: 5, minWidth: 20, textAlign: 'center' },
  totalContainer: { paddingVertical: 15, alignItems: 'center', borderTopWidth: 1, borderTopColor: '#ddd', marginTop: 10 },
  totalText: { fontSize: 20, fontWeight: 'bold', color: '#333' },
  checkoutButton: {
    backgroundColor: '#4db8ff', // azul/celeste
    paddingVertical: 15,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 15,
  },
  checkoutButtonDisabled: {
    backgroundColor: '#aaa',
  },
  checkoutButtonText: { color: '#fff', fontSize: 18, fontWeight: 'bold' },
  emptyContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  emptyText: { fontSize: 18, fontWeight: 'bold', color: '#555' },
});
