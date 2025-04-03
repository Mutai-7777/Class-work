import React from 'react';
import Navbar from '../components/Navbar';
import '../styles/notificationsscreen.css';

function NotificationsScreen() {
  const notificationItems = [
    {
      id: 1,
      type: 'message',
      title: 'New message received',
      description: 'You have a new message from the support team.',
      time: '5 minutes ago',
      read: false
    },
    {
      id: 2,
      type: 'update',
      title: 'App updated to version 2.0',
      description: 'The app has been successfully updated with new features.',
      time: '2 hours ago',
      read: false
    },
    {
      id: 3,
      type: 'alert',
      title: 'Security alert',
      description: 'A new device has logged into your account.',
      time: '1 day ago',
      read: true
    },
    {
      id: 4,
      type: 'system',
      title: 'System maintenance',
      description: 'The app will be under maintenance tomorrow from 2-4 AM.',
      time: '2 days ago',
      read: true
    }
  ];

  const getIconForType = (type) => {
    switch (type) {
      case 'message':
        return 'fa-envelope';
      case 'update':
        return 'fa-sync';
      case 'alert':
        return 'fa-exclamation-circle';
      case 'system':
        return 'fa-cog';
      default:
        return 'fa-bell';
    }
  };

  return (
    <div className="screen">
      <Navbar title="Notifications" />
      
      <div className="notifications-header">
        <h3 className="notifications-title">Recent Notifications</h3>
        <button className="notifications-action">
          Mark all as read
        </button>
      </div>
      
      <div className="notifications-list">
        {notificationItems.map(notification => (
          <div 
            key={notification.id} 
            className={`notification-item ${notification.read ? 'read' : 'unread'}`}
          >
            <div className={`notification-icon ${notification.type}`}>
              <i className={`fas ${getIconForType(notification.type)}`}></i>
            </div>
            <div className="notification-content">
              <h4 className="notification-title">{notification.title}</h4>
              <p className="notification-description">{notification.description}</p>
              <span className="notification-time">{notification.time}</span>
            </div>
            <div className="notification-actions">
              <button className="notification-more">
                <i className="fas fa-ellipsis-v"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
      
      <div className="load-more">
        <button className="load-more-button">
          Load More
        </button>
      </div>
    </div>
  );
}

export default NotificationsScreen;
