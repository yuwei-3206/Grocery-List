import React, { useState } from 'react';
import { View } from 'react-native';
import EnterNamePage from './EnterNamePage';
import GroceryListPage from './GroceryListPage';

const App = () => {
  const [name, setName] = useState('');
  const [showGroceryList, setShowGroceryList] = useState(false);

  const handleSubmitName = (name) => {
    setName(name);
    setShowGroceryList(true);
  };

  return (
    <View style={{ flex: 1 }}>
      {!showGroceryList ? (
        <EnterNamePage onSubmitName={handleSubmitName} />
      ) : (
        <GroceryListPage name={name} />
      )}
    </View>
  );
};

export default App;
