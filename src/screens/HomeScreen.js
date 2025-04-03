import React, { useState, useEffect } from 'react';
import Navbar from '../components/Navbar';
import '../styles/homescreen.css';

function HomeScreen() {
  const [posts, setPosts] = useState([]);
  const [showCreatePost, setShowCreatePost] = useState(false);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostContent, setNewPostContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Initialize with sample posts on component mount
  useEffect(() => {
    // Load existing posts from localStorage if available
    const savedPosts = localStorage.getItem('userPosts');
    if (savedPosts) {
      try {
        setPosts(JSON.parse(savedPosts));
      } catch (error) {
        console.error('Error loading saved posts:', error);
        initializeSamplePosts();
      }
    } else {
      initializeSamplePosts();
    }
  }, []);
  
  const initializeSamplePosts = () => {
    const initialPosts = [
      {
        id: 1,
        title: 'Getting Started with React',
        content: 'Learn the basics of React components and hooks.',
        date: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
        icon: 'fa-file-code'
      },
      {
        id: 2,
        title: 'Mobile App Design Tips',
        content: 'Best practices for creating intuitive mobile interfaces.',
        date: new Date(Date.now() - 5 * 60 * 60 * 1000).toISOString(),
        icon: 'fa-mobile-alt'
      },
      {
        id: 3,
        title: 'Working with APIs',
        content: 'How to integrate external data sources into your app.',
        date: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
        icon: 'fa-plug'
      }
    ];
    
    setPosts(initialPosts);
    localStorage.setItem('userPosts', JSON.stringify(initialPosts));
  };
  
  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.floor((now - date) / 1000);
    
    if (seconds < 60) return `${seconds} seconds ago`;
    
    const minutes = Math.floor(seconds / 60);
    if (minutes < 60) return `${minutes} minutes ago`;
    
    const hours = Math.floor(minutes / 60);
    if (hours < 24) return `${hours} hours ago`;
    
    const days = Math.floor(hours / 24);
    if (days < 30) return `${days} days ago`;
    
    const months = Math.floor(days / 30);
    if (months < 12) return `${months} months ago`;
    
    const years = Math.floor(months / 12);
    return `${years} years ago`;
  };
  
  const handleCreatePost = () => {
    if (!newPostTitle.trim() || !newPostContent.trim()) {
      alert('Please enter both title and content for your post');
      return;
    }
    
    setIsLoading(true);
    
    // Simulate API call with a timeout
    setTimeout(() => {
      const newPost = {
        id: Date.now(),
        title: newPostTitle,
        content: newPostContent,
        date: new Date().toISOString(),
        icon: 'fa-file-alt'
      };
      
      const updatedPosts = [newPost, ...posts];
      setPosts(updatedPosts);
      
      // Save to localStorage
      localStorage.setItem('userPosts', JSON.stringify(updatedPosts));
      
      // Reset form
      setNewPostTitle('');
      setNewPostContent('');
      setShowCreatePost(false);
      setIsLoading(false);
      
      alert('Post created successfully!');
    }, 1000);
  };
  
  const handleRefresh = () => {
    setIsLoading(true);
    
    // Simulate refresh with timeout
    setTimeout(() => {
      setIsLoading(false);
      alert('Content refreshed!');
    }, 1000);
  };
  
  const handleShare = () => {
    alert('Share functionality would open here');
  };
  
  const handleSave = () => {
    alert('Content saved!');
  };
  
  return (
    <div className="screen">
      <Navbar title="Home" />
      
      <div className="content">
        {isLoading && (
          <div className="loading-overlay">
            <div className="loading-spinner"></div>
          </div>
        )}
        
        {showCreatePost ? (
          <div className="create-post-form">
            <h3 className="form-title">Create New Post</h3>
            <div className="form-group">
              <label htmlFor="post-title">Title</label>
              <input
                type="text"
                id="post-title"
                value={newPostTitle}
                onChange={(e) => setNewPostTitle(e.target.value)}
                placeholder="Enter post title"
                className="form-input"
              />
            </div>
            <div className="form-group">
              <label htmlFor="post-content">Content</label>
              <textarea
                id="post-content"
                value={newPostContent}
                onChange={(e) => setNewPostContent(e.target.value)}
                placeholder="What's on your mind?"
                className="form-textarea"
                rows="4"
              ></textarea>
            </div>
            <div className="form-actions">
              <button 
                className="button secondary-button" 
                onClick={() => setShowCreatePost(false)}
              >
                Cancel
              </button>
              <button 
                className="button primary-button" 
                onClick={handleCreatePost}
                disabled={isLoading}
              >
                {isLoading ? 'Creating...' : 'Create Post'}
              </button>
            </div>
          </div>
        ) : (
          <div className="welcome-card">
            <h2>Welcome to your App</h2>
            <p>This is a mobile-friendly web application designed to function like an Android app</p>
            <button 
              className="button ripple"
              onClick={() => setShowCreatePost(true)}
            >
              Create a Post
            </button>
          </div>
        )}
        
        <h3 className="section-title">Recent Activity</h3>
        
        <ul className="list">
          {posts.map(post => (
            <li key={post.id} className="list-item ripple">
              <div className="list-item-icon">
                <i className={`fas ${post.icon}`}></i>
              </div>
              <div className="list-item-content">
                <h4 className="list-item-title">{post.title}</h4>
                <p className="list-item-subtitle">{formatTimeAgo(post.date)}</p>
              </div>
              <div className="list-item-action">
                <i className="fas fa-chevron-right"></i>
              </div>
            </li>
          ))}
        </ul>
        
        <h3 className="section-title">Quick Actions</h3>
        
        <div className="quick-actions">
          <button 
            className="quick-action-button"
            onClick={() => setShowCreatePost(true)}
          >
            <i className="fas fa-plus"></i>
            <span>New</span>
          </button>
          <button 
            className="quick-action-button"
            onClick={handleRefresh}
          >
            <i className="fas fa-sync"></i>
            <span>Refresh</span>
          </button>
          <button 
            className="quick-action-button"
            onClick={handleShare}
          >
            <i className="fas fa-share-alt"></i>
            <span>Share</span>
          </button>
          <button 
            className="quick-action-button"
            onClick={handleSave}
          >
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
