import React, { useState, useEffect } from 'react';
import { View, FlatList, Modal, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';
import CreatePlanForm from './CreatePlanForm';

export default function Dashboard({ userId, firstName }){
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const response = await fetch(`http://10.0.0.176:5000/travel-plans/list/${userId}`);
      const data = await response.json();
      setPlans(data.travel_plans);
    } catch (error) {
      console.error('Error fetching plans:', error);
    }
  };

  const createPlan = async (formData) => {
    try {
      const response = await fetch('http://10.0.0.176:5000/travel-plans/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...formData, userId }),
      });
      if (response.ok) {
        fetchPlans();
        setShowCreateForm(false);
      } else {
        console.error('Failed to create plan');
      }
    } catch (error) {
      console.error('Error creating plan:', error);
    }
  };
  
  const deletePlan = async (planId) => {
    try {
      const response = await fetch(`http://10.0.0.176:5000/travel-plans/delete/${planId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }), // Include userId in the request body
      });
      if (response.ok) {
        fetchPlans();
      } else {
        console.error('Failed to delete plan');
      }
    } catch (error) {
      console.error('Error deleting plan:', error);
    }
  };
  
  const editPlan = async (planId, updatedData) => {
    try {
      const response = await fetch(`http://10.0.0.176:5000/travel-plans/edit/${planId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...updatedData, userId }), // Include userId in the request body
      });
      if (response.ok) {
        fetchPlans();
      } else {
        console.error('Failed to edit plan');
      }
    } catch (error) {
      console.error('Error editing plan:', error);
    }
  };

  return (
    <View style={styles.container}>
        <Text style={styles.title}>Welcome, {firstName}</Text>
        <Text style={styles.title}>My Travel Plan</Text>
      <Button mode="contained" onPress={() => setShowCreateForm(true)}>Create Plan</Button>
      <Modal visible={showCreateForm} animationType="slide">
        <CreatePlanForm
          onSubmit={(formData) => createPlan(formData)}
          onCancel={() => setShowCreateForm(false)}
        />
      </Modal>
      <FlatList
        data={plans}
        renderItem={({ item }) => (
          <View style={styles.planContainer}>
            <Text style={styles.title}>{item.location}</Text>
            <Text style={styles.title}>{item.days}</Text>
            <Button mode="contained" onPress={() => deletePlan(item.id)}>Delete</Button>
            <Button mode="outlined" onPress={() => editPlan(item.id)}>Edit</Button>
          </View>
        )}
        keyExtractor={(item) => item.id.toString()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30
  },
  planContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-between',
    marginRight: 10,
    marginBottom: 10,
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc'
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10
  },
  subtitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
