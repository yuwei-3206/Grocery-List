import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { TextInput, Button } from 'react-native-paper';
import RegisterForm from './RegisterForm';

export default function LoginForm({ onLogin }) {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showRegistration, setShowRegistration] = useState(false);
  
    const handleLogin = async () => {
      onLogin(username, password);
    };

    const handleSignUpClick = () => {
      setShowRegistration(true);
    };
  
    return (
      <View style={styles.container}>
        <Text>Login</Text>
        <TextInput
          style={styles.input}
          placeholder="Username"
          value={username}
          onChangeText={(text) => setUsername(text)}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true} // Hide password input
          value={password}
          onChangeText={(text) => setPassword(text)}
        />
        <Button mode="contained" onPress={handleLogin}>Log In</Button>
        <Text>No account? Click to join!</Text>
        <Button onPress={handleSignUpClick}>Sign Up</Button>
        
        {showRegistration && <RegisterForm />}
      </View>
    );
}

const styles = StyleSheet.create({
  container: {
    },
    input: {
      fontSize: 18,
      fontWeight: 'bold',
    }
  });
