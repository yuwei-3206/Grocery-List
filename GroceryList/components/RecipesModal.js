import React from 'react';
import { View, StyleSheet, Image, Modal, ScrollView } from 'react-native';
import { Text, Button } from 'react-native-paper';

const RecipesModal = ({ selectedRecipe, onCloseModal }) => {
  return (
    <Modal visible={!!selectedRecipe} animationType="slide" onRequestClose={onCloseModal}>
      {selectedRecipe && (
        <ScrollView style={styles.modalContainer}>
          <Image source={selectedRecipe.image} style={styles.modalImage} resizeMode="cover" />
          <Text style={styles.modalTitle}>{selectedRecipe.title}</Text>
          <Text style={styles.modalSubtitle}>Ingredients:</Text>
          {selectedRecipe && selectedRecipe.ingredients && (
            <View style={styles.ingredientsContainer}>
              {selectedRecipe.ingredients.map((ingredient, index) => (
                <Text key={index} style={styles.modalText}>{ingredient}, </Text>
              ))}
            </View>
          )}
          {selectedRecipe && selectedRecipe.steps && (
            <View>
              <Text style={styles.modalSubtitle}>Steps:</Text>
              {selectedRecipe.steps.map((step, index) => (
                <Text key={index} style={styles.modalText}>{step}</Text>
              ))}
            </View>
          )}
          <Button mode="contained" onPress={onCloseModal} style={styles.closeButton}>Close</Button>
        </ScrollView>
      )}
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20
  },
  modalImage: {
    width: '100%',
    height: 600,
    marginBottom: 20
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  modalSubtitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  ingredientsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  modalText: {
    fontSize: 15
  },
  closeButton: {
    marginTop: 20
  }
});

export default RecipesModal;
