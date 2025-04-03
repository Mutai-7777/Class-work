import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import '../styles/profilescreen.css';

function ProfileScreen() {
  const [profileData, setProfileData] = useState({
    name: 'User Name',
    email: 'user@example.com',
    phone: 'Not set',
    location: 'Not set',
    birthday: 'Not set'
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [editedData, setEditedData] = useState({...profileData});
  
  const handleEdit = () => {
    setIsEditing(true);
    setEditedData({...profileData});
  };
  
  const handleCancel = () => {
    setIsEditing(false);
  };
  
  const handleSave = () => {
    setProfileData({...editedData});
    setIsEditing(false);
    alert('Profile updated successfully!');
  };
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  return (
    <div className="screen">
      <Navbar 
        title={isEditing ? "Edit Profile" : "Profile"} 
        showBackButton={isEditing}
        onBackClick={handleCancel}
      />
      
      {isEditing ? (
        <div className="profile-edit-form">
          <div className="form-group">
            <label>Name</label>
            <input 
              type="text" 
              name="name" 
              value={editedData.name} 
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input 
              type="email" 
              name="email" 
              value={editedData.email} 
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input 
              type="tel" 
              name="phone" 
              value={editedData.phone} 
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Location</label>
            <input 
              type="text" 
              name="location" 
              value={editedData.location} 
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-group">
            <label>Birthday</label>
            <input 
              type="date" 
              name="birthday" 
              value={editedData.birthday !== 'Not set' ? editedData.birthday : ''} 
              onChange={handleChange}
              className="form-input"
            />
          </div>
          <div className="form-actions">
            <button className="button secondary-button" onClick={handleCancel}>Cancel</button>
            <button className="button primary-button" onClick={handleSave}>Save</button>
          </div>
        </div>
      ) : (
        <div className="profile-header">
          <div className="profile-avatar">
            <i className="fas fa-user"></i>
          </div>
          <h2 className="profile-name">{profileData.name}</h2>
          <p className="profile-email">{profileData.email}</p>
          <button className="button ripple profile-edit-button" onClick={handleEdit}>
            <i className="fas fa-edit"></i> Edit Profile
          </button>
        </div>
      )}
      
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
                <span className="info-value">{profileData.phone}</span>
              </div>
            </li>
            <li className="info-item">
              <i className="fas fa-map-marker-alt info-icon"></i>
              <div>
                <span className="info-label">Location</span>
                <span className="info-value">{profileData.location}</span>
              </div>
            </li>
            <li className="info-item">
              <i className="fas fa-birthday-cake info-icon"></i>
              <div>
                <span className="info-label">Birthday</span>
                <span className="info-value">{profileData.birthday}</span>
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
