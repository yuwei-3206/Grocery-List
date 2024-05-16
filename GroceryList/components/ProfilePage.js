import React, { useState, useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { Picker } from '@react-native-picker/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { loadProfile } from './utils';

const ProfilePage = ({ name, setShowProfile }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    name: name,
    email: '',
    age: '',
    gender: ''
  });
  const [selectedGender, setSelectedGender] = useState(profile.gender);
  const [originalProfile, setOriginalProfile] = useState({ ...profile });

  useEffect(() => {
    const fetchProfile = async () => {
      const loadedProfile = await loadProfile(name);
      if (loadedProfile) {
        setProfile(loadedProfile);
      }
    };
    fetchProfile();
  }, [name]);

  const saveProfile = () => {
    setOriginalProfile({ ...profile });
    AsyncStorage.setItem(profile.name, JSON.stringify(profile));
  };

  const handleLogout = async () => {
    try {
      setShowProfile(false);
    } catch (error) {
      console.error('Error logging out:', error);
    }
  };

  const handleEditProfile = () => {
    setIsEditing(true);
  };

  const handleSaveProfile = () => {
    if (profile.name.trim() === '' || !/^[a-zA-Z\s]*$/.test(profile.name)) {
      alert('Please enter a valid name.');
      return;
    }
    setIsEditing(false);
    setProfile({ ...profile, gender: selectedGender });
    saveProfile();
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    setProfile({ ...originalProfile });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hello, {profile.name}</Text>
      {isEditing ? (
        <>
          <TextInput
            label="Name"
            value={profile.name}
            onChangeText={(text) => setProfile({ ...profile, name: text })}
            style={styles.input}
          />
          <TextInput
            label="Email"
            value={profile.email}
            onChangeText={(text) => setProfile({ ...profile, email: text })}
            style={styles.input}
          />
          <TextInput
            label="Age"
            value={profile.age}
            onChangeText={(text) => setProfile({ ...profile, age: text })}
            keyboardType="numeric"
            style={styles.input}
          />
          <Text style={styles.label}>Gender:</Text>
          <Picker
            selectedValue={selectedGender}
            onValueChange={(itemValue, itemIndex) => setSelectedGender(itemValue)}
            style={styles.picker}
          >
            <Picker.Item label="Male" value="M" />
            <Picker.Item label="Female" value="F" />
            <Picker.Item label="Other" value="Other" />
          </Picker>

          <Button mode="contained" onPress={handleSaveProfile} style={styles.button}>Save</Button>
          <Button mode="outlined" onPress={handleCancelEdit} style={styles.button}>Cancel</Button>
        </>
      ) : (
        <>
          <Text>Name: {profile.name}</Text>
          <Text>Email: {profile.email}</Text>
          <Text>Age: {profile.age}</Text>
          <Text>Gender: {profile.gender}</Text>
          <Button mode="contained" onPress={handleEditProfile} style={styles.button}>Edit</Button>
        </>
      )}
      <Button mode="contained" onPress={handleLogout} style={styles.button}>Logout</Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
    marginTop: 30
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    marginBottom: 10,
  },
  button: {
    marginTop: 10,
  },
  label: {
    marginTop: 10,
    marginBottom: 5,
  },
  picker: {
    height: 50,
    width: '100%',
  },
});

export default ProfilePage;
