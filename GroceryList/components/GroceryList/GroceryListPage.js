import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text } from 'react-native-paper'; 
import AsyncStorage from '@react-native-async-storage/async-storage';
import GroceryList from './GroceryList';
import CreateGroceryForm from './CreateGroceryForm';

const GroceryListPage = ({ name }) => {
  const [createInputText, setCreateInputText] = useState('');
  const [editInputText, setEditInputText] = useState('');
  const [createSelectedQuantity, setCreateSelectedQuantity] = useState(1);
  const [editSelectedQuantity, setEditSelectedQuantity] = useState(1);
  const [groceryList, setGroceryList] = useState([]);
  const [errorMessage, setErrorMessage] = useState('');
  const [editIndex, setEditIndex] = useState(null);

  useEffect(() => {
    const loadGroceryList = async () => {
      try {
        const localList = await AsyncStorage.getItem(`${name}_grocery_list`);
        if (localList !== null) {
          setGroceryList(JSON.parse(localList));
        }
      } catch (error) {
        console.error('Error loading grocery list:', error);
      }
    };
    loadGroceryList();
  }, [name]);

  const saveGroceryList = async (list) => {
    try {
      await AsyncStorage.setItem(`${name}_grocery_list`, JSON.stringify(list));
    } catch (error) {
      console.error('Error saving grocery list:', error);
    }
  };

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
    const updatedList = [...groceryList, { item: createInputText, quantity: createSelectedQuantity }];
    setGroceryList(updatedList);
    setCreateInputText('');
    setCreateSelectedQuantity(1);
    setErrorMessage('');
    saveGroceryList(updatedList);
  };


  const handleRemoveItem = (index) => {
    const updatedList = [...groceryList];
    updatedList.splice(index, 1);
    setGroceryList(updatedList);
    saveGroceryList(updatedList);
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
    saveGroceryList(updatedList);
  };

  const handleToggleCheck = (index) => {
    const updatedList = [...groceryList];
    updatedList[index].checked = !updatedList[index].checked;
    setGroceryList(updatedList);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create grocery</Text>
      <CreateGroceryForm
        createInputText={createInputText}
        setCreateInputText={setCreateInputText}
        createSelectedQuantity={createSelectedQuantity}
        handleDecreaseCreateQuantity={handleDecreaseCreateQuantity}
        handleIncreaseCreateQuantity={handleIncreaseCreateQuantity}
        handleAddItem={handleAddItem}
        errorMessage={errorMessage}
      />

      <Text style={styles.title}>My Grocery List</Text>
      <GroceryList
        groceryList={groceryList}
        editIndex={editIndex}
        handleEditItem={handleEditItem}
        handleRemoveItem={handleRemoveItem}
        handleToggleCheck={handleToggleCheck}
        editInputText={editInputText}
        setEditInputText={setEditInputText}
        editSelectedQuantity={editSelectedQuantity}
        handleDecreaseEditQuantity={handleDecreaseEditQuantity}
        handleIncreaseEditQuantity={handleIncreaseEditQuantity}
        handleSaveItem={handleSaveItem}
        setEditIndex={setEditIndex}
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
});

export default GroceryListPage;
