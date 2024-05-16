import React from 'react';
import { View } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';

const EditGroceryListItem = ({ index, editInputText, setEditInputText, editSelectedQuantity, handleDecreaseEditQuantity, handleIncreaseEditQuantity, handleSaveItem, setEditIndex }) => {
  return (
    <View>
      <TextInput
        style={styles.textInput}
        value={editInputText}
        onChangeText={(text) => setEditInputText(text)}
      />
      <View style={styles.container}>
        <Button icon="minus" onPress={handleDecreaseEditQuantity} />
        <Text style={{ marginHorizontal: 10 }}>{editSelectedQuantity}</Text>
        <Button icon="plus" onPress={handleIncreaseEditQuantity} />
        <Button onPress={() => handleSaveItem(index)} style={styles.btn}>Save</Button>
        <Button onPress={() => setEditIndex(null)} style={styles.btn}>Cancel</Button>
      </View>
      
    </View>
  );
};

const styles = {
  container: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
  },
  btn: {
    marginHorizontal: 5,
  },
};

export default EditGroceryListItem;
