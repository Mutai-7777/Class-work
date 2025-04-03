import React, { useState, useEffect, useRef } from 'react';
import '../styles/messagingmodal.css';

function MessagingModal({ isOpen, onClose }) {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState({});
  const [newMessage, setNewMessage] = useState('');
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [photoAttachment, setPhotoAttachment] = useState(null);
  const messagesEndRef = useRef(null);
  const fileInputRef = useRef(null);

  // Initialize with sample contacts and messages
  useEffect(() => {
    if (isOpen) {
      // Load saved data from localStorage if available
      const savedContacts = localStorage.getItem('messageContacts');
      const savedMessages = localStorage.getItem('messageHistory');
      
      if (savedContacts && savedMessages) {
        try {
          setContacts(JSON.parse(savedContacts));
          setMessages(JSON.parse(savedMessages));
        } catch (error) {
          console.error('Error loading saved messaging data:', error);
          initializeSampleData();
        }
      } else {
        initializeSampleData();
      }
    }
  }, [isOpen]);

  // Scroll to bottom of messages when new message is added
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, selectedContact]);

  const initializeSampleData = () => {
    const initialContacts = [
      {
        id: 1,
        name: 'John Doe',
        avatar: '👨',
        lastSeen: 'Online',
        unread: 2
      },
      {
        id: 2,
        name: 'Jane Smith',
        avatar: '👩',
        lastSeen: '10 minutes ago',
        unread: 0
      },
      {
        id: 3,
        name: 'Alex Johnson',
        avatar: '🧑',
        lastSeen: '1 hour ago',
        unread: 0
      }
    ];

    const initialMessages = {
      1: [
        {
          id: 1,
          sender: 1,
          text: 'Hey there! How are you?',
          timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
          status: 'read'
        },
        {
          id: 2,
          sender: 'me',
          text: 'I\'m doing great! Just checking out this app.',
          timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
          status: 'read'
        },
        {
          id: 3,
          sender: 1,
          text: 'What do you think of it so far?',
          timestamp: new Date(Date.now() - 1000 * 60 * 20).toISOString(),
          status: 'read'
        },
        {
          id: 4,
          sender: 1,
          text: 'Let me know if you need help with anything!',
          timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
          status: 'delivered'
        }
      ],
      2: [
        {
          id: 1,
          sender: 2,
          text: 'Hi! Did you see the new features?',
          timestamp: new Date(Date.now() - 1000 * 60 * 120).toISOString(),
          status: 'read'
        },
        {
          id: 2,
          sender: 'me',
          text: 'Not yet, what features are you talking about?',
          timestamp: new Date(Date.now() - 1000 * 60 * 110).toISOString(),
          status: 'read'
        }
      ],
      3: []
    };

    setContacts(initialContacts);
    setMessages(initialMessages);
    
    // Save to localStorage
    localStorage.setItem('messageContacts', JSON.stringify(initialContacts));
    localStorage.setItem('messageHistory', JSON.stringify(initialMessages));
  };

  const handleSelectContact = (contact) => {
    setSelectedContact(contact);
    
    // Mark messages as read
    if (contact && contact.unread > 0) {
      const updatedContacts = contacts.map(c => {
        if (c.id === contact.id) {
          return { ...c, unread: 0 };
        }
        return c;
      });
      
      setContacts(updatedContacts);
      localStorage.setItem('messageContacts', JSON.stringify(updatedContacts));
    }
  };

  const handleSendMessage = (e) => {
    e.preventDefault();
    
    if ((!newMessage.trim() && !photoAttachment) || !selectedContact) return;
    
    const messageId = Date.now();
    const newMessageObj = {
      id: messageId,
      sender: 'me',
      text: newMessage,
      image: photoAttachment ? photoAttachment.preview : null,
      timestamp: new Date().toISOString(),
      status: 'sent'
    };
    
    const updatedMessages = {
      ...messages,
      [selectedContact.id]: [
        ...(messages[selectedContact.id] || []),
        newMessageObj
      ]
    };
    
    setMessages(updatedMessages);
    setNewMessage('');
    setPhotoAttachment(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
    
    // Save to localStorage
    localStorage.setItem('messageHistory', JSON.stringify(updatedMessages));
    
    // Simulate reply after a delay for John Doe
    if (selectedContact.id === 1) {
      setTimeout(() => {
        let replyText = 'Thanks for your message! This is an automated reply.';
        
        if (photoAttachment) {
          replyText = 'Thanks for sharing the photo! It looks great.';
        }
        
        const replyMessage = {
          id: messageId + 1,
          sender: 1,
          text: replyText,
          timestamp: new Date().toISOString(),
          status: 'delivered'
        };
        
        const updatedMessagesWithReply = {
          ...updatedMessages,
          [selectedContact.id]: [
            ...updatedMessages[selectedContact.id],
            replyMessage
          ]
        };
        
        setMessages(updatedMessagesWithReply);
        localStorage.setItem('messageHistory', JSON.stringify(updatedMessagesWithReply));
      }, 2000);
    }
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const handleEmojiClick = (emoji) => {
    setNewMessage(prevMessage => prevMessage + emoji);
    setShowEmojiPicker(false);
  };

  const handlePhotoAttach = () => {
    // Trigger the file input click
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setPhotoAttachment({
          name: file.name,
          preview: reader.result
        });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeAttachment = () => {
    setPhotoAttachment(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const toggleEmojiPicker = () => {
    setShowEmojiPicker(prevState => !prevState);
  };

  if (!isOpen) return null;

  return (
    <div className="messaging-modal">
      <div className="messaging-header">
        <h3>Messages</h3>
        <button className="messaging-close-btn" onClick={onClose}>
          <i className="fas fa-times"></i>
        </button>
      </div>
      
      <div className="messaging-container">
        <div className="contacts-list">
          {contacts.map(contact => (
            <div 
              key={contact.id}
              className={`contact-item ${selectedContact && selectedContact.id === contact.id ? 'selected' : ''}`}
              onClick={() => handleSelectContact(contact)}
            >
              <div className="contact-avatar">{contact.avatar}</div>
              <div className="contact-info">
                <h4 className="contact-name">{contact.name}</h4>
                <p className="contact-status">{contact.lastSeen}</p>
              </div>
              {contact.unread > 0 && (
                <div className="unread-badge">{contact.unread}</div>
              )}
            </div>
          ))}
        </div>
        
        <div className="message-area">
          {selectedContact ? (
            <>
              <div className="message-header">
                <div className="contact-avatar">{selectedContact.avatar}</div>
                <div className="contact-info">
                  <h4 className="contact-name">{selectedContact.name}</h4>
                  <p className="contact-status">{selectedContact.lastSeen}</p>
                </div>
              </div>
              
              <div className="message-list">
                {messages[selectedContact.id] && messages[selectedContact.id].length > 0 ? (
                  <>
                    {messages[selectedContact.id].map(message => (
                      <div 
                        key={message.id}
                        className={`message-bubble ${message.sender === 'me' ? 'sent' : 'received'}`}
                      >
                        {message.image && (
                          <div className="message-image">
                            <img src={message.image} alt="Attached" />
                          </div>
                        )}
                        {message.text && <div className="message-text">{message.text}</div>}
                        <div className="message-info">
                          <span className="message-time">{formatTime(message.timestamp)}</span>
                          {message.sender === 'me' && (
                            <span className="message-status">
                              {message.status === 'sent' && <i className="fas fa-check"></i>}
                              {message.status === 'delivered' && <i className="fas fa-check-double"></i>}
                              {message.status === 'read' && <i className="fas fa-check-double read"></i>}
                            </span>
                          )}
                        </div>
                      </div>
                    ))}
                    <div ref={messagesEndRef} />
                  </>
                ) : (
                  <div className="empty-messages">
                    <p>No messages yet. Start a conversation!</p>
                  </div>
                )}
              </div>
              
              <form className="message-input-area" onSubmit={handleSendMessage}>
                {/* Hidden file input for photo attachment */}
                <input
                  type="file"
                  ref={fileInputRef}
                  style={{ display: 'none' }}
                  accept="image/*"
                  onChange={handleFileChange}
                />
                
                {/* Photo attachment display */}
                {photoAttachment && (
                  <div className="photo-attachment">
                    <div className="attachment-preview">
                      <img src={photoAttachment.preview} alt="Attachment" />
                    </div>
                    <button 
                      type="button" 
                      className="remove-attachment" 
                      onClick={removeAttachment}
                    >
                      <i className="fas fa-times"></i>
                    </button>
                    <span className="attachment-name">{photoAttachment.name}</span>
                  </div>
                )}
                
                {/* Emoji picker */}
                {showEmojiPicker && (
                  <div className="emoji-picker">
                    <div className="emoji-picker-header">
                      <span>Emojis</span>
                      <button 
                        type="button" 
                        className="close-emoji-picker" 
                        onClick={() => setShowEmojiPicker(false)}
                      >
                        <i className="fas fa-times"></i>
                      </button>
                    </div>
                    <div className="emoji-list">
                      {['😊', '😂', '❤️', '👍', '🎉', '🔥', '😍', '🤔', '👋', '🙏', '😎', '🥳', '😢', '🤣', '👏'].map(emoji => (
                        <button 
                          key={emoji} 
                          type="button" 
                          className="emoji-item" 
                          onClick={() => handleEmojiClick(emoji)}
                        >
                          {emoji}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
                
                <div className="message-input-actions">
                  <button 
                    type="button" 
                    className="action-button" 
                    title="Attach photo"
                    onClick={handlePhotoAttach}
                  >
                    <i className="fas fa-image"></i>
                  </button>
                  <button 
                    type="button" 
                    className="action-button" 
                    title="Add emoji"
                    onClick={toggleEmojiPicker}
                  >
                    <i className="fas fa-smile"></i>
                  </button>
                </div>
                <div className="message-input-wrapper">
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    className="message-input"
                  />
                  <div className="message-input-tools">
                    <button type="button" className="tool-button" title="Voice message">
                      <i className="fas fa-microphone"></i>
                    </button>
                  </div>
                </div>
                <button 
                  type="submit" 
                  className="send-button"
                  disabled={!newMessage.trim() && !photoAttachment}
                >
                  <i className="fas fa-paper-plane"></i>
                </button>
              </form>
            </>
          ) : (
            <div className="no-contact-selected">
              <div className="empty-state">
                <i className="fas fa-comments empty-icon"></i>
                <p>Select a contact to start messaging</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MessagingModal;