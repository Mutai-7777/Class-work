import React, { useState } from 'react';
import '../styles/navbar.css';

function Navbar({ title, showBackButton, onBackClick, className }) {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const handleSearchClick = () => {
    setIsSearchActive(!isSearchActive);
    if (isSearchActive) {
      setSearchQuery('');
    }
  };
  
  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    // In a real app, this would trigger search functionality
    console.log('Searching for:', e.target.value);
  };
  
  const handleCameraClick = () => {
    alert('Camera functionality would open here');
  };
  
  const handleMessageClick = () => {
    alert('Messaging functionality would open here');
  };
  
  return (
    <div className={`navbar ${className || ''}`}>
      {showBackButton && (
        <button className="back-button" onClick={onBackClick}>
          <i className="fas fa-arrow-left"></i>
        </button>
      )}
      
      {isSearchActive ? (
        <div className="search-container">
          <i className="fas fa-search search-icon"></i>
          <input 
            type="text" 
            className="search-input" 
            placeholder="Search..." 
            value={searchQuery}
            onChange={handleSearchChange}
            autoFocus
          />
          <button className="search-cancel" onClick={handleSearchClick}>
            <i className="fas fa-times"></i>
          </button>
        </div>
      ) : (
        <h1 className="navbar-title">{title}</h1>
      )}
      
      <div className="navbar-actions">
        {!isSearchActive && (
          <>
            <button className="action-button" onClick={handleSearchClick}>
              <i className="fas fa-search"></i>
            </button>
            <button className="action-button" onClick={handleCameraClick}>
              <i className="fas fa-camera"></i>
            </button>
            <button className="action-button" onClick={handleMessageClick}>
              <i className="fas fa-paper-plane"></i>
            </button>
          </>
        )}
      </div>
    </div>
  );
}

export default Navbar;
