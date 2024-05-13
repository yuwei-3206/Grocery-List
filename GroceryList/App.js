import React, { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RecipesPage from './components/RecipesPage';
import GroceryListPage from './components/GroceryListPage';
import ProfilePage from './components/ProfilePage'
import EnterNamePage from './components/EnterNamePage';
import { loadProfile } from './components/utils';

const App = () => {
  const [name, setName] = useState('');
  const [showProfile, setShowProfile] = useState(false);

  const handleSubmitName = (name) => {
    if (name.trim() === ''|| !/^[a-zA-Z\s]*$/.test(name)) {
      // Check if the name is empty or contains only whitespace
      alert('Please enter a valid name.');
      return;
    }
    const cleanedName = name.replace(/\s+/g, '');
    setName(cleanedName);
    setShowProfile(true);
  };

  const [index, setIndex] = useState(2);
  const [routes] = useState([
    { key: 'recipes', title: 'Recipes', focusedIcon: 'book' },
    { key: 'groceryList', title: 'Grocery List', focusedIcon: 'cart' },
    { key: 'profile', title: 'Profile', focusedIcon: 'account' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
    recipes: RecipesPage,
    groceryList: GroceryListPage,
    profile: () => <ProfilePage name={name} setShowProfile={setShowProfile} />,
  });

  return (
    <>
      <SafeAreaProvider>
        {showProfile ? (
          <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
          />
        ) : (
          <EnterNamePage onSubmitName={handleSubmitName} loadProfile={loadProfile} />
        )}
      </SafeAreaProvider>
    </>
  );
};

export default App;
