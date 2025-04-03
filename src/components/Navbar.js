import React, { useState } from 'react';
import '../styles/navbar.css';
import CameraModal from './CameraModal';
import MessagingModal from './MessagingModal';

function Navbar({ title, showBackButton, onBackClick, className }) {
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showCameraModal, setShowCameraModal] = useState(false);
  const [showMessagingModal, setShowMessagingModal] = useState(false);
  
  const handleSearchClick = () => {
    setIsSearchActive(!isSearchActive);
    if (isSearchActive) {
      setSearchQuery('');
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };
  
  const handleSearchChange = (e) => {
    const query = e.target.value;
    setSearchQuery(query);
    
    if (query.trim().length > 0) {
      // Simulate search functionality
      const fakeResults = [
        { id: 1, title: 'Search result for ' + query, type: 'post' },
        { id: 2, title: 'Another match for ' + query, type: 'user' },
        { id: 3, title: 'Related content to ' + query, type: 'topic' }
      ];
      setSearchResults(fakeResults);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };
  
  const handleCameraClick = () => {
    setShowCameraModal(true);
  };
  
  const handleCameraCapture = (imageUrl) => {
    console.log('Captured image:', imageUrl);
    // Store the captured image in localStorage
    const capturedImages = JSON.parse(localStorage.getItem('capturedImages') || '[]');
    capturedImages.push({
      id: Date.now(),
      url: imageUrl,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('capturedImages', JSON.stringify(capturedImages));
    
    alert('Image captured successfully!');
  };
  
  const handleMessageClick = () => {
    setShowMessagingModal(true);
  };
  
  const handleSearchResultClick = (result) => {
    alert(`You clicked on: ${result.title}`);
    setSearchQuery('');
    setSearchResults([]);
    setShowSearchResults(false);
    setIsSearchActive(false);
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
      
      {/* Search Results Dropdown */}
      {showSearchResults && searchResults.length > 0 && (
        <div className="search-results">
          <ul className="search-results-list">
            {searchResults.map(result => (
              <li 
                key={result.id} 
                className="search-result-item"
                onClick={() => handleSearchResultClick(result)}
              >
                <i className={`fas ${
                  result.type === 'post' ? 'fa-file-alt' : 
                  result.type === 'user' ? 'fa-user' : 'fa-hashtag'
                } search-result-icon`}></i>
                <div className="search-result-text">
                  <span>{result.title}</span>
                  <small>{result.type}</small>
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}
      
      {/* Camera Modal */}
      <CameraModal 
        isOpen={showCameraModal}
        onClose={() => setShowCameraModal(false)}
        onCapture={handleCameraCapture}
      />
      
      {/* Messaging Modal */}
      <MessagingModal 
        isOpen={showMessagingModal}
        onClose={() => setShowMessagingModal(false)}
      />
    </div>
  );
}

export default Navbar;
