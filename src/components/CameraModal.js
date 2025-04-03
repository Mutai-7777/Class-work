import React, { useState, useRef, useEffect } from 'react';
import '../styles/cameramodal.css';

function CameraModal({ isOpen, onClose, onCapture }) {
  const [isCameraReady, setIsCameraReady] = useState(false);
  const [capturedImage, setCapturedImage] = useState(null);
  const [isCapturing, setIsCapturing] = useState(false);
  const [cameraError, setCameraError] = useState(null);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  // Initialize camera when modal opens
  useEffect(() => {
    if (isOpen) {
      initializeCamera();
    } else {
      // Clean up when modal closes
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
        streamRef.current = null;
      }
      setCapturedImage(null);
      setIsCameraReady(false);
    }
  }, [isOpen]);

  const initializeCamera = async () => {
    setCameraError(null);
    
    try {
      // Simulate camera functionality
      // In a real app with permissions, you would use:
      // const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      
      setIsCameraReady(true);
      
      // Simulate camera stream
      setTimeout(() => {
        setIsCapturing(false);
      }, 500);
      
    } catch (error) {
      console.error('Camera error:', error);
      setCameraError('Unable to access camera. Please check permissions.');
    }
  };

  const handleCapture = () => {
    setIsCapturing(true);
    
    // Simulate taking a photo
    setTimeout(() => {
      // In a real implementation, this would draw video frame to canvas
      // const canvas = canvasRef.current;
      // const context = canvas.getContext('2d');
      // context.drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
      // const imageUrl = canvas.toDataURL('image/png');
      
      // Simulate captured image with a placeholder
      const placeholderImage = 'data:image/svg+xml;charset=UTF-8,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20width%3D%22288%22%20height%3D%22225%22%20viewBox%3D%220%200%20288%20225%22%20preserveAspectRatio%3D%22none%22%3E%3Cpath%20fill%3D%22%23ECEFF1%22%20d%3D%22M0%200h288v225H0z%22%2F%3E%3Ctext%20fill%3D%22rgba(0%2C0%2C0%2C0.5)%22%20font-family%3D%22sans-serif%22%20font-size%3D%2236%22%20dy%3D%22.3em%22%20font-weight%3D%22bold%22%20text-anchor%3D%22middle%22%20x%3D%22144%22%20y%3D%22112.5%22%3ECaptured%20Image%3C%2Ftext%3E%3C%2Fsvg%3E';
      setCapturedImage(placeholderImage);
      setIsCapturing(false);
    }, 1000);
  };

  const handleUsePhoto = () => {
    if (capturedImage && onCapture) {
      onCapture(capturedImage);
      onClose();
    }
  };

  const handleRetake = () => {
    setCapturedImage(null);
    initializeCamera();
  };

  if (!isOpen) return null;

  return (
    <div className="camera-modal-overlay">
      <div className="camera-modal">
        <div className="camera-header">
          <h3>Camera</h3>
          <button className="camera-close-btn" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>

        <div className="camera-body">
          {cameraError ? (
            <div className="camera-error">
              <i className="fas fa-exclamation-circle"></i>
              <p>{cameraError}</p>
            </div>
          ) : capturedImage ? (
            <div className="captured-image-container">
              <img src={capturedImage} alt="Captured" />
            </div>
          ) : (
            <div className="camera-preview">
              {isCameraReady ? (
                <>
                  <div className="video-container">
                    <div className="simulated-camera-view">
                      <i className="fas fa-camera camera-icon"></i>
                      <p>Camera Preview (Simulated)</p>
                    </div>
                    <video 
                      ref={videoRef} 
                      style={{ display: 'none' }}
                    ></video>
                  </div>
                  <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
                </>
              ) : (
                <div className="camera-loading">
                  <div className="camera-spinner"></div>
                  <p>Opening camera...</p>
                </div>
              )}
            </div>
          )}
        </div>

        <div className="camera-footer">
          {capturedImage ? (
            <>
              <button 
                className="camera-btn retake-btn" 
                onClick={handleRetake}
              >
                Retake
              </button>
              <button 
                className="camera-btn use-photo-btn" 
                onClick={handleUsePhoto}
              >
                Use Photo
              </button>
            </>
          ) : (
            <button 
              className="camera-btn capture-btn" 
              onClick={handleCapture}
              disabled={!isCameraReady || isCapturing}
            >
              {isCapturing ? 'Capturing...' : 'Take Photo'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CameraModal;