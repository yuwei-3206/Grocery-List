import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';

const GroceryItem = ({ item, handleEditItem, handleRemoveItem }) => {
  return (
    <View style={styles.container}>
      <View style={styles.textContainer}>
        <Text style={styles.itemText}>{item.item}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <Text style={styles.quantityText}>Qty: {item.quantity}</Text>
        <Button icon="pencil" onPress={handleEditItem} style={[styles.btn, { marginHorizontal: 0 }]} />
        <Button icon="delete" onPress={handleRemoveItem} style={[styles.btn, { marginHorizontal: 0 }]} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1, // Take up all available space
  },
  itemText: {
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 10,
  },
  quantityText: {
    fontSize: 14,
    color: '#666',
    marginRight: 10
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btn: {
    marginHorizontal: 0,
  },
});

export default GroceryItem;
