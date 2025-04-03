import React from 'react';
import Navbar from '../components/Navbar';
import '../styles/reelsscreen.css';

function ReelsScreen() {
  // Sample video data - in a real app, this would come from an API
  const reels = [
    {
      id: 1,
      author: "Jane Smith",
      username: "@jane_videos",
      title: "Amazing sunset at the beach",
      likes: 4523,
      comments: 142,
      videoUrl: "#" // In a real app, this would be the actual video URL
    },
    {
      id: 2,
      author: "Mike Johnson",
      username: "@mike_travels",
      title: "Mountain hiking adventure",
      likes: 2198,
      comments: 89,
      videoUrl: "#" // In a real app, this would be the actual video URL
    },
    {
      id: 3,
      author: "Sarah Williams",
      username: "@sarah_creates",
      title: "DIY home decor ideas",
      likes: 7845,
      comments: 356,
      videoUrl: "#" // In a real app, this would be the actual video URL
    },
    {
      id: 4,
      author: "Alex Peterson",
      username: "@alex_fitness",
      title: "5-minute workout routine",
      likes: 3567,
      comments: 124,
      videoUrl: "#" // In a real app, this would be the actual video URL
    }
  ];

  return (
    <div className="screen">
      <Navbar title="Reels" />
      
      <div className="reels-container">
        {reels.map(reel => (
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
                <div className="reel-action">
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
        ))}
      </div>
    </div>
  );
}

export default ReelsScreen;