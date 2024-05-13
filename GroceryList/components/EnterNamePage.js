import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Button, Text, TextInput } from 'react-native-paper';
import { loadProfile } from './utils';
import ProfilePage from './ProfilePage';

const EnterNamePage = ({ onSubmitName }) => {
  const [name, setName] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [profile, setProfile] = useState(null);

  const handleSubmit = async () => {
    try {
      const loadedProfile = await loadProfile(name);
      if (loadedProfile) {
        setProfile(loadedProfile);
        setShowProfile(true);
        onSubmitName(name);
      } else {
        setShowProfile(false);
        setProfile({ name: name });
        onSubmitName(name);
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    }
  };

  return (
    <View style={styles.container}>
      {!showProfile ? (
        <>
          <Text style={styles.title}>Enter Your Name</Text>
          <TextInput
            style={styles.createNameTextInput}
            placeholder="Your Name"
            value={name}
            onChangeText={setName}
          />
          <Button mode="contained" onPress={handleSubmit}>LOGIN</Button>
        </>
      ) : (
        <ProfilePage name={profile.name} />
      )}
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
