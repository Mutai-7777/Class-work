import React from 'react';
import '../styles/bottomnavigation.css';

function BottomNavigation({ activeScreen, setActiveScreen, className }) {
  // Update icons to be more Instagram-like
  const navItems = [
    { id: 'home', icon: 'fa-home', label: 'Home' },
    { id: 'profile', icon: 'fa-user', label: 'Profile' },
    { id: 'reels', icon: 'fa-film', label: 'Reels' }, // Changed to film icon for reels
    { id: 'settings', icon: 'fa-cog', label: 'Settings' }
  ];

  return (
    <nav className={`bottom-navigation ${className || ''}`}>
      {navItems.map(item => (
        <button
          key={item.id}
          className={`nav-item ${activeScreen === item.id ? 'active' : ''}`}
          onClick={() => setActiveScreen(item.id)}
          data-screen={item.id}
        >
          <i className={`fas ${item.icon}`}></i>
          <span className="nav-label">{item.label}</span>
        </button>
      ))}
    </nav>
  );
}

export default BottomNavigation;
