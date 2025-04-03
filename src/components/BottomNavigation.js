import React from 'react';
import '../styles/bottomnavigation.css';

function BottomNavigation({ activeScreen, setActiveScreen }) {
  const navItems = [
    { id: 'home', icon: 'fa-home', label: 'Home' },
    { id: 'profile', icon: 'fa-user', label: 'Profile' },
    { id: 'reels', icon: 'fa-video', label: 'Reels' },
    { id: 'settings', icon: 'fa-cog', label: 'Settings' }
  ];

  return (
    <nav className="bottom-navigation">
      {navItems.map(item => (
        <button
          key={item.id}
          className={`nav-item ${activeScreen === item.id ? 'active' : ''}`}
          onClick={() => setActiveScreen(item.id)}
        >
          <i className={`fas ${item.icon}`}></i>
          <span className="nav-label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

export default BottomNavigation;
