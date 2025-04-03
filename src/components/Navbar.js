import React from 'react';
import '../styles/navbar.css';

function Navbar({ title, showBackButton, onBackClick, className }) {
  return (
    <div className={`navbar ${className || ''}`}>
      {showBackButton && (
        <button className="back-button" onClick={onBackClick}>
          <i className="fas fa-arrow-left"></i>
        </button>
      )}
      <h1 className="navbar-title">{title}</h1>
      <div className="navbar-actions">
        <button className="action-button">
          <i className="fas fa-camera"></i>
        </button>
        <button className="action-button">
          <i className="fas fa-paper-plane"></i>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
