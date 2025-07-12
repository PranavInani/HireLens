import { useState, useRef, useEffect } from 'react';

const PreInterviewSetup = ({ onStartInterview, isDarkMode, toggleDarkMode }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const [micReady, setMicReady] = useState(false);
  const [stream, setStream] = useState(null);
  const videoRef = useRef(null);

  useEffect(() => {
    // Auto-start camera preview when component mounts
    startCameraPreview();
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const startCameraPreview = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true
      });
      
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setCameraReady(true);
      setMicReady(true);
    } catch (error) {
      console.error('Error accessing media devices:', error);
    }
  };

  const handleStartInterview = async () => {
    setIsLoading(true);
    // Simulate preparation time
    setTimeout(() => {
      onStartInterview(stream);
    }, 2000);
  };

  const retryCamera = () => {
    setCameraReady(false);
    setMicReady(false);
    startCameraPreview();
  };

  return (
    <div style={{
      ...containerStyles,
      backgroundColor: isDarkMode ? '#111827' : '#f9fafb'
    }}>
      {/* Header */}
      <header style={{
        ...headerStyles,
        backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
        borderBottom: `1px solid ${isDarkMode ? '#374151' : '#e5e7eb'}`
      }}>
        <div style={headerContentStyles}>
          <h1 style={{
            ...titleStyles,
            color: isDarkMode ? '#f9fafb' : '#1f2937'
          }}>
            AI Interview Platform
          </h1>
          <button
            onClick={toggleDarkMode}
            style={{
              ...darkModeButtonStyles,
              backgroundColor: isDarkMode ? '#374151' : '#f3f4f6',
              color: isDarkMode ? '#f9fafb' : '#1f2937'
            }}
          >
            {isDarkMode ? '☀️' : '🌙'}
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main style={mainStyles}>
        <div style={{
          ...setupCardStyles,
          backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
          boxShadow: isDarkMode 
            ? '0 10px 30px rgba(0, 0, 0, 0.3)' 
            : '0 10px 30px rgba(0, 0, 0, 0.1)'
        }}>
          <div style={setupHeaderStyles}>
            <h2 style={{
              ...setupTitleStyles,
              color: isDarkMode ? '#f9fafb' : '#1f2937'
            }}>
              Ready to join?
            </h2>
            <p style={{
              ...setupSubtitleStyles,
              color: isDarkMode ? '#9ca3af' : '#6b7280'
            }}>
              Check your camera and microphone before starting the interview
            </p>
          </div>

          {/* Video Preview */}
          <div style={videoSectionStyles}>
            <div style={{
              ...videoContainerStyles,
              backgroundColor: isDarkMode ? '#374151' : '#f3f4f6',
              border: `2px solid ${isDarkMode ? '#4b5563' : '#e5e7eb'}`
            }}>
              <video
                ref={videoRef}
                style={videoStyles}
                autoPlay
                playsInline
                muted
              />
              {!cameraReady && (
                <div style={{
                  ...videoPlaceholderStyles,
                  backgroundColor: isDarkMode ? '#374151' : '#f3f4f6',
                  color: isDarkMode ? '#9ca3af' : '#6b7280'
                }}>
                  <div style={placeholderContentStyles}>
                    <div style={avatarPlaceholderStyles}>👤</div>
                    <span>Camera loading...</span>
                  </div>
                </div>
              )}
              
              {/* Video Controls */}
              <div style={videoControlsStyles}>
                <div style={controlsGroupStyles}>
                  <button
                    style={{
                      ...controlButtonStyles,
                      backgroundColor: cameraReady ? '#10b981' : '#ef4444'
                    }}
                    onClick={retryCamera}
                  >
                    {cameraReady ? '📹' : '📷'}
                  </button>
                  <button
                    style={{
                      ...controlButtonStyles,
                      backgroundColor: micReady ? '#10b981' : '#ef4444'
                    }}
                  >
                    {micReady ? '🎤' : '🔇'}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Setup Checklist */}
          <div style={checklistStyles}>
            <h3 style={{
              ...checklistTitleStyles,
              color: isDarkMode ? '#f9fafb' : '#1f2937'
            }}>
              Setup Checklist
            </h3>
            
            <div style={checklistItemsStyles}>
              <div style={checklistItemStyles}>
                <span style={{
                  ...checkIconStyles,
                  color: cameraReady ? '#10b981' : '#6b7280'
                }}>
                  {cameraReady ? '✅' : '⭕'}
                </span>
                <span style={{
                  ...checkTextStyles,
                  color: isDarkMode ? '#f9fafb' : '#1f2937'
                }}>
                  Camera is working
                </span>
              </div>
              
              <div style={checklistItemStyles}>
                <span style={{
                  ...checkIconStyles,
                  color: micReady ? '#10b981' : '#6b7280'
                }}>
                  {micReady ? '✅' : '⭕'}
                </span>
                <span style={{
                  ...checkTextStyles,
                  color: isDarkMode ? '#f9fafb' : '#1f2937'
                }}>
                  Microphone is ready
                </span>
              </div>
              
              <div style={checklistItemStyles}>
                <span style={{
                  ...checkIconStyles,
                  color: '#10b981'
                }}>
                  ✅
                </span>
                <span style={{
                  ...checkTextStyles,
                  color: isDarkMode ? '#f9fafb' : '#1f2937'
                }}>
                  Good lighting detected
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={actionsStyles}>
            <button
              onClick={handleStartInterview}
              disabled={!cameraReady || !micReady || isLoading}
              style={{
                ...startButtonStyles,
                opacity: (!cameraReady || !micReady || isLoading) ? 0.6 : 1,
                cursor: (!cameraReady || !micReady || isLoading) ? 'not-allowed' : 'pointer'
              }}
            >
              {isLoading ? (
                <span style={loadingContentStyles}>
                  <span style={spinnerStyles}>⏳</span>
                  Joining interview...
                </span>
              ) : (
                '🚀 Start Interview'
              )}
            </button>
            
            <button
              onClick={retryCamera}
              style={{
                ...retryButtonStyles,
                backgroundColor: isDarkMode ? '#374151' : '#f3f4f6',
                color: isDarkMode ? '#f9fafb' : '#1f2937'
              }}
            >
              🔄 Test Again
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

