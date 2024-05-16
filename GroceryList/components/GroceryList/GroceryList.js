import React from 'react';
import { View, FlatList, StyleSheet } from 'react-native';
import Checkbox from 'expo-checkbox';
import GroceryItem from './GroceryItem';
import EditGroceryItem from './EditGroceryItem';

const GroceryList = ({ groceryList, editIndex, handleEditItem, handleRemoveItem, handleToggleCheck, ...editProps }) => {
  return (
    <FlatList
      data={groceryList}
      renderItem={({ item, index }) => (
        <View style={styles.groceryListContainer}>
          <Checkbox value={item.checked} onValueChange={() => handleToggleCheck(index)} style={styles.groceryListCheckbox}/>
          
          {editIndex === index ? (
            <EditGroceryItem {...editProps} index={index} />
          ) : (
            <GroceryItem
              item={item}
              handleEditItem={() => handleEditItem(index)}
              handleRemoveItem={() => handleRemoveItem(index)}
            />
          )}
        </View>
      )}
    />
  );
};

const styles = StyleSheet.create({
  groceryListContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5
  },
  groceryListCheckbox: {
    marginRight: 10
  }
});

export default GroceryList;
