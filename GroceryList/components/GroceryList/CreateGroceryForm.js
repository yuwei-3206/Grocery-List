import React from 'react';
import { View, StyleSheet } from 'react-native';
import { TextInput, Button, Text } from 'react-native-paper';

const CreateGroceryForm = ({ createInputText, setCreateInputText, createSelectedQuantity, handleDecreaseCreateQuantity, handleIncreaseCreateQuantity, handleAddItem, errorMessage }) => {
  return (
    <View>
      <TextInput
        style={styles.textInput}
        placeholder="Enter item"
        value={createInputText}
        onChangeText={(text) => {
          setCreateInputText(text);
        }}
      />
      {errorMessage !== '' && <Text style={styles.errorMessage}>{errorMessage}</Text>}
      <View style={styles.rowCenter}>
        <Button icon="minus" style={styles.btn} onPress={handleDecreaseCreateQuantity} />
        <Text style={{ marginHorizontal: 1 }}>{createSelectedQuantity}</Text>
        <Button icon="plus" style={styles.btn} onPress={handleIncreaseCreateQuantity} />
        <View style={styles.addBtnContainer}>
          <Button mode="contained" onPress={handleAddItem} style={styles.addBtn}>Add</Button>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textInput: {
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start'
  },
  btn: {
    marginHorizontal: 5
  },
  addBtnContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    marginLeft: 10
  },
  addBtn: {
    borderRadius: 10
  },
  errorMessage: {
    color: 'red',
    marginVertical: 3
  }
});

export default CreateGroceryForm;
