import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, TextInput, Button } from 'react-native-paper';

export default function CreatePlanForm({ onSubmit, onCancel }) {
  const [location, setLocation] = useState('');
  const [days, setDays] = useState('');

  const handleSubmit = () => {
    onSubmit({ location, days});
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Travel Plan</Text>
      <TextInput
        placeholder="Location"
        value={location}
        onChangeText={setLocation}
      />
      <TextInput
        placeholder="How many days"
        value={days}
        onChangeText={setDays}
      />
      {/*
      <TextInput
        placeholder="Title"
        value={title}
        onChangeText={setTitle}
      />
      <TextInput
        placeholder="Description"
        value={description}
        onChangeText={setDescription}
      />
      
      <TextInput
        placeholder="Start Date"
        value={startDate}
        onChangeText={setStartDate}
      />
      <TextInput
        placeholder="End Date"
        value={endDate}
        onChangeText={setEndDate}
  />*/}
      <Button mode="contained" onPress={handleSubmit}>Create Travel Plan</Button>
      <Button mode="outlined" onPress={onCancel}>Cancel</Button>
    </View>
  );
}

const styles = StyleSheet.create({
title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
  }
});