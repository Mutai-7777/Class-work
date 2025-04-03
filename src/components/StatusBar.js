import React, { useState, useEffect } from 'react';
import '../styles/statusbar.css';

function StatusBar() {
  const [currentTime, setCurrentTime] = useState(getCurrentTime());
  
  // Get current time
  function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours();
    let minutes = now.getMinutes();
    
    // Format time to always display with 2 digits
    hours = hours < 10 ? `0${hours}` : hours;
    minutes = minutes < 10 ? `0${minutes}` : minutes;
    
    return `${hours}:${minutes}`;
  }

  // Update the time every minute
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(getCurrentTime());
    }, 60000);
    
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="status-bar">
      <div className="status-bar-time">{currentTime}</div>
      <div className="status-bar-icons">
        <i className="fas fa-signal"></i>
        <i className="fas fa-wifi"></i>
        <i className="fas fa-battery-three-quarters"></i>
      </div>
    </div>
  );
}

export default StatusBar;
