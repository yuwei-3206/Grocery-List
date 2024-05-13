import React, { useState } from 'react';
import { View, StyleSheet, FlatList, TouchableOpacity, Image, Modal, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-paper';
import RecipesModal from './RecipesModal';

const recipes = [
  { id: 1, title: 'Spaghetti Bolognese', ingredients: ['Spaghetti', 'Ground Beef', 'Tomato Sauce'], image: require('../assets/spaghetti.jpg') },
  { id: 2, title: 'Chicken Stir Fry', ingredients: ['Chicken Breast', 'Bell Pepper', 'Broccoli'], image: require('../assets/stir_fry.jpg') },
  { id: 3, title: 'Vegetable Soup', ingredients: ['Carrots', 'Potatoes', 'Onion', 'Vegetable Broth'], image: require('../assets/vegetable_soup.jpg') },
  { id: 4, title: 'Salmon Bowl', ingredients: ['Salmon', 'Rice', 'Avocado', 'Egg'], image: require('../assets/salmon_bowl.jpg') },
  { id: 5, title: 'Tikka Masala', ingredients: ['Chicken', 'Rice', 'Yogurt', 'Masala Paste'], image: require('../assets/tikka_masala.jpg') },
  { id: 6, title: 'Creme Brulee', ingredients: ['Egg', 'Heavy Cream', 'Sugar', 'Vanilla Extract'], image: require('../assets/creme_brulee.jpg') },
  { id: 7, title: 'Tiramisu', ingredients: ['Espresso', 'Heavy Whipped Cream', 'Cocoa Powder', 'Mascarpone'], image: require('../assets/tiramisu.jpg') },
  { id: 8, title: 'Eggs Benedict', ingredients: ['Egg', 'English Muffin', 'Bacon', 'Butter'], image: require('../assets/eggs_benedict.jpg') }
];

const RecipesPage = ({}) => {
  const [selectedRecipe, setSelectedRecipe] = useState(null);

  /*const toggleNumColumns = () => {
    const newNumColumns = numColumns === 2 ? 1 : 2;
    setNumColumns(newNumColumns);
  };*/

  const handleRecipePress = (recipe) => {
    setSelectedRecipe(recipe);
  };

  const handleCloseModal = () => {
    setSelectedRecipe(null);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Recipes</Text>
      <FlatList
        data={recipes}
        numColumns={2}
        renderItem={({ item }) => (
          <TouchableOpacity onPress={() => handleRecipePress(item)}>
            <View style={styles.recipeContainer}>
              <Image source={item.image} style={styles.recipeImage} />
              <Text style={styles.recipeTitle}>{item.title}</Text>
            </View>
          </TouchableOpacity>
        )}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.flatListContent}
      />

      <RecipesModal selectedRecipe={selectedRecipe} onCloseModal={handleCloseModal} />
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
  recipeContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 10,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  recipeImage: {
    width: 148,
    height: 148,
    marginBottom: 10
  },
  recipeTitle: {
    textAlign: 'center',
    fontSize: 16
  },
  flatListContent: {
    flexGrow: 1
  }
});

export default RecipesPage;
