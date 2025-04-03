import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../styles/reelsscreen.css';

// Icons for Instagram-like UI
const HeartIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"></path>
  </svg>
);

const CommentIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
  </svg>
);

const ShareIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
    <polyline points="16 6 12 2 8 6"></polyline>
    <line x1="12" y1="2" x2="12" y2="15"></line>
  </svg>
);

const MusicIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18V5l12-2v13"></path>
    <circle cx="6" cy="18" r="3"></circle>
    <circle cx="18" cy="16" r="3"></circle>
  </svg>
);

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
      <Navbar title="Reels" className="instagram-style" />
      
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
            <div key={reel.id} className="reel-card instagram-style">
              <div className="reel-video-container">
                <div className="reel-video-placeholder">
                  <i className="fas fa-play-circle play-icon"></i>
                </div>
                
                {/* Right side action buttons */}
                <div className="reel-side-actions">
                  <div 
                    className="reel-side-action"
                    onClick={() => handleLike(reel.id)}
                  >
                    <div className="action-icon">
                      <HeartIcon />
                    </div>
                    <span className="action-count">{reel.likes > 1000 ? `${(reel.likes/1000).toFixed(1)}K` : reel.likes}</span>
                  </div>
                  <div className="reel-side-action">
                    <div className="action-icon">
                      <CommentIcon />
                    </div>
                    <span className="action-count">{reel.comments > 1000 ? `${(reel.comments/1000).toFixed(1)}K` : reel.comments}</span>
                  </div>
                  <div className="reel-side-action">
                    <div className="action-icon">
                      <ShareIcon />
                    </div>
                    <span className="action-count">Share</span>
                  </div>
                </div>
                
                {/* Bottom user info */}
                <div className="reel-bottom-info">
                  <div className="reel-user-info">
                    <div className="reel-avatar">
                      <img 
                        src={`https://ui-avatars.com/api/?name=${reel.author.replace(/\s+/g, '+')}&background=random`} 
                        alt={reel.author}
                        className="avatar-img" 
                      />
                    </div>
                    <div className="reel-username-container">
                      <span className="username">@{reel.username}</span>
                    </div>
                    <button className="follow-button">Follow</button>
                  </div>
                  
                  <div className="reel-caption">
                    <p>{reel.title}</p>
                  </div>
                  
                  <div className="reel-music">
                    <div className="music-icon">
                      <MusicIcon />
                    </div>
                    <div className="music-text">
                      <span>Original Audio • {reel.author}</span>
                    </div>
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