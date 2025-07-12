import { forwardRef } from 'react';

const VideoPanel = forwardRef(({ title, isActive, isDarkMode, isMainVideo = false, onToggleCamera, onToggleMicrophone, isCameraOn = true, isMicrophoneOn = true }, ref) => {
  return (
    <div style={{
      ...videoPanelStyles,
      ...(isMainVideo ? mainVideoPanelStyles : sideVideoPanelStyles)
    }} className="video-panel">
      <div style={{
        ...videoContainerStyles,
        backgroundColor: isDarkMode ? '#374151' : '#f3f4f6',
        border: `2px solid ${isDarkMode ? '#4b5563' : '#e5e7eb'}`,
        ...(isMainVideo ? mainVideoContainerStyles : sideVideoContainerStyles)
      }} className="video-container">
        <video
          ref={ref}
          style={{
            ...videoStyles,
            display: isActive && isCameraOn ? 'block' : 'none'
          }}
          autoPlay
          playsInline
          muted={title === 'You'}
        />
        {(!isActive || !isCameraOn) && (
          <div style={{
            ...placeholderOverlayStyles,
            backgroundColor: isDarkMode ? '#1f2937' : '#f9fafb'
          }}>
            <div style={placeholderContentStyles}>
              <div style={{
                ...avatarStyles,
                backgroundColor: isDarkMode ? '#374151' : '#e5e7eb',
                color: isDarkMode ? '#f9fafb' : '#6b7280'
              }}>
                {title === 'You' ? '👤' : '🎙️'}
              </div>
              <span style={{
                ...placeholderTextStyles,
                color: isDarkMode ? '#9ca3af' : '#6b7280'
              }}>
                {!isActive 
                  ? (title === 'You' ? 'Camera off' : 'Waiting for interviewer...') 
                  : 'Camera disabled'
                }
              </span>
            </div>
          </div>
        )}
        
        {/* Video controls overlay */}
        <div style={videoControlsStyles}>
          <div style={videoTitleOverlayStyles}>
            <span style={{
              ...videoTitleTextStyles,
              backgroundColor: isDarkMode ? 'rgba(0, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.5)',
              color: '#ffffff'
            }}>
              {title}
            </span>
          </div>
          
          {isMainVideo && isActive && (
            <div style={videoActionsStyles}>
              <button 
                onClick={onToggleCamera}
                style={{
                  ...videoActionButtonStyles,
                  backgroundColor: isCameraOn ? 'rgba(16, 185, 129, 0.8)' : 'rgba(239, 68, 68, 0.8)'
                }} 
                title={isCameraOn ? 'Turn off camera' : 'Turn on camera'}
              >
                {isCameraOn ? '📹' : '📷'}
              </button>
              <button 
                onClick={onToggleMicrophone}
                style={{
                  ...videoActionButtonStyles,
                  backgroundColor: isMicrophoneOn ? 'rgba(16, 185, 129, 0.8)' : 'rgba(239, 68, 68, 0.8)'
                }} 
                title={isMicrophoneOn ? 'Mute microphone' : 'Unmute microphone'}
              >
                {isMicrophoneOn ? '🎤' : '🔇'}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
});

VideoPanel.displayName = 'VideoPanel';

const videoPanelStyles = {
  position: 'relative'
};

const mainVideoPanelStyles = {
  width: '100%',
  height: '100%'
};

const sideVideoPanelStyles = {
  width: '100%',
  height: '200px'
};

const videoContainerStyles = {
  position: 'relative',
  borderRadius: '12px',
  overflow: 'hidden',
  transition: 'all 0.3s ease',
  boxShadow: '0 4px 15px rgba(0, 0, 0, 0.1)'
};

const mainVideoContainerStyles = {
  aspectRatio: '16/9',
  width: '100%',
  height: 'auto'
};

const sideVideoContainerStyles = {
  height: '100%',
  width: '100%'
};

const videoStyles = {
  width: '100%',
  height: '100%',
  objectFit: 'cover'
};

const placeholderOverlayStyles = {
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

const avatarStyles = {
  width: '60px',
  height: '60px',
  borderRadius: '50%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '24px',
  transition: 'all 0.3s ease'
};

const placeholderTextStyles = {
  fontSize: '1rem',
  fontWeight: '500',
  textAlign: 'center'
};

const videoControlsStyles = {
  position: 'absolute',
  bottom: 0,
  left: 0,
  right: 0,
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'flex-end',
  padding: '1rem',
  background: 'linear-gradient(transparent, rgba(0, 0, 0, 0.3))',
  pointerEvents: 'none'
};

const videoTitleOverlayStyles = {
  pointerEvents: 'auto'
};

const videoTitleTextStyles = {
  padding: '0.25rem 0.75rem',
  borderRadius: '20px',
  fontSize: '0.875rem',
  fontWeight: '500',
  backdropFilter: 'blur(4px)'
};

const videoActionsStyles = {
  display: 'flex',
  gap: '0.5rem',
  pointerEvents: 'auto'
};

const videoActionButtonStyles = {
  width: '40px',
  height: '40px',
  borderRadius: '50%',
  border: 'none',
  color: 'white',
  fontSize: '16px',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backdropFilter: 'blur(4px)'
};

export default VideoPanel;
