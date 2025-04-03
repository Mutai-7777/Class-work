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
  const [showPersonalInfoModal, setShowPersonalInfoModal] = useState(false);
  const [showSecurityModal, setShowSecurityModal] = useState(false);
  
  // Add state for security settings
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [showActivityModal, setShowActivityModal] = useState(false);
  
  // Apply dark mode effect when the toggle changes
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
    
    // Save preferences to localStorage
    savePreferences();
  }, [darkMode, notifications, emailUpdates, autoplay, fontSize, language, dataSaver, twoFactorEnabled]);
  
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
        setTwoFactorEnabled(preferences.twoFactorEnabled || false);
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
      dataSaver,
      twoFactorEnabled
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
  
  const handlePersonalInfo = () => {
    setShowPersonalInfoModal(true);
  };
  
  const handleSecurity = () => {
    setShowSecurityModal(true);
  };
  
  const handleNavigateToProfile = () => {
    // Navigate to profile screen
    window.dispatchEvent(new CustomEvent('navigateTo', { detail: { screen: 'profile' } }));
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
          <div className="settings-item action-item" onClick={handlePersonalInfo}>
            <div className="settings-item-info">
              <i className="fas fa-user settings-item-icon"></i>
              <div className="settings-item-content">
                <h4 className="settings-item-title">Personal Information</h4>
              </div>
            </div>
            <i className="fas fa-chevron-right"></i>
          </div>
          
          <div className="settings-item action-item" onClick={handleSecurity}>
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
      
      {/* Personal Information Modal */}
      {showPersonalInfoModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Personal Information</h3>
              <button className="modal-close" onClick={() => setShowPersonalInfoModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <div className="settings-message">
                <p>To edit your personal information, please go to your profile page.</p>
                <button 
                  className="button primary-button"
                  onClick={() => {
                    handleNavigateToProfile();
                    setShowPersonalInfoModal(false);
                  }}
                >
                  Go to Profile
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* Security Modal */}
      {showSecurityModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Security</h3>
              <button className="modal-close" onClick={() => setShowSecurityModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <ul className="option-list">
                <li className="option-item">
                  <div className="security-option">
                    <div>
                      <span className="option-text">Two-Factor Authentication</span>
                      <span className="option-description">Add an extra layer of security to your account</span>
                    </div>
                    <button className="button outline-button" onClick={() => {
                      setTwoFactorEnabled(!twoFactorEnabled);
                      savePreferences();
                      alert(`Two-factor authentication is now ${twoFactorEnabled ? 'disabled' : 'enabled'}`);
                    }}>
                      {twoFactorEnabled ? 'Disable' : 'Enable'}
                    </button>
                  </div>
                </li>
                <li className="option-item">
                  <div className="security-option">
                    <div>
                      <span className="option-text">Password</span>
                      <span className="option-description">Change your account password</span>
                    </div>
                    <button className="button outline-button" onClick={() => {
                      setShowPasswordModal(true);
                      setShowSecurityModal(false);
                    }}>
                      Change
                    </button>
                  </div>
                </li>
                <li className="option-item">
                  <div className="security-option">
                    <div>
                      <span className="option-text">Login Activity</span>
                      <span className="option-description">Review your account login history</span>
                    </div>
                    <button className="button outline-button" onClick={() => {
                      setShowActivityModal(true);
                      setShowSecurityModal(false);
                    }}>
                      View
                    </button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      )}
      
      {/* Password Change Modal */}
      {showPasswordModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Change Password</h3>
              <button className="modal-close" onClick={() => setShowPasswordModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <form className="settings-form" onSubmit={(e) => {
                e.preventDefault();
                alert('Password changed successfully!');
                setShowPasswordModal(false);
              }}>
                <div className="form-group">
                  <label htmlFor="currentPassword">Current Password</label>
                  <input 
                    type="password" 
                    id="currentPassword" 
                    className="form-input" 
                    placeholder="Enter current password"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="newPassword">New Password</label>
                  <input 
                    type="password" 
                    id="newPassword" 
                    className="form-input" 
                    placeholder="Enter new password"
                    required
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirm New Password</label>
                  <input 
                    type="password" 
                    id="confirmPassword" 
                    className="form-input" 
                    placeholder="Confirm new password"
                    required
                  />
                </div>
                <div className="form-actions">
                  <button type="button" className="button outline-button" onClick={() => setShowPasswordModal(false)}>
                    Cancel
                  </button>
                  <button type="submit" className="button primary-button">
                    Save Changes
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* Login Activity Modal */}
      {showActivityModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h3>Login Activity</h3>
              <button className="modal-close" onClick={() => setShowActivityModal(false)}>
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="modal-body">
              <ul className="activity-list">
                <li className="activity-item">
                  <div className="activity-info">
                    <div className="activity-device">
                      <i className="fas fa-mobile-alt"></i>
                      <span>Mobile Device - Android</span>
                    </div>
                    <div className="activity-location">
                      <i className="fas fa-map-marker-alt"></i>
                      <span>New York, United States</span>
                    </div>
                    <div className="activity-time">
                      <i className="fas fa-clock"></i>
                      <span>Today, 9:15 AM</span>
                    </div>
                  </div>
                  <div className="activity-status">
                    <span className="status-indicator active"></span>
                    <span>Current Session</span>
                  </div>
                </li>
                <li className="activity-item">
                  <div className="activity-info">
                    <div className="activity-device">
                      <i className="fas fa-laptop"></i>
                      <span>Mac OS X - Chrome</span>
                    </div>
                    <div className="activity-location">
                      <i className="fas fa-map-marker-alt"></i>
                      <span>New York, United States</span>
                    </div>
                    <div className="activity-time">
                      <i className="fas fa-clock"></i>
                      <span>Yesterday, 7:32 PM</span>
                    </div>
                  </div>
                  <button className="button text-button" onClick={() => {
                    alert('Session logged out');
                  }}>
                    Log Out
                  </button>
                </li>
                <li className="activity-item">
                  <div className="activity-info">
                    <div className="activity-device">
                      <i className="fas fa-tablet-alt"></i>
                      <span>iPad - Safari</span>
                    </div>
                    <div className="activity-location">
                      <i className="fas fa-map-marker-alt"></i>
                      <span>Chicago, United States</span>
                    </div>
                    <div className="activity-time">
                      <i className="fas fa-clock"></i>
                      <span>Apr 1, 2025, 12:45 PM</span>
                    </div>
                  </div>
                  <button className="button text-button" onClick={() => {
                    alert('Session logged out');
                  }}>
                    Log Out
                  </button>
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
