import { useState, useRef, useEffect } from 'react';

const SettingsModal = ({ isOpen, onClose, isDarkMode, onSaveSettings }) => {
  const [selectedCamera, setSelectedCamera] = useState('');
  const [selectedMicrophone, setSelectedMicrophone] = useState('');
  const [selectedSpeaker, setSelectedSpeaker] = useState('');
  const [cameras, setCameras] = useState([]);
  const [microphones, setMicrophones] = useState([]);
  const [speakers, setSpeakers] = useState([]);
  const [testStream, setTestStream] = useState(null);
  const previewVideoRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      getDevices();
    }
    return () => {
      if (testStream) {
        testStream.getTracks().forEach(track => track.stop());
      }
    };
  }, [isOpen]);

  const getDevices = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      const devices = await navigator.mediaDevices.enumerateDevices();
      
      const videoDevices = devices.filter(device => device.kind === 'videoinput');
      const audioInputDevices = devices.filter(device => device.kind === 'audioinput');
      const audioOutputDevices = devices.filter(device => device.kind === 'audiooutput');
      
      setCameras(videoDevices);
      setMicrophones(audioInputDevices);
      setSpeakers(audioOutputDevices);
      
      if (videoDevices.length > 0) setSelectedCamera(videoDevices[0].deviceId);
      if (audioInputDevices.length > 0) setSelectedMicrophone(audioInputDevices[0].deviceId);
      if (audioOutputDevices.length > 0) setSelectedSpeaker(audioOutputDevices[0].deviceId);
    } catch (error) {
      console.error('Error getting devices:', error);
    }
  };

  const testCamera = async () => {
    try {
      if (testStream) {
        testStream.getTracks().forEach(track => track.stop());
      }
      
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { deviceId: selectedCamera },
        audio: { deviceId: selectedMicrophone }
      });
      
      setTestStream(stream);
      if (previewVideoRef.current) {
        previewVideoRef.current.srcObject = stream;
      }
    } catch (error) {
      console.error('Error testing camera:', error);
    }
  };

  const handleSave = () => {
    onSaveSettings({
      camera: selectedCamera,
      microphone: selectedMicrophone,
      speaker: selectedSpeaker
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div style={overlayStyles}>
      <div style={{
        ...modalStyles,
        backgroundColor: isDarkMode ? '#1f2937' : '#ffffff',
        color: isDarkMode ? '#f9fafb' : '#1f2937'
      }}>
        <div style={headerStyles}>
          <h2 style={titleStyles}>Settings</h2>
          <button 
            onClick={onClose}
            style={{
              ...closeButtonStyles,
              backgroundColor: isDarkMode ? '#374151' : '#f3f4f6',
              color: isDarkMode ? '#f9fafb' : '#1f2937'
            }}
          >
            ✕
          </button>
        </div>

        <div style={contentStyles}>
          {/* Camera Preview */}
          <div style={sectionStyles}>
            <h3 style={sectionTitleStyles}>Camera</h3>
            <div style={previewContainerStyles}>
              <video
                ref={previewVideoRef}
                style={{
                  ...previewVideoStyles,
                  backgroundColor: isDarkMode ? '#374151' : '#f3f4f6'
                }}
                autoPlay
                playsInline
                muted
              />
              {!testStream && (
                <div style={{
                  ...previewPlaceholderStyles,
                  backgroundColor: isDarkMode ? '#374151' : '#f3f4f6',
                  color: isDarkMode ? '#9ca3af' : '#6b7280'
                }}>
                  📹 Camera preview will appear here
                </div>
              )}
            </div>
            <select
              value={selectedCamera}
              onChange={(e) => setSelectedCamera(e.target.value)}
              style={{
                ...selectStyles,
                backgroundColor: isDarkMode ? '#374151' : '#f9fafb',
                color: isDarkMode ? '#f9fafb' : '#1f2937',
                borderColor: isDarkMode ? '#4b5563' : '#d1d5db'
              }}
            >
              {cameras.map(camera => (
                <option key={camera.deviceId} value={camera.deviceId}>
                  {camera.label || `Camera ${camera.deviceId.slice(0, 8)}`}
                </option>
              ))}
            </select>
            <button onClick={testCamera} style={testButtonStyles}>
              🎥 Test Camera
            </button>
          </div>

          {/* Microphone */}
          <div style={sectionStyles}>
            <h3 style={sectionTitleStyles}>Microphone</h3>
            <select
              value={selectedMicrophone}
              onChange={(e) => setSelectedMicrophone(e.target.value)}
              style={{
                ...selectStyles,
                backgroundColor: isDarkMode ? '#374151' : '#f9fafb',
                color: isDarkMode ? '#f9fafb' : '#1f2937',
                borderColor: isDarkMode ? '#4b5563' : '#d1d5db'
              }}
            >
              {microphones.map(mic => (
                <option key={mic.deviceId} value={mic.deviceId}>
                  {mic.label || `Microphone ${mic.deviceId.slice(0, 8)}`}
                </option>
              ))}
            </select>
          </div>

          {/* Speaker */}
          <div style={sectionStyles}>
            <h3 style={sectionTitleStyles}>Speaker</h3>
            <select
              value={selectedSpeaker}
              onChange={(e) => setSelectedSpeaker(e.target.value)}
              style={{
                ...selectStyles,
                backgroundColor: isDarkMode ? '#374151' : '#f9fafb',
                color: isDarkMode ? '#f9fafb' : '#1f2937',
                borderColor: isDarkMode ? '#4b5563' : '#d1d5db'
              }}
            >
              {speakers.map(speaker => (
                <option key={speaker.deviceId} value={speaker.deviceId}>
                  {speaker.label || `Speaker ${speaker.deviceId.slice(0, 8)}`}
                </option>
              ))}
            </select>
            <button style={testButtonStyles}>
              🔊 Test Speaker
            </button>
          </div>
        </div>

        <div style={footerStyles}>
          <button
            onClick={onClose}
            style={{
              ...cancelButtonStyles,
              backgroundColor: isDarkMode ? '#374151' : '#f3f4f6',
              color: isDarkMode ? '#f9fafb' : '#1f2937'
            }}
          >
            Cancel
          </button>
          <button onClick={handleSave} style={saveButtonStyles}>
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

const overlayStyles = {
  position: 'fixed',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: 'rgba(0, 0, 0, 0.7)',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  zIndex: 9999,
  backdropFilter: 'blur(4px)'
};

const modalStyles = {
  width: '90%',
  maxWidth: '600px',
  borderRadius: '16px',
  boxShadow: '0 20px 40px rgba(0, 0, 0, 0.3)',
  animation: 'modalSlideIn 0.3s ease-out',
  maxHeight: '90vh',
  overflow: 'hidden',
  display: 'flex',
  flexDirection: 'column'
};

const headerStyles = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  padding: '1.5rem 2rem',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
};

const titleStyles = {
  fontSize: '1.5rem',
  fontWeight: '600',
  margin: 0
};

const closeButtonStyles = {
  width: '32px',
  height: '32px',
  borderRadius: '50%',
  border: 'none',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '14px',
  transition: 'all 0.2s ease'
};

const contentStyles = {
  padding: '2rem',
  overflowY: 'auto',
  flex: 1
};

const sectionStyles = {
  marginBottom: '2rem'
};

const sectionTitleStyles = {
  fontSize: '1.1rem',
  fontWeight: '500',
  marginBottom: '1rem',
  margin: 0
};

const previewContainerStyles = {
  position: 'relative',
  width: '100%',
  height: '200px',
  borderRadius: '12px',
  overflow: 'hidden',
  marginBottom: '1rem'
};

const previewVideoStyles = {
  width: '100%',
  height: '100%',
  objectFit: 'cover'
};

const previewPlaceholderStyles = {
  position: 'absolute',
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  fontSize: '1rem'
};

const selectStyles = {
  width: '100%',
  padding: '0.75rem',
  borderRadius: '8px',
  border: '1px solid',
  fontSize: '1rem',
  marginBottom: '1rem',
  cursor: 'pointer'
};

const testButtonStyles = {
  padding: '0.5rem 1rem',
  backgroundColor: '#3b82f6',
  color: 'white',
  border: 'none',
  borderRadius: '6px',
  cursor: 'pointer',
  fontSize: '0.9rem',
  transition: 'all 0.2s ease'
};

const footerStyles = {
  display: 'flex',
  justifyContent: 'flex-end',
  gap: '1rem',
  padding: '1.5rem 2rem',
  borderTop: '1px solid rgba(255, 255, 255, 0.1)'
};

const cancelButtonStyles = {
  padding: '0.75rem 1.5rem',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '1rem',
  transition: 'all 0.2s ease'
};

const saveButtonStyles = {
  padding: '0.75rem 1.5rem',
  backgroundColor: '#10b981',
  color: 'white',
  border: 'none',
  borderRadius: '8px',
  cursor: 'pointer',
  fontSize: '1rem',
  transition: 'all 0.2s ease'
};

export default SettingsModal;
