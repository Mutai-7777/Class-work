import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../styles/settingsscreen.css';

function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const [showFontSizeModal, setShowFontSizeModal] = useState(false);
  const [fontSize, setFontSize] = useState('Normal');
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [language, setLanguage] = useState('English');
  const [showDataSaverModal, setShowDataSaverModal] = useState(false); 
  const [dataSaver, setDataSaver] = useState('Off');
  
  // Apply dark mode effect when the toggle changes
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    
    // Save preferences to localStorage
    savePreferences();
  }, [darkMode, notifications, emailUpdates, autoplay, fontSize, language, dataSaver]);
  
  // Initialize settings from localStorage on component mount
  useEffect(() => {
    const savedPreferences = localStorage.getItem('appPreferences');
    if (savedPreferences) {
      try {
        const preferences = JSON.parse(savedPreferences);
        setDarkMode(preferences.darkMode || false);
        setNotifications(preferences.notifications !== undefined ? preferences.notifications : true);
        setEmailUpdates(preferences.emailUpdates || false);
        setAutoplay(preferences.autoplay !== undefined ? preferences.autoplay : true);
        setFontSize(preferences.fontSize || 'Normal');
        setLanguage(preferences.language || 'English');
        setDataSaver(preferences.dataSaver || 'Off');
      } catch (error) {
        console.error('Error loading saved preferences:', error);
      }
    }
  }, []);
  
  const savePreferences = () => {
    const preferences = {
      darkMode,
      notifications,
      emailUpdates,
      autoplay,
      fontSize,
      language,
      dataSaver
    };
    
    localStorage.setItem('appPreferences', JSON.stringify(preferences));
    console.log('Preferences saved:', preferences);
  };
  
  const handleFontSizeSelect = (size) => {
    setFontSize(size);
    setShowFontSizeModal(false);
  };
  
  const handleLanguageSelect = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    setShowLanguageModal(false);
  };
  
  const handleDataSaverSelect = (option) => {
    setDataSaver(option);
    setShowDataSaverModal(false);
  };
  
  const handleSignOut = () => {
    if (window.confirm('Are you sure you want to sign out?')) {
      // Clear any user data from localStorage
      localStorage.removeItem('userData');
      alert('You have been signed out');
      // In a real app, we would redirect to login screen
    }
  };
  
  return (
    <div className="screen">
      <Navbar title="Settings" />
      
      <div className="settings-group">
        <h3 className="settings-group-title">Display</h3>
        <div className="settings-list">
          <div className="settings-item">
            <div className="settings-item-info">
              <i className="fas fa-moon settings-item-icon"></i>
              <div className="settings-item-content">
                <h4 className="settings-item-title">Dark Mode</h4>
                <p className="settings-item-description">Enable dark theme</p>
              </div>
            </div>
            <label className="toggle">
              <input 
                type="checkbox" 
                checked={darkMode} 
                onChange={() => setDarkMode(!darkMode)} 
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          
          <div className="settings-item">
            <div className="settings-item-info">
              <i className="fas fa-text-height settings-item-icon"></i>
              <div className="settings-item-content">
                <h4 className="settings-item-title">Font Size</h4>
                <p className="settings-item-description">Adjust text size</p>
              </div>
            </div>
            <button className="settings-action" onClick={() => setShowFontSizeModal(true)}>
              <span>{fontSize}</span>
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
      
      <div className="settings-group">
        <h3 className="settings-group-title">Notifications</h3>
        <div className="settings-list">
          <div className="settings-item">
            <div className="settings-item-info">
              <i className="fas fa-bell settings-item-icon"></i>
              <div className="settings-item-content">
                <h4 className="settings-item-title">Push Notifications</h4>
                <p className="settings-item-description">Receive notifications</p>
              </div>
            </div>
            <label className="toggle">
              <input 
                type="checkbox" 
                checked={notifications} 
                onChange={() => setNotifications(!notifications)} 
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          
          <div className="settings-item">
            <div className="settings-item-info">
              <i className="fas fa-envelope settings-item-icon"></i>
              <div className="settings-item-content">
                <h4 className="settings-item-title">Email Updates</h4>
                <p className="settings-item-description">Receive promotional emails</p>
              </div>
            </div>
            <label className="toggle">
              <input 
                type="checkbox" 
                checked={emailUpdates} 
                onChange={() => setEmailUpdates(!emailUpdates)} 
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
        </div>
      </div>
      
      <div className="settings-group">
        <h3 className="settings-group-title">Media</h3>
        <div className="settings-list">
          <div className="settings-item">
            <div className="settings-item-info">
              <i className="fas fa-play-circle settings-item-icon"></i>
              <div className="settings-item-content">
                <h4 className="settings-item-title">Autoplay Videos</h4>
                <p className="settings-item-description">Play videos automatically</p>
              </div>
            </div>
            <label className="toggle">
              <input 
                type="checkbox" 
                checked={autoplay} 
                onChange={() => setAutoplay(!autoplay)} 
              />
              <span className="toggle-slider"></span>
            </label>
          </div>
          
          <div className="settings-item">
            <div className="settings-item-info">
              <i className="fas fa-wifi settings-item-icon"></i>
              <div className="settings-item-content">
                <h4 className="settings-item-title">Data Saver</h4>
                <p className="settings-item-description">Reduce data usage</p>
              </div>
            </div>
            <button className="settings-action" onClick={() => setShowDataSaverModal(true)}>
              <span>{dataSaver}</span>
              <i className="fas fa-chevron-right"></i>
            </button>
          </div>
        </div>
      </div>
      
      <div className="settings-group">
        <h3 className="settings-group-title">Account</h3>
        <div className="settings-list">
          <div className="settings-item action-item">
            <div className="settings-item-info">
              <i className="fas fa-user settings-item-icon"></i>
              <div className="settings-item-content">
                <h4 className="settings-item-title">Personal Information</h4>
              </div>
            </div>
            <i className="fas fa-chevron-right"></i>
          </div>
          
          <div className="settings-item action-item">
            <div className="settings-item-info">
              <i className="fas fa-lock settings-item-icon"></i>
              <div className="settings-item-content">
                <h4 className="settings-item-title">Security</h4>
              </div>
            </div>
            <i className="fas fa-chevron-right"></i>
          </div>
          
          <div className="settings-item action-item">
            <div className="settings-item-info">
              <i className="fas fa-language settings-item-icon"></i>
              <div className="settings-item-content">
                <h4 className="settings-item-title">Language</h4>
              </div>
            </div>
            <div className="settings-action" onClick={() => setShowLanguageModal(true)}>
              <span>{language}</span>
              <i className="fas fa-chevron-right"></i>
            </div>
          </div>
        </div>
      </div>
      
      <div className="settings-group">
        <div className="settings-list">
          <div className="settings-item danger-item" onClick={handleSignOut}>
            <div className="settings-item-info">
              <i className="fas fa-sign-out-alt settings-item-icon"></i>
              <div className="settings-item-content">
                <h4 className="settings-item-title">Sign Out</h4>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="app-info">
        <p className="app-version">Version 1.0.0</p>
      </div>
      
      {/* Font Size Modal */}
      {showFontSizeModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Font Size</h3>
              <button className="modal-close" onClick={() => setShowFontSizeModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <ul className="option-list">
                <li 
                  className={`option-item ${fontSize === 'Small' ? 'selected' : ''}`}
                  onClick={() => handleFontSizeSelect('Small')}
                >
                  <span className="option-text">Small</span>
                  {fontSize === 'Small' && <i className="fas fa-check"></i>}
                </li>
                <li 
                  className={`option-item ${fontSize === 'Normal' ? 'selected' : ''}`}
                  onClick={() => handleFontSizeSelect('Normal')}
                >
                  <span className="option-text">Normal</span>
                  {fontSize === 'Normal' && <i className="fas fa-check"></i>}
                </li>
                <li 
                  className={`option-item ${fontSize === 'Large' ? 'selected' : ''}`}
                  onClick={() => handleFontSizeSelect('Large')}
                >
                  <span className="option-text">Large</span>
                  {fontSize === 'Large' && <i className="fas fa-check"></i>}
                </li>
                <li 
                  className={`option-item ${fontSize === 'Extra Large' ? 'selected' : ''}`}
                  onClick={() => handleFontSizeSelect('Extra Large')}
                >
                  <span className="option-text">Extra Large</span>
                  {fontSize === 'Extra Large' && <i className="fas fa-check"></i>}
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      
      {/* Language Modal */}
      {showLanguageModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Language</h3>
              <button className="modal-close" onClick={() => setShowLanguageModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <ul className="option-list">
                <li 
                  className={`option-item ${language === 'English' ? 'selected' : ''}`}
                  onClick={() => handleLanguageSelect('English')}
                >
                  <span className="option-text">English</span>
                  {language === 'English' && <i className="fas fa-check"></i>}
                </li>
                <li 
                  className={`option-item ${language === 'Spanish' ? 'selected' : ''}`}
                  onClick={() => handleLanguageSelect('Spanish')}
                >
                  <span className="option-text">Spanish</span>
                  {language === 'Spanish' && <i className="fas fa-check"></i>}
                </li>
                <li 
                  className={`option-item ${language === 'French' ? 'selected' : ''}`}
                  onClick={() => handleLanguageSelect('French')}
                >
                  <span className="option-text">French</span>
                  {language === 'French' && <i className="fas fa-check"></i>}
                </li>
                <li 
                  className={`option-item ${language === 'German' ? 'selected' : ''}`}
                  onClick={() => handleLanguageSelect('German')}
                >
                  <span className="option-text">German</span>
                  {language === 'German' && <i className="fas fa-check"></i>}
                </li>
                <li 
                  className={`option-item ${language === 'Chinese' ? 'selected' : ''}`}
                  onClick={() => handleLanguageSelect('Chinese')}
                >
                  <span className="option-text">Chinese</span>
                  {language === 'Chinese' && <i className="fas fa-check"></i>}
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      
      {/* Data Saver Modal */}
      {showDataSaverModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Data Saver</h3>
              <button className="modal-close" onClick={() => setShowDataSaverModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <ul className="option-list">
                <li 
                  className={`option-item ${dataSaver === 'Off' ? 'selected' : ''}`}
                  onClick={() => handleDataSaverSelect('Off')}
                >
                  <span className="option-text">Off</span>
                  <span className="option-description">Use standard data (recommended for Wi-Fi)</span>
                  {dataSaver === 'Off' && <i className="fas fa-check"></i>}
                </li>
                <li 
                  className={`option-item ${dataSaver === 'Low' ? 'selected' : ''}`}
                  onClick={() => handleDataSaverSelect('Low')}
                >
                  <span className="option-text">Low</span>
                  <span className="option-description">Reduce image quality slightly</span>
                  {dataSaver === 'Low' && <i className="fas fa-check"></i>}
                </li>
                <li 
                  className={`option-item ${dataSaver === 'High' ? 'selected' : ''}`}
                  onClick={() => handleDataSaverSelect('High')}
                >
                  <span className="option-text">High</span>
                  <span className="option-description">Load images at lower resolution and disable auto-play</span>
                  {dataSaver === 'High' && <i className="fas fa-check"></i>}
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default SettingsScreen;