const containerStyles = {
  minHeight: '100vh',
  transition: 'background-color 0.3s ease'
};

const headerStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  padding: '1rem 2rem',
  zIndex: 1000,
  transition: 'all 0.3s ease'
};

const headerContentStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  maxWidth: '1200px',
  margin: '0 auto'
};

const titleStyles = {
  fontSize: '1.5rem',
  fontWeight: '600',
  margin: 0
};

const darkModeButtonStyles = {
  padding: '0.5rem',
  borderRadius: '50%',
  border: 'none',
  fontSize: '1.2rem',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  width: '40px',
  height: '40px',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const mainStyles = {
  paddingTop: '6rem',
  padding: '6rem 2rem 2rem',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: 'calc(100vh - 6rem)'
};

const setupCardStyles = {
  width: '100%',
  maxWidth: '600px',
  borderRadius: '16px',
  padding: '2rem',
  transition: 'all 0.3s ease'
};

const setupHeaderStyles = {
  textAlign: 'center',
  marginBottom: '2rem'
};

const setupTitleStyles = {
  fontSize: '2rem',
  fontWeight: '600',
  marginBottom: '0.5rem'
};

const setupSubtitleStyles = {
  fontSize: '1.1rem',
  margin: 0
};

const videoSectionStyles = {
  marginBottom: '2rem'
};

const videoContainerStyles = {
  position: 'relative',
  borderRadius: '12px',
  overflow: 'hidden',
  aspectRatio: '16/9',
  transition: 'all 0.3s ease'
};

const videoStyles = {
  width: '100%',
  height: '100%',
  objectFit: 'cover'
};

const videoPlaceholderStyles = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const placeholderContentStyles = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  gap: '1rem'
};

const avatarPlaceholderStyles = {
  fontSize: '3rem'
};

const videoControlsStyles = {
  position: 'absolute',
  bottom: '1rem',
  left: '1rem',
  right: '1rem',
  display: 'flex',
  justifyContent: 'center'
};

const controlsGroupStyles = {
  display: 'flex',
  gap: '1rem'
};

const controlButtonStyles = {
  width: '48px',
  height: '48px',
  borderRadius: '50%',
  border: 'none',
  color: 'white',
  fontSize: '20px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

const checklistStyles = {
  marginBottom: '2rem'
};

const checklistTitleStyles = {
  fontSize: '1.2rem',
  fontWeight: '500',
  marginBottom: '1rem'
};

const checklistItemsStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '0.75rem'
};

const checklistItemStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem'
};

const checkIconStyles = {
  fontSize: '1.2rem'
};

const checkTextStyles = {
  fontSize: '1rem',
  fontWeight: '500'
};

const actionsStyles = {
  display: 'flex',
  flexDirection: 'column',
  gap: '1rem'
};

const startButtonStyles = {
  padding: '1rem 2rem',
  backgroundColor: '#3b82f6',
  color: 'white',
  border: 'none',
  borderRadius: '12px',
  fontSize: '1.1rem',
  fontWeight: '600',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem'
};

const retryButtonStyles = {
  padding: '0.75rem 1.5rem',
  border: 'none',
  borderRadius: '8px',
  fontSize: '1rem',
  fontWeight: '500',
  cursor: 'pointer',
  transition: 'all 0.3s ease'
};

const loadingContentStyles = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem'
};

const spinnerStyles = {
  animation: 'spin 1s linear infinite'
};

export default PreInterviewSetup;
