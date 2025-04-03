import React from 'react';
import '../styles/navbar.css';

function Navbar({ title, showBackButton, onBackClick }) {
  return (
    <div className="navbar">
      {showBackButton && (
        <button className="back-button" onClick={onBackClick}>
          <i className="fas fa-arrow-left"></i>
        </button>
      )}
      <h1 className="navbar-title">{title}</h1>
      <div className="navbar-actions">
        <button className="action-button">
          <i className="fas fa-search"></i>
        </button>
        <button className="action-button">
          <i className="fas fa-ellipsis-v"></i>
        </button>
      </div>
    </div>
  );
}

export default Navbar;
