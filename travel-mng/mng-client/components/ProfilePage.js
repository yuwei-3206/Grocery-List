import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Text, Button } from 'react-native-paper';

export default function ProfilePage({ userId, handleLogout }) {
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const response = await fetch(`http://10.0.0.176:5000/users/${userId}`);
        const data = await response.json();

        if (data.user) {
          setUserData(data.user);
        } else {
          console.error('Error fetching user data:', data.error);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
      }
    };

    fetchUserData();
  }, [userId]);

  const handleLogoutPress = () => {
    handleLogout();
  };

  return (
    <View style={styles.container}>
      {userData ? (
        <>
          <Text style={styles.title}>Profile</Text>
          <Text style={styles.text}>First Name: {userData.firstName || '—'}</Text>
          <Text style={styles.text}>Last Name: {userData.lastName || '—'}</Text>
          <Text style={styles.text}>Username: {userData.username || '—'}</Text>
        </>
      ) : (
        <Text>Loading user data...</Text>
      )}
      <Button mode="contained" onPress={handleLogoutPress} >Log Out</Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  text: {
    marginBottom: 5,
  },
});
