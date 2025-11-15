import React, { useState } from 'react';
import LoginScreen from './screens/LoginScreen';
import SignupScreen from './screens/SignupScreen';
import DashboardScreen from './screens/DashboardScreen';
import ProfileScreen from './screens/ProfileScreen';
import { User, AssetCategory, NotificationSound, DataTimeRange } from './types';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

type Screen = 'login' | 'signup' | 'dashboard' | 'profile';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#818cf8', // Corresponds to Tailwind's indigo-400
    },
    background: {
      default: '#0f172a', // slate-900
      paper: '#1e293b',   // slate-800
    },
    text: {
      primary: '#e2e8f0', // slate-200
      secondary: '#94a3b8', // slate-400
    }
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    button: {
      textTransform: 'none',
      fontWeight: 'bold',
    }
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        }
      }
    }
  }
});

const App: React.FC = () => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [currentScreen, setCurrentScreen] = useState<Screen>('login');

  const handleLogin = () => {
    setCurrentUser({
      id: '123',
      name: 'Alex Doe',
      email: 'alex.doe@example.com',
      preferences: {
        defaultCategory: AssetCategory.Crypto,
        notificationSound: NotificationSound.Default,
        dataTimeRange: DataTimeRange.OneDay,
      }
    });
    setCurrentScreen('dashboard');
  };

  const handleLogout = () => {
    setCurrentUser(null);
    setCurrentScreen('login');
  };

  const handleShowSignup = () => setCurrentScreen('signup');
  const handleShowLogin = () => setCurrentScreen('login');
  const handleShowProfile = () => setCurrentScreen('profile');
  const handleBackToDashboard = () => setCurrentScreen('dashboard');
  
  const handleSavePreferences = (updatedUser: User) => {
    setCurrentUser(updatedUser);
    setCurrentScreen('dashboard');
  };


  const renderScreen = () => {
    if (currentUser) {
        switch (currentScreen) {
            case 'profile':
                return <ProfileScreen user={currentUser} onSave={handleSavePreferences} onBack={handleBackToDashboard} />;
            case 'dashboard':
            default:
                return <DashboardScreen user={currentUser} onLogout={handleLogout} onShowProfile={handleShowProfile} />;
        }
    }

    switch (currentScreen) {
      case 'signup':
        return <SignupScreen onSignupSuccess={handleLogin} onShowLogin={handleShowLogin} />;
      case 'login':
      default:
        return <LoginScreen onLogin={handleLogin} onShowSignup={handleShowSignup} />;
    }
  };

  return (
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      {renderScreen()}
    </ThemeProvider>
  );
};

export default App;