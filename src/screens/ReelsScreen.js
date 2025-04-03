import React, { useState, useEffect, useRef } from 'react';
import Navbar from '../components/Navbar';
import '../styles/reelsscreen.css';

// Icons for Instagram-like UI
const HeartIcon = ({ filled }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill={filled ? "red" : "none"} stroke={filled ? "red" : "currentColor"} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
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

// Instagram verified badge icon
const VerifiedBadgeIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="#3897F0" stroke="none">
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm5.46 7.12l-5.97 5.97-3.11-3.11a.996.996 0 1 0-1.41 1.41l3.83 3.83c.39.39 1.02.39 1.41 0l6.69-6.69a.996.996 0 0 0 0-1.41c-.39-.38-1.03-.38-1.42 0z"></path>
  </svg>
);

function ReelsScreen() {
  const [reels, setReels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeReelIndex, setActiveReelIndex] = useState(0);
  const [likedReels, setLikedReels] = useState({});
  const [user, setUser] = useState(null);
  const videoRefs = useRef({});

  useEffect(() => {
    // Fetch Instagram user data
    const fetchInstagramUser = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/instagram/user');
        if (!response.ok) {
          console.warn('Could not fetch Instagram user info');
          return;
        }
        const data = await response.json();
        setUser(data);
      } catch (err) {
        console.warn('Error fetching Instagram user:', err);
      }
    };

    // Fetch reels from our API (which now retrieves from Instagram)
    const fetchReels = async () => {
      try {
        // The /api/reels endpoint now tries Instagram first, with fallback to db
        const response = await fetch('http://localhost:3001/api/reels');
        
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
        
        const data = await response.json();
        setReels(data);
        setLoading(false);
        
        // Initialize likedReels state
        const initialLikedState = {};
        data.forEach(reel => {
          initialLikedState[reel.id] = false;
        });
        setLikedReels(initialLikedState);
        
        // Also fetch Instagram user data
        fetchInstagramUser();
      } catch (err) {
        console.error('Error fetching reels:', err);
        setError('Failed to load Instagram reels. Please check your connection and Instagram access token.');
        setLoading(false);
      }
    };

    fetchReels();
    
    // Cleanup function for videos
    return () => {
      Object.values(videoRefs.current).forEach(videoRef => {
        if (videoRef && videoRef.pause) {
          videoRef.pause();
        }
      });
    };
  }, []);

  // Function to restart and try again
  const retryFetch = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const response = await fetch('http://localhost:3001/api/reels');
      
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
      
      const data = await response.json();
      setReels(data);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching reels on retry:', err);
      setError('Failed to load Instagram reels. Please check your connection and Instagram access token.');
      setLoading(false);
    }
  };

  // Handle like interaction with visual feedback
  const handleLike = async (id) => {
    // Toggle the liked state for this reel
    setLikedReels(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
    
    // Update like count on the server
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
      // Revert the liked state if the request failed
      setLikedReels(prev => ({
        ...prev,
        [id]: !prev[id]
      }));
    }
  };
  
  // Function to format large numbers in Instagram style (e.g., 4.5K)
  const formatCount = (count) => {
    if (!count && count !== 0) return '0';
    
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return count.toString();
  };
  
  // Handle scroll events to determine which reel is active
  const handleScroll = (e) => {
    const container = e.target;
    const scrollTop = container.scrollTop;
    const itemHeight = container.clientHeight;
    
    const newActiveIndex = Math.floor(scrollTop / itemHeight);
    
    if (newActiveIndex !== activeReelIndex) {
      setActiveReelIndex(newActiveIndex);
      
      // Pause all videos
      Object.values(videoRefs.current).forEach(videoRef => {
        if (videoRef && videoRef.pause) {
          videoRef.pause();
        }
      });
      
      // Play the active video
      const activeVideo = videoRefs.current[newActiveIndex];
      if (activeVideo && activeVideo.play) {
        activeVideo.play().catch(e => console.log('Auto-play prevented:', e));
      }
    }
  };

  return (
    <div className="screen">
      <Navbar title="Instagram Reels" className="instagram-style" />
      
      <div className="reels-container" onScroll={handleScroll}>
        {loading ? (
          <div className="loading-container">
            <div className="loading-spinner"></div>
            <p>Loading Instagram Reels...</p>
          </div>
        ) : error ? (
          <div className="error-container">
            <i className="fas fa-exclamation-circle"></i>
            <p>{error}</p>
            <div className="error-actions">
              <button className="button" onClick={retryFetch}>
                Try Again
              </button>
            </div>
          </div>
        ) : reels.length === 0 ? (
          <div className="empty-container">
            <i className="fas fa-video-slash"></i>
            <p>No Instagram Reels available at the moment.</p>
          </div>
        ) : (
          reels.map((reel, index) => (
            <div key={reel.id || index} className="reel-card instagram-style">
              <div className="reel-video-container">
                {reel.video_url ? (
                  <video 
                    className="reel-video"
                    src={reel.video_url}
                    loop
                    playsInline
                    muted
                    ref={el => videoRefs.current[index] = el}
                    onClick={(e) => {
                      if (e.target.paused) {
                        e.target.play().catch(err => console.log('Play failed:', err));
                      } else {
                        e.target.pause();
                      }
                    }}
                    poster={reel.thumbnail_url}
                  />
                ) : (
                  <div className="reel-video-placeholder">
                    <i className="fas fa-play-circle play-icon"></i>
                  </div>
                )}
                
                {/* Instagram watermark */}
                <div className="instagram-watermark">
                  {user && (
                    <div className="instagram-source">
                      from {user.username}
                    </div>
                  )}
                </div>
                
                {/* Right side action buttons */}
                <div className="reel-side-actions">
                  <div 
                    className="reel-side-action"
                    onClick={() => handleLike(reel.id)}
                  >
                    <div className="action-icon">
                      <HeartIcon filled={likedReels[reel.id]} />
                    </div>
                    <span className="action-count">{formatCount(reel.likes)}</span>
                  </div>
                  <div className="reel-side-action">
                    <div className="action-icon">
                      <CommentIcon />
                    </div>
                    <span className="action-count">{formatCount(reel.comments)}</span>
                  </div>
                  <div className="reel-side-action">
                    <div className="action-icon">
                      <ShareIcon />
                    </div>
                    <span className="action-count">Share</span>
                  </div>
                </div>
                
                {/* Bottom user info - Instagram style */}
                <div className="reel-bottom-info">
                  <div className="reel-user-info">
                    <div className="reel-avatar">
                      <img 
                        src={`https://ui-avatars.com/api/?name=${encodeURIComponent(reel.username || reel.author)}&background=random`} 
                        alt={reel.username || reel.author}
                        className="avatar-img" 
                      />
                    </div>
                    <div className="reel-username-container">
                      <div className="username-row">
                        <span className="username">@{reel.username}</span>
                        <VerifiedBadgeIcon />
                      </div>
                      <span className="reel-timestamp">
                        {reel.created_at ? new Date(reel.created_at).toLocaleDateString() : 'Recently'}
                      </span>
                    </div>
                    {reel.permalink && (
                      <a 
                        className="instagram-link-button" 
                        href={reel.permalink} 
                        target="_blank"
                        rel="noopener noreferrer"
                        title="View on Instagram"
                      >
                        <span>View on Instagram</span>
                      </a>
                    )}
                  </div>
                  
                  <div className="reel-caption">
                    <p>{reel.title || reel.caption || 'Instagram Reel'}</p>
                  </div>
                  
                  <div className="reel-music">
                    <div className="music-icon">
                      <MusicIcon />
                    </div>
                    <div className="music-text">
                      <span>Original Audio • {reel.author || reel.username}</span>
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