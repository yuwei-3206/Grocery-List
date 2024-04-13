import React, { useState } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';

const GroceryListPage = ({ name }) => {
  const [createInputText, setCreateInputText] = useState('');
  const [editInputText, setEditInputText] = useState('');
  const [createSelectedQuantity, setCreateSelectedQuantity] = useState(1);
  const [editSelectedQuantity, setEditSelectedQuantity] = useState(1);
  const [groceryList, setGroceryList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  const handleIncreaseCreateQuantity = () => {
    setCreateSelectedQuantity(createSelectedQuantity + 1);
  };

  const handleDecreaseCreateQuantity = () => {
    if (createSelectedQuantity > 1) {
      setCreateSelectedQuantity(createSelectedQuantity - 1);
    }
  };

  const handleIncreaseEditQuantity = () => {
    setEditSelectedQuantity(editSelectedQuantity + 1);
  };

  const handleDecreaseEditQuantity = () => {
    if (editSelectedQuantity > 1) {
      setEditSelectedQuantity(editSelectedQuantity - 1);
    }
  };

  const handleAddItem = () => {
    if (createInputText.trim() === '' || !/^[a-zA-Z\s]*$/.test(createInputText)) {
      setErrorMessage('Please enter a valid item');
      return;
    } else if(groceryList.some((item) => item.item.toLowerCase() === createInputText.trim().toLowerCase())) {
        setErrorMessage('The item is in the list already!');
      return;
    }
    setGroceryList([...groceryList, { item: createInputText, quantity: createSelectedQuantity }]);
    setCreateInputText('');
    setCreateSelectedQuantity(1);
    setErrorMessage('');
  };

  const handleRemoveItem = (index) => {
    const updatedList = [...groceryList];
    updatedList.splice(index, 1);
    setGroceryList(updatedList);
  };

  const handleEditItem = (index) => {
    setEditIndex(index);
    setEditInputText(groceryList[index].item);
    setEditSelectedQuantity(groceryList[index].quantity);
  };

  const handleSaveItem = (index) => {
    if (editInputText.trim() === '' || !/^[a-zA-Z\s]*$/.test(editInputText)) {
      setErrorMessage('Please enter a valid item');
      return;
    } else if(groceryList.some((item, i) => i !== index && item.item.toLowerCase() === editInputText.trim().toLowerCase())) {
      setErrorMessage('The item is already in the list!');
      return;
    }
  
    const updatedList = [...groceryList];
    updatedList[index].item = editInputText;
    updatedList[index].quantity = editSelectedQuantity;
    setGroceryList(updatedList);
    setEditIndex(null);
    setErrorMessage('');
  };

  const handleToggleCheck = (index) => {
    const updatedList = [...groceryList];
    updatedList[index].checked = !updatedList[index].checked;
    setGroceryList(updatedList);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello, {name}</Text>
      <Text style={styles.title}>Create grocery</Text>
      <View style={styles.createGroceryContainer}>
        <TextInput
          style={styles.textInput}
          placeholder="Enter item"
          value={createInputText}
          onChangeText={(text) => {
            setCreateInputText(text);
            setErrorMessage('');
          }}
        />
        <View style={styles.rowCenter}>
          <Button title="-" onPress={handleDecreaseCreateQuantity} />
          <Text style={{ marginHorizontal: 10 }}>{createSelectedQuantity}</Text>
          <Button title="+" onPress={handleIncreaseCreateQuantity} />
        </View>
        <Button
          title="Add"
          onPress={handleAddItem}
          style={styles.btn}
        />
      </View>
      {errorMessage !== '' && <Text style={styles.errorMessage}>{errorMessage}</Text>}
      <Text style={styles.title}>My Grocery List</Text>
      
      <FlatList
        data={groceryList}
        renderItem={({ item, index }) => (
          <View style={styles.groceryListContainer}>
            <Checkbox value={item.checked} onValueChange={() => handleToggleCheck(index)} style={styles.groceryListCheckbox}/>
            
            {editIndex === index ? (
              <View style={styles.rowCenter}>
                <TextInput
                  style={styles.textInput}
                  value={editInputText}
                  onChangeText={(text) => setEditInputText(text)}
                />
                <Button title="-" onPress={handleDecreaseEditQuantity} />
                <Text style={{ marginHorizontal: 10 }}>{editSelectedQuantity}</Text>
                <Button title="+" onPress={handleIncreaseEditQuantity} />
                <Button title="Save" onPress={() => handleSaveItem(index)} style={styles.btn}/>
                <Button title="Cancel" onPress={() => setEditIndex(null)} style={styles.btn}/>
              </View>
            ) : (
              <>
                <Text style={{ flex: 1 }}>{item.item}</Text>
                <Text style={{ marginRight: 20 }}>Qty: {item.quantity}</Text>
                <Button title="Edit" onPress={() => handleEditItem(index)} style={styles.btn}/>
                <Button title="Remove" onPress={() => handleRemoveItem(index)} style={styles.btn}/>
              </>
            )}
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 15
  },
  createGroceryContainer: {
    flexDirection: 'row',
    marginBottom: 20
  },
  textInput: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    marginRight: 10,
    padding: 10
  },
  btn: {
  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  errorMessage: {
    color: 'red',
    marginTop: -10
  },
  groceryListContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  groceryListCheckbox: {
    marginRight: 10
  }
});

export default GroceryListPage;
