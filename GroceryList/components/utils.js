// utils.js
import AsyncStorage from '@react-native-async-storage/async-storage';

export const loadProfile = async (name) => {
  try {
    const profileData = await AsyncStorage.getItem(name);
    if (profileData !== null) {
      return JSON.parse(profileData);
    }
  } catch (error) {
    console.error('Error loading profile:', error);
  }
  return null;
};
