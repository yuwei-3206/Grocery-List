import React, { useState } from 'react';
import { BottomNavigation } from 'react-native-paper';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';
import Dashboard from './components/Dashboard';
import ProfilePage from './components/ProfilePage';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [firstName, setFirstName] = useState('');
  const [userId, setUserId] = useState('');

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch('http://10.0.0.176:5000/users/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });
  
      const data = await response.json();
  
      if (data.success) {
        setIsLoggedIn(true);
        setUserId(data.id);
        setFirstName(data.firstName);
      } else {
        console.error('Login failed:', data.message);
      }
    } catch (error) {
      console.error('Error logging in:', error);
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setFirstName('');
  };

  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'dashboard', title: 'Dashboard', focusedIcon: 'book' },
    { key: 'profile', title: 'Profile', focusedIcon: 'account' },
  ]);

  const renderScene = BottomNavigation.SceneMap({
  dashboard: () => <Dashboard userId={userId} firstName={firstName} />,
  profile: () => <ProfilePage userId={userId} handleLogout={handleLogout} />,
});

  

  return (
    <>
      <SafeAreaProvider>
        {!isLoggedIn ? (
          <>
            <LoginForm onLogin={handleLogin} />
          </>
        ) : (
          /*<Dashboard userId={userId} firstName={firstName}/>*/
          
          <BottomNavigation
            navigationState={{ index, routes }}
            onIndexChange={setIndex}
            renderScene={renderScene}
          />
          
        )}
      </SafeAreaProvider>
    </>
  );
};

export default App;
