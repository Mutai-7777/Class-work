import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../styles/reelsscreen.css';

function ReelsScreen() {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch reels from our API
    const fetchReels = async () => {
      try {
        // Use the full URL since we don't have proxy configuration
        const response = await fetch('http://localhost:3001/api/reels');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setReels(data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching reels:', err);
        setError('Failed to load reels. Server may not be running.');
        setLoading(false);
      }
    };

    fetchReels();
  }, []);

  // Function to start the server if it's not running
  const startServer = async () => {
    setLoading(true);
    setError(null);
    
    // In a real app, we would add logic to start the server
    // Since this is a demo, we'll just refresh the page and try to fetch again
    setTimeout(() => {
      window.location.reload();
    }, 1000);
  };

  const handleLike = async (id) => {
    try {
      const response = await fetch(`http://localhost:3001/api/reels/${id}/like`, {
        method: 'PUT'
      });
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const updatedReel = await response.json();
      
      // Update the reels state with the new like count
      setReels(reels.map(reel => 
        reel.id === updatedReel.id ? updatedReel : reel
      ));
    } catch (err) {
      console.error('Error liking reel:', err);
    }
  };

  return (
    <div className="screen">
      <Navbar title="Reels" />
      
      <div className="reels-container">
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading reels...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <i className="fas fa-exclamation-circle"></i>
            <p>{error}</p>
            <div className="error-actions">
              <button className="button" onClick={startServer}>
                Start Server
              </button>
              <button className="button" onClick={() => window.location.reload()}>
                Try Again
              </button>
            </div>
          </div>
        ) : reels.length === 0 ? (
          <div className="empty-container">
            <i className="fas fa-video-slash"></i>
            <p>No reels available at the moment.</p>
          </div>
        ) : (
          reels.map(reel => (
            <div key={reel.id} className="reel-card">
              <div className="reel-video-placeholder">
                <i className="fas fa-play-circle play-icon"></i>
              </div>
              
              <div className="reel-info">
                <div className="reel-user">
                  <div className="reel-avatar">
                    <i className="fas fa-user"></i>
                  </div>
                  <div className="reel-user-details">
                    <div className="reel-author">{reel.author}</div>
                    <div className="reel-username">{reel.username}</div>
                  </div>
                  <button className="follow-button">Follow</button>
                </div>
                
                <div className="reel-title">{reel.title}</div>
                
                <div className="reel-actions">
                  <div 
                    className="reel-action"
                    onClick={() => handleLike(reel.id)}
                  >
                    <i className="fas fa-heart"></i>
                    <span>{reel.likes}</span>
                  </div>
                  <div className="reel-action">
                    <i className="fas fa-comment"></i>
                    <span>{reel.comments}</span>
                  </div>
                  <div className="reel-action">
                    <i className="fas fa-share"></i>
                    <span>Share</span>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default ReelsScreen;