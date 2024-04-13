import React, { useState } from 'react';
import { View, TextInput, Button, StyleSheet } from 'react-native';

const EditGroceryItem = ({ item, onSave, onCancel }) => {
  const [inputText, setInputText] = useState(item.item);
  const [selectedQuantity, setSelectedQuantity] = useState(item.quantity);

  const handleIncreaseQuantity = () => {
    setSelectedQuantity(selectedQuantity + 1);
  };

  const handleDecreaseQuantity = () => {
    if (selectedQuantity > 1) {
      setSelectedQuantity(selectedQuantity - 1);
    }
  };

  const handleSave = () => {
    onSave(inputText, selectedQuantity);
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        value={inputText}
        onChangeText={setInputText}
      />
      <View style={styles.quantityContainer}>
        <Button title="-" onPress={handleDecreaseQuantity} />
        <TextInput
          style={styles.quantityInput}
          value={selectedQuantity.toString()}
          onChangeText={(text) => setSelectedQuantity(parseInt(text) || 0)}
          keyboardType="numeric"
        />
        <Button title="+" onPress={handleIncreaseQuantity} />
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Save" onPress={handleSave} />
        <Button title="Cancel" onPress={onCancel} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  input: {
    marginBottom: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 5,
  },
  quantityContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 10,
  },
  quantityInput: {
    width: 50,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
});

export default EditGroceryItem;
