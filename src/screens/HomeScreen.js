import React from 'react';
import Navbar from '../components/Navbar';
import '../styles/homescreen.css';

function HomeScreen() {
  return (
    <div className="screen">
      <Navbar title="Home" />
      
      <div className="content">
        <div className="welcome-card">
          <h2>Welcome to your App</h2>
          <p>This is a mobile-friendly web application designed to function like an Android app</p>
          <button className="button ripple">Get Started</button>
        </div>
        
        <h3 className="section-title">Recent Activity</h3>
        
        <ul className="list">
          {[1, 2, 3].map(item => (
            <li key={item} className="list-item ripple">
              <div className="list-item-icon">
                <i className="fas fa-file-alt"></i>
              </div>
              <div className="list-item-content">
                <h4 className="list-item-title">Activity Item {item}</h4>
                <p className="list-item-subtitle">Last updated 2 hours ago</p>
              </div>
              <div className="list-item-action">
                <i className="fas fa-chevron-right"></i>
              </div>
            </li>
          ))}
        </ul>
        
        <h3 className="section-title">Quick Actions</h3>
        
        <div className="quick-actions">
          <button className="quick-action-button">
            <i className="fas fa-plus"></i>
            <span>New</span>
          </button>
          <button className="quick-action-button">
            <i className="fas fa-sync"></i>
            <span>Refresh</span>
          </button>
          <button className="quick-action-button">
            <i className="fas fa-share-alt"></i>
            <span>Share</span>
          </button>
          <button className="quick-action-button">
            <i className="fas fa-bookmark"></i>
            <span>Save</span>
          </button>
        </div>
        
        <div className="card mt-2">
          <h3 className="card-title">Daily Tip</h3>
          <p className="card-content">
            Swipe between tabs or use the bottom navigation to explore different sections of the app.
          </p>
        </div>
      </div>
    </div>
  );
}

export default HomeScreen;
