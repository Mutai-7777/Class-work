import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/settingsscreen.css';

function SettingsScreen() {
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  
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
            <button className="settings-action">
              <span>Normal</span>
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
            <button className="settings-action">
              <span>Off</span>
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
            <div className="settings-action">
              <span>English</span>
              <i className="fas fa-chevron-right"></i>
            </div>
          </div>
        </div>
      </div>
      
      <div className="settings-group">
        <div className="settings-list">
          <div className="settings-item danger-item">
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
    </div>
  );
}

export default SettingsScreen;
