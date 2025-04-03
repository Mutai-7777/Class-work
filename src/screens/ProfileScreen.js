import React from 'react';
import Navbar from '../components/Navbar';
import '../styles/profilescreen.css';

function ProfileScreen() {
  return (
    <div className="screen">
      <Navbar title="Profile" />
      
      <div className="profile-header">
        <div className="profile-avatar">
          <i className="fas fa-user"></i>
        </div>
        <h2 className="profile-name">User Name</h2>
        <p className="profile-email">user@example.com</p>
        <button className="button ripple profile-edit-button">
          <i className="fas fa-edit"></i> Edit Profile
        </button>
      </div>
      
      <div className="profile-stats">
        <div className="stat-item">
          <span className="stat-value">125</span>
          <span className="stat-label">Posts</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">1.4K</span>
          <span className="stat-label">Followers</span>
        </div>
        <div className="stat-item">
          <span className="stat-value">324</span>
          <span className="stat-label">Following</span>
        </div>
      </div>
      
      <div className="section">
        <h3 className="section-title">My Information</h3>
        <div className="card">
          <ul className="info-list">
            <li className="info-item">
              <i className="fas fa-phone info-icon"></i>
              <div>
                <span className="info-label">Phone</span>
                <span className="info-value">Not set</span>
              </div>
            </li>
            <li className="info-item">
              <i className="fas fa-map-marker-alt info-icon"></i>
              <div>
                <span className="info-label">Location</span>
                <span className="info-value">Not set</span>
              </div>
            </li>
            <li className="info-item">
              <i className="fas fa-birthday-cake info-icon"></i>
              <div>
                <span className="info-label">Birthday</span>
                <span className="info-value">Not set</span>
              </div>
            </li>
          </ul>
        </div>
      </div>
      
      <div className="section">
        <h3 className="section-title">Recent Activity</h3>
        <div className="activity-empty-state">
          <i className="fas fa-history activity-empty-icon"></i>
          <p>No recent activities to display</p>
          <button className="button ripple">Explore Content</button>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
