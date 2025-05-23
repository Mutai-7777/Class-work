import React, { useState, useEffect } from 'react';
import StatusBar from './components/StatusBar';
import BottomNavigation from './components/BottomNavigation';
import HomeScreen from './screens/HomeScreen';
import ProfileScreen from './screens/ProfileScreen';
import ReelsScreen from './screens/ReelsScreen';
import SettingsScreen from './screens/SettingsScreen';
import './styles/global.css';

function App() {
  const [activeScreen, setActiveScreen] = useState('home');
  
  // Add event listener for custom navigation
  useEffect(() => {
    const handleNavigation = (event) => {
      const { screen } = event.detail;
      if (screen) {
        setActiveScreen(screen);
      }
    };
    
    window.addEventListener('navigateTo', handleNavigation);
    
    return () => {
      window.removeEventListener('navigateTo', handleNavigation);
    };
  }, []);

  const renderScreen = () => {
    switch (activeScreen) {
      case 'home':
        return <HomeScreen />;
      case 'profile':
        return <ProfileScreen />;
      case 'reels':
        return <ReelsScreen />;
      case 'settings':
        return <SettingsScreen />;
      default:
        return <HomeScreen />;
    }
  };

  return (
    <div className="app-container">
      <StatusBar />
      <div className="screen-container">
        {renderScreen()}
      </div>
      <BottomNavigation 
        activeScreen={activeScreen} 
        setActiveScreen={setActiveScreen}
        className={activeScreen === 'reels' ? 'instagram-style' : ''}
      />
    </div>
  );
}

export default App;
