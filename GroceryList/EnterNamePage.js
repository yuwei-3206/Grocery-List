import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet } from 'react-native';

const EnterNamePage = ({ onSubmitName }) => {
  const [name, setName] = useState('');

  const handleSubmit = () => {
    onSubmitName(name);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Enter Your Name</Text>
      <TextInput
        style={styles.createNameTextInput}
        placeholder="Your Name"
        value={name}
        onChangeText={setName}
      />
      <Button title="Submit" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 30,
        justifyContent: 'center'
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 20
    },
    createNameTextInput: {
        borderWidth: 1,
        borderColor: 'gray',
        marginBottom: 20,
        padding: 10
    }
});

export default EnterNamePage;
