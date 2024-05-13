import React, { useState, useEffect } from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import {Button, Text, TextInput } from 'react-native-paper'; 
import Checkbox from 'expo-checkbox';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
          <Button icon="minus" style={styles.btn} onPress={handleDecreaseCreateQuantity} />
          <Text style={{ marginHorizontal: 1 }}>{createSelectedQuantity}</Text>
          <Button icon="plus" style={styles.btn} onPress={handleIncreaseCreateQuantity} />
          <Button mode="contained" style={{ borderRadius: 10 }} onPress={handleAddItem}>Add</Button>
        </View>
        
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
                <Button icon="minus" onPress={handleDecreaseEditQuantity} />
                <Text style={{ marginHorizontal: 10 }}>{editSelectedQuantity}</Text>
                <Button icon="plus" onPress={handleIncreaseEditQuantity} />
                <Button onPress={() => handleSaveItem(index)} style={styles.btn}>Save</Button>
                <Button title="close-circle" onPress={() => setEditIndex(null)} style={styles.btn}/>
              </View>
            ) : (
              <>
                <Text style={{ flex: 1 }}>{item.item}</Text>
                <Text style={{ marginRight: 10 }}>Qty: {item.quantity}</Text>
                <Button icon="pencil" onPress={() => handleEditItem(index)} style={styles.btn}/>
                <Button icon="delete" onPress={() => handleRemoveItem(index)} style={styles.btn}/>
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
    borderColor: 'gray'
  },
  btn: {
    display: 'flex',
    alignitems: 'center',
    justifycontent: 'center',

  },
  rowCenter: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent:'center'
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
